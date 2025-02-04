//FUCK HII CODE KUBABAKE.. 💀 💔

Keith({
  nomCom: "sing",
  categorie: "Search",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoTitle = videos[0].title;
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video title to fetch audio download URL
      const apiResponse = await fetch(`https://itzpire.com/download/play-youtube?title=${encodeURIComponent(videoTitle)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.code === 200 && apiResult.status === "success") {
        const audioDlUrl = apiResult.data.audio.url;
        const songTitle = apiResult.data.audio.title;
        const videoThumbnail = apiResult.data.audio.thumb;
        const videoChannel = apiResult.data.audio.channel;
        const videoPublished = apiResult.data.audio.published;
        const videoViews = apiResult.data.audio.views;

        // Prepare the message with song details
        const infoMess = {
          image: { url: videoThumbnail },
          caption: `*BELTAH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${songTitle}
│⿻ *Quality:* High
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videoViews}
│⿻ *Uploaded:* ${videoPublished}
│⿻ *Artist:* ${videoChannel}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©BELTAH-MD._*
╰─────────────────◆`,
          contextInfo: {
            externalAdReply: {
              title: "BELTAH-MD SONG PLAYER",
              body: "Powered by Beltah Hacking Team",
              thumbnailUrl: videoThumbnail,
              sourceUrl: 'https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer with the file name set to the song title
        await zk.sendMessage(dest, {
          document: { url: audioDlUrl },
          mimetype: 'audio/mp4',
          fileName: `${songTitle}.mp3`
        }, { quoted: ms });

        // Optionally, send a playable audio link or a preview if needed
        // Ensure the link is valid and directly playable
        const audioPreviewMessage = {
          text: `Here is a preview of the song: ${songTitle}\nListen to it [here](${audioDlUrl}).`,
          contextInfo: {
            externalAdReply: {
              title: "Song Preview",
              body: "Enjoy the preview!",
              thumbnailUrl: videoThumbnail,
              sourceUrl: audioDlUrl,
              mediaType: 2,
              renderLargerThumbnail: true
            }
          }
        };

        await zk.sendMessage(dest, audioPreviewMessage, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No audio found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio.');
  }
});
