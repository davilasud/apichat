import Whatsapp from "../models/Whatsapp";
import GetWhatsappWbot from "./GetWhatsappWbot";
import fs from "fs";

import { getMessageOptions } from "../services/WbotServices/SendWhatsAppMedia";

export type MessageData = {
  number: number | string;
  body: string;
  mediaPath?: string;
  fileName?: string;
  isGroup?: boolean;
};

export const SendMessage = async (
  whatsapp: Whatsapp,
  messageData: MessageData
): Promise<any> => {
  try {
    const wbot = await GetWhatsappWbot(whatsapp);
    const isGroup = messageData.isGroup || false;
    const chatId = `${messageData.number}@${isGroup ? "g.us" : "s.whatsapp.net"}`;

    console.log("\n📤 SendMessage (Helper):");
    console.log("  - WhatsApp ID:", whatsapp.id);
    console.log("  - Number:", messageData.number);
    console.log("  - isGroup:", isGroup);
    console.log("  - chatId:", chatId);

    // Si es un grupo, refrescar metadatos antes de enviar
    if (isGroup) {
      try {
        console.log("🔄 Refrescando metadatos del grupo (SendMessage Helper)...");
        const groupMeta = await wbot.groupMetadata(chatId);
        console.log(`✅ Grupo: ${groupMeta.subject}, Participantes: ${groupMeta.participants.length}`);
        
        // Esperar 1 segundo para asegurar sincronización de Sender Keys
        console.log("⏳ Esperando 1 segundo para sincronización...");
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (metaError) {
        console.error("⚠️ Error al obtener metadatos del grupo:", metaError);
      }
    }

    let message;

    if (messageData.mediaPath) {
      const options = await getMessageOptions(
        messageData.fileName,
        messageData.mediaPath,
        messageData.body
      );
      if (options) {
        const body = fs.readFileSync(messageData.mediaPath);
        
        try {
          message = await wbot.sendMessage(chatId, {
            ...options
          });
        } catch (sendErr: any) {
          console.error("❌ Error al enviar media (Helper):", sendErr);
          
          // Retry para grupos
          if (isGroup && (sendErr?.message?.includes("session") || sendErr?.message?.includes("encrypt"))) {
            console.log("🔄 Reintentando con groupFetchAllParticipating (Helper)...");
            await wbot.groupFetchAllParticipating();
            await new Promise(resolve => setTimeout(resolve, 2000));
            message = await wbot.sendMessage(chatId, {
              ...options
            });
            console.log("✅ Media enviado en segundo intento (Helper)");
          } else {
            throw sendErr;
          }
        }
      }
    } else {
      const body = `\u200e ${messageData.body}`;
      
      try {
        message = await wbot.sendMessage(chatId, { text: body });
      } catch (sendErr: any) {
        console.error("❌ Error al enviar texto (Helper):", sendErr);
        
        // Retry para grupos
        if (isGroup && (sendErr?.message?.includes("session") || sendErr?.message?.includes("encrypt"))) {
          console.log("🔄 Reintentando con groupFetchAllParticipating (Helper)...");
          await wbot.groupFetchAllParticipating();
          await new Promise(resolve => setTimeout(resolve, 2000));
          message = await wbot.sendMessage(chatId, { text: body });
          console.log("✅ Texto enviado en segundo intento (Helper)");
        } else {
          throw sendErr;
        }
      }
    }

    return message;
  } catch (err: any) {
    throw new Error(err);
  }
};
