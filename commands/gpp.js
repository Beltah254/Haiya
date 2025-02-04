"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { king } = require("../keizzah/keith");

// WhatsApp Group Command
keith({ nomCom: "wagroup", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    const message = 'Hello 👋\n\nClick on the button below to join the OFFICIAL *BELTAH-MD* WhatsApp Group';
    const img = 'https://telegra.ph/file/6771f559b5e3138ee8610.jpg'; // Use a URL for the group's display photo
    const groupLink = 'https://chat.whatsapp.com/IH4xWuVTGpf7ibfzC3h6LM';
    
    await zk.sendMessage(dest, {
        text: message,
        contextInfo: {
            externalAdReply: {
                sourceUrl: groupLink,
                mediaType: 1,
                mediaUrl: img, // This image will be shown as part of the external ad
                title: 'Join Our WhatsApp Group',
                body: 'Click to join the official BELTAH-MD WhatsApp group!'
            }
        }
    });
    console.log("Command executed: wagroup");
});

// WhatsApp Channel Command
keith({ nomCom: "channel", reaction: "👻", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    const message = 'Hello 👋\n\nClick on the button below to Follow the OFFICIAL *BELTAH-MD* WhatsApp Channel';
    const img = 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg'; // Use a URL for the channel's display photo
    const channelLink = 'https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F';
    
    await zk.sendMessage(dest, {
        text: message,
        contextInfo: {
            externalAdReply: {
                sourceUrl: channelLink,
                mediaType: 1,
                mediaUrl: img, // This image will be shown as part of the external ad
                title: 'Join Our WhatsApp Channel',
                body: 'Click to join the official FLASH-MD WhatsApp channel!'
            }
        }
    });
    console.log("Command executed: channel");
});
