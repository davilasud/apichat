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
  console.log("\n");
  console.log("=".repeat(80));
  console.log("🚀 BACKEND API /api/messages/send - Versión: 2024-01-29 16:30");
  console.log("=".repeat(80));
  
  const { whatsappId } = req.params as unknown as { whatsappId: number };
  const messageData: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];

  console.log("📥 Request recibido:");
  console.log("  - WhatsappId:", whatsappId);
  console.log("  - Body:", JSON.stringify(messageData, null, 2));
  console.log("  - Tiene medias:", !!(medias && medias.length > 0));
  if (medias && medias.length > 0) {
    console.log("  - Archivo:", medias[0].originalname);
  }

  try {
    const whatsapp = await Whatsapp.findByPk(whatsappId);

    if (!whatsapp) {
      throw new Error("Não foi possível realizar a operação");
    }

    if (messageData.number === undefined) {
      throw new Error("O número é obrigatório");
    }

    const numberToTest = messageData.number;
    const body = messageData.body;
    const companyId = whatsapp.companyId;
    
    // Detectar si es grupo: puede venir como boolean true o string "true"
    const isGroup = messageData.isGroup === true || messageData.isGroup === "true";

    let number: string;
    let profilePicUrl: string = "";
    let contactName: string;

    if (isGroup) {
      // Para grupos: extraer solo números (sin @g.us) para almacenar en la base de datos
      // El formato @g.us se agregará al enviar el mensaje
      number = numberToTest.replace(/[^\d]/g, "");
      
      if (!number || number.length < 10) {
        throw new Error("ID de grupo inválido. Debe ser un número de al menos 10 dígitos.");
      }
      
      contactName = `Grupo`;
    } else {
      // Para contactos normales: validar y obtener foto
      const CheckValidNumber = await CheckContactNumber(numberToTest, companyId);
      number = CheckValidNumber.jid.replace(/\D/g, "");
      profilePicUrl = await GetProfilePicUrl(number, companyId);
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

    // Para grupos, pasar el contact también como groupContact
    const ticket = await FindOrCreateTicketService(
      contact, 
      whatsapp.id!, 
      0, 
      companyId,
      isGroup ? contact : undefined
    );
    
    // Logging para debug
    console.log("\n📋 Estado antes de enviar:");
    console.log("  - Es grupo (detectado):", isGroup);
    console.log("  - Número (limpio):", number);
    console.log("  - Contact ID:", contact.id);
    console.log("  - Contact isGroup:", contact.isGroup);
    console.log("  - Ticket ID:", ticket.id);
    console.log("  - Ticket isGroup:", ticket.isGroup);
    console.log("  - Formato que se usará:", `${number}@${ticket.isGroup ? 'g.us' : 's.whatsapp.net'}`);

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

    console.log("\n✅ Mensaje enviado exitosamente");
    console.log("=".repeat(80));
    console.log("\n");
    
    return res.send({ mensagem: "Mensagem enviada", timestamp: new Date().toISOString(), version: "2024-01-29-16:30" });
  } catch (err: any) {
    console.error("\n❌ ERROR al enviar mensaje:");
    console.error("  - Tipo:", err.constructor.name);
    console.error("  - Mensaje:", err.message);
    console.error("  - Stack:", err.stack);
    console.log("=".repeat(80));
    console.log("\n");
    
    if (Object.keys(err).length === 0) {
      throw new AppError(
        "Não foi possível enviar a mensagem, tente novamente em alguns instantes"
      );
    } else {
      throw new AppError(err.message);
    }
  }
};
