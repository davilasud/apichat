import { WAMessage } from "@whiskeysockets/baileys";
import WALegacySocket from "@whiskeysockets/baileys"
import * as Sentry from "@sentry/node";
import AppError from "../../errors/AppError";
import GetTicketWbot from "../../helpers/GetTicketWbot";
import Message from "../../models/Message";
import Ticket from "../../models/Ticket";

import formatBody from "../../helpers/Mustache";

interface Request {
  body: string;
  ticket: Ticket;
  quotedMsg?: Message;
}

const SendWhatsAppMessage = async ({
  body,
  ticket,
  quotedMsg
}: Request): Promise<WAMessage> => {
  let options = {};
  const wbot = await GetTicketWbot(ticket);
  const number = `${ticket.contact.number}@${
    ticket.isGroup ? "g.us" : "s.whatsapp.net"
  }`;
  
  console.log("\n📤 SendWhatsAppMessage:");
  console.log("  - Ticket ID:", ticket.id);
  console.log("  - Ticket isGroup:", ticket.isGroup);
  console.log("  - Contact number:", ticket.contact.number);
  console.log("  - Número formateado:", number);
  console.log("  - Body length:", body.length);
  
  if (quotedMsg) {
      const chatMessages = await Message.findOne({
        where: {
          id: quotedMsg.id
        }
      });

      if (chatMessages) {
        const msgFound = JSON.parse(chatMessages.dataJson);

        options = {
          quoted: {
            key: msgFound.key,
            message: {
              extendedTextMessage: msgFound.message.extendedTextMessage
            }
          }
        };
      }
    
  }

  // Si es un grupo, refrescar metadatos antes de enviar
  if (ticket.isGroup) {
    try {
      console.log("🔄 Refrescando metadatos del grupo antes de enviar...");
      const groupMeta = await wbot.groupMetadata(number);
      console.log(`✅ Grupo: ${groupMeta.subject}, Participantes: ${groupMeta.participants.length}`);
      
      // Suscribirse a presencia puede ayudar a establecer sesión
      console.log("📡 Suscribiendo a presencia del grupo...");
      await wbot.presenceSubscribe(number);
      
      // Esperar 1 segundo para asegurar sincronización de Sender Keys
      console.log("⏳ Esperando 1 segundo para sincronización...");
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (metaError) {
      console.error("⚠️ Error al obtener metadatos/presencia del grupo:", metaError);
    }
  }

  try {
    const sentMessage = await wbot.sendMessage(number,{
        text: formatBody(body, ticket.contact)
      },
      {
        ...options
      }
    );
    await ticket.update({ lastMessage: formatBody(body, ticket.contact) });
    return sentMessage;
  } catch (err: any) {
    Sentry.captureException(err);
    console.error("❌ Error al enviar mensaje (Intento 1):");
    console.error(err); // Log completo del error
    
    // Si es un error de "No sessions" o similar en grupos, intentar refrescar participantes
    // O si es un error generico de envío, probar el refresh por si acaso
    if (ticket.isGroup) {
      console.log("🔄 Falló primer intento. Refrescando grupos y reintentando...");
      try {
        await wbot.groupFetchAllParticipating();
        console.log("✅ Grupos refrescados. Esperando 2s...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log("📡 Re-suscribiendo presencia...");
        await wbot.presenceSubscribe(number);
        
        console.log("📤 Reintentando envío...");
        const retryMessage = await wbot.sendMessage(number,{
            text: formatBody(body, ticket.contact)
          },
          {
            ...options
          }
        );
        await ticket.update({ lastMessage: formatBody(body, ticket.contact) });
        console.log("✅ Mensaje enviado exitosamente en el segundo intento");
        return retryMessage;
      } catch (retryErr) {
        console.error("❌ Error FATAL en el reintento:", retryErr);
        Sentry.captureException(retryErr);
        throw new AppError("ERR_SENDING_WAPP_MSG");
      }
    }
    
    throw new AppError("ERR_SENDING_WAPP_MSG");
  }
};

export default SendWhatsAppMessage;
