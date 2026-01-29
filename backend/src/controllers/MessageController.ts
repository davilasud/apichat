import { Request, Response } from "express";
import AppError from "../errors/AppError";

import SetTicketMessagesAsRead from "../helpers/SetTicketMessagesAsRead";
import { getIO } from "../libs/socket";
import Message from "../models/Message";
import Queue from "../models/Queue";
import User from "../models/User";
import Whatsapp from "../models/Whatsapp";
import formatBody from "../helpers/Mustache";

import ListMessagesService from "../services/MessageServices/ListMessagesService";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import FindOrCreateTicketService from "../services/TicketServices/FindOrCreateTicketService";
import UpdateTicketService from "../services/TicketServices/UpdateTicketService";
import DeleteWhatsAppMessage from "../services/WbotServices/DeleteWhatsAppMessage";
import SendWhatsAppMedia from "../services/WbotServices/SendWhatsAppMedia";
import SendWhatsAppMessage from "../services/WbotServices/SendWhatsAppMessage";
import CheckContactNumber from "../services/WbotServices/CheckNumber";
import CheckIsValidContact from "../services/WbotServices/CheckIsValidContact";
import GetProfilePicUrl from "../services/WbotServices/GetProfilePicUrl";
import CreateOrUpdateContactService from "../services/ContactServices/CreateOrUpdateContactService";
type IndexQuery = {
  pageNumber: string;
};

type MessageData = {
  body: string;
  fromMe: boolean;
  read: boolean;
  quotedMsg?: Message;
  number?: string;
  closeTicket?: true;
  isGroup?: boolean;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { pageNumber } = req.query as IndexQuery;
  const { companyId, profile } = req.user;
  const queues: number[] = [];

  if (profile !== "admin") {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Queue, as: "queues" }]
    });
    user.queues.forEach(queue => {
      queues.push(queue.id);
    });
  }

  const { count, messages, ticket, hasMore } = await ListMessagesService({
    pageNumber,
    ticketId,
    companyId,
    queues
  });

  SetTicketMessagesAsRead(ticket);

  return res.json({ count, messages, ticket, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { body, quotedMsg }: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];
  const { companyId } = req.user;

  const ticket = await ShowTicketService(ticketId, companyId);

  SetTicketMessagesAsRead(ticket);

  if (medias) {
    await Promise.all(
      medias.map(async (media: Express.Multer.File, index) => {
        await SendWhatsAppMedia({ media, ticket, body: Array.isArray(body) ? body[index] : body });
      })
    );
  } else {
    const send = await SendWhatsAppMessage({ body, ticket, quotedMsg });
  }

  return res.send();
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { messageId } = req.params;
  const { companyId } = req.user;

  const message = await DeleteWhatsAppMessage(messageId);

  const io = getIO();
  io.to(message.ticketId.toString()).emit(`company-${companyId}-appMessage`, {
    action: "update",
    message
  });

  return res.send();
};

export const send = async (req: Request, res: Response): Promise<Response> => {
  const { whatsappId } = req.params as unknown as { whatsappId: number };
  const messageData: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];

  try {
    const whatsapp = await Whatsapp.findByPk(whatsappId);

    if (!whatsapp) {
      throw new Error("Não foi possível realizar a operação");
    }

    if (messageData.number === undefined) {
      throw new Error("O número é obrigatório");
    }

    const numberToTest = messageData.number;
    const body = messageData.body || "";
    // Convertir isGroup a boolean si viene como string desde FormData
    // Manejar diferentes formatos: boolean, string "true"/"false", "1"/"0", undefined/null
    let isGroup = false;
    if (messageData.isGroup !== undefined && messageData.isGroup !== null) {
      if (typeof messageData.isGroup === "boolean") {
        isGroup = messageData.isGroup;
      } else {
        // TypeScript type guard: si no es boolean, debe ser string
        const strValue = String(messageData.isGroup).toLowerCase().trim();
        isGroup = strValue === "true" || strValue === "1";
      }
    }
    
    // Validar que haya contenido para enviar (body o medias)
    if (!body.trim() && (!medias || medias.length === 0)) {
      throw new Error("É necessário fornecer um corpo de mensagem ou mídia");
    }

    const companyId = whatsapp.companyId;

    let number: string;
    let profilePicUrl: string;
    let contactName: string;

    if (isGroup) {
      // Para grupos, el número puede venir con @g.us o sin él
      // Removemos caracteres especiales pero mantenemos el formato del grupo
      number = numberToTest.replace(/[@g.us]/g, "").replace(/\D/g, "");
      // Los grupos no se validan con CheckContactNumber
      profilePicUrl = "";
      contactName = `Grupo ${number}`;
    } else {
      // Para contactos normales, validamos el número
      const CheckValidNumber = await CheckContactNumber(numberToTest, companyId);
      number = CheckValidNumber.jid.replace(/\D/g, "");
      profilePicUrl = await GetProfilePicUrl(
        number,
        companyId
      );
      contactName = `${number}`;
    }

    const contactData = {
      name: contactName,
      number,
      profilePicUrl,
      isGroup,
      companyId
    };

    const contact = await CreateOrUpdateContactService(contactData);

    // Si es un grupo, pasar el contacto también como groupContact para que el ticket se marque correctamente
    const ticket = await FindOrCreateTicketService(
      contact, 
      whatsapp.id!, 
      0, 
      companyId,
      isGroup ? contact : undefined
    );

    // Asegurar que el ticket tenga isGroup correcto si es un grupo
    if (isGroup && !ticket.isGroup) {
      await ticket.update({ isGroup: true });
    }

    if (medias) {
      await Promise.all(
        medias.map(async (media: Express.Multer.File) => {
          await req.app.get("queues").messageQueue.add(
            "SendMessage",
            {
              whatsappId,
              data: {
                number,
                body: body ? formatBody(body, contact) : media.originalname,
                mediaPath: media.path,
                fileName: media.originalname,
                isGroup
              }
            },
            { removeOnComplete: true, attempts: 3 }
          );
        })
      );
    } else {
      await SendWhatsAppMessage({ body: formatBody(body, contact), ticket });

      await ticket.update({
        lastMessage: body,
      });

    }

    if (messageData.closeTicket) {
      setTimeout(async () => {
        await UpdateTicketService({
          ticketId: ticket.id,
          ticketData: { status: "closed" },
          companyId
        });
      }, 1000);
    }
    
    SetTicketMessagesAsRead(ticket);

    return res.send({ mensagem: "Mensagem enviada" });
  } catch (err: any) {
    console.error("Error sending message:", err);
    const errorMessage = err?.message || err?.response?.data?.message || "Erro desconhecido";
    if (!errorMessage || errorMessage === "Error") {
      throw new AppError(
        "Não foi possível enviar a mensagem, tente novamente em alguns instantes"
      );
    } else {
      throw new AppError(errorMessage);
    }
  }
};
