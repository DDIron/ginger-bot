const { getBasicInfo } = require("ytdl-core");

module.exports = {
    async execute(interaction, youtubeLink = null) {

        let downloadInfo
        let videoLength
        if (youtubeLink) {
            // WITH LINK
            try {
                downloadInfo = await getBasicInfo(youtubeLink);
                videoLength = new Date(downloadInfo.videoDetails.lengthSeconds * 1000).toISOString().substring(11, 19);

            } catch (e) {
                if (`${e}` == "Error: Status code: 410") {
                    // error: 410
                    interaction.editReply(`❌ **Error**\nI wasn't able to retrieve the video as it was restricted or private.`);
                } else {
                    // error: misc
                    interaction.editReply(`❌ **Couldn't print a display**\n${e}`);
                }
                return;
            }

            messageContent = "✅ Playing track...";
            embedDisplay = [
                {
                    title: `🍪 Next up:`,
                    description: downloadInfo.videoDetails.title,
                    color: 0xe44424,
                    fields: [
                    {
                        name: `Timestamp:`,
                        value: `00:00:00 - ${videoLength}`
                    }
                    ],
                    thumbnail: {
                        url: downloadInfo.videoDetails.thumbnails[0].url,
                    },
                    url: downloadInfo.videoDetails.url
                }
            ];
        } else {
            // WITHOUT LINK
            messageContent = "✅ Printing display..."
            embedDisplay = []
        }

        await interaction.editReply({
            content: messageContent,
            embeds: embedDisplay,
            components: [
            {
                type: 1,
                components: [
                {
                    style: 1,
                    label: `Pause`,
                    custom_id: `buttonPause`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `⏸`
                    },
                    type: 2
                },
                {
                    style: 1,
                    label: `Resume`,
                    custom_id: `buttonPlay`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `▶️`
                    },
                    type: 2
                },
                {
                    style: 2,
                    label: `Skip`,
                    custom_id: `buttonSkip`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `⏩`
                    },
                    type: 2
                },
                {
                    style: 4,
                    label: `Stop`,
                    custom_id: `buttonStop`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `🛑`
                    },
                    type: 2
                }
                ]
            }
            ],
        });
    }
}