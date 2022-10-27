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
                // error: misc
                return await interaction.editReply(`❌ **Couldn't print a display**\n${e}`);
            }

            messageContent = "";
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

        const interactionChannel = await interaction.client.channels.fetch(interaction.channelId)
        interactionChannel.send({
            content: messageContent,
            embeds: embedDisplay,
            components: [
            {
                type: 1,
                components: [
                {
                    style: 1,
                    label: `Pause/Play`,
                    custom_id: `buttonPause`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `⏸`
                    },
                    type: 2
                },
                {
                    style: 2,
                    label: `Loop`,
                    custom_id: `buttonLoop`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `🔁`
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