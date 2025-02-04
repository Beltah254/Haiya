const { mediafireDl } = require("../france/dl/Function");
const { keith } = require('../keizzah/keith');
const fs = require('fs');
const getFBInfo = require('@xaviabot/fb-downloader');
const { default: axios } = require("axios");
const { ndown } = require("nayan-media-downloader");


keith({ nomCom: "code", categorie: "Pairing" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let number = arg.join(' ');

    if (!arg[0]) return repondre('Please insert a number to pair!');

    try {
        const apiUrl = `https://bel-tah-codes-7huy.onrender.com/pair?number=${encodeURIComponent(number)}`;
        const response = await axios.get(apiUrl);
        const result = response.data;

        if (result && result.code) {
            const getsess = result.code;
            const answer = `Dear*,\nYour Beltah Md PairingCode is: *${getsess}*\nUse it to Link Your WhatsApp Within 1 Minute Before it Expires\nThereafter, Obtain Your Creds.json Deployment File.\nHappy Bot Deployment!!!`;

            const codeMatch = answer.match(/```([\s\S]*?)```/);

            let buttons = [];
            if (codeMatch) {
                const code = codeMatch[1];
                buttons.push({
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📋 ᴄᴏᴘʏ ʏᴏᴜʀ ᴄᴏᴅᴇ",
                        id: "copy_code",
                        copy_code: getsess
                    })
                });
            }

            buttons.push({
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "ᴍᴀɪɴ ᴍᴇɴᴜ",
                    id: ".menu"
                })
            },
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "📋 ᴄᴏᴘʏ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ",
                    id: "copy_code",
                    copy_code: getsess
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "sʜᴏᴡ 👻 For us",
                    url: `https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F`
                })
            });

            let msg = generateWAMessageFromContent(dest, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: answer
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "> BELTAH-MD VERSION 2025"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: "",
                                subtitle: "",
                                hasMediaAttachment: false
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: buttons
                            })
                        })
                    }
                }
            }, {});

            await zk.sendMessage(dest, msg.message, {
                messageId: msg.key.id
            });

            await repondre('✅');
        } else {
            throw new Error('Invalid response from Gifted API.');
        }
    } catch (error) {
        console.error('Error getting Gifted API response:', error.message, error.response ? error.response.data : null);
        await repondre('Error getting response from Gifted API.');
        await zk.sendMessage(dest, { text: '❌' }, { quoted: ms });
    }
}); 
