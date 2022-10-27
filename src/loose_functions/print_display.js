const { getBasicInfo } = require("ytdl-core");

module.exports = {
    async execute(queue, song = null) {
        if (song) {
            // WITH LINK
            messageContent = "";
            embedDisplay = [
                {
                    title: `🍪 Next up:`,
                    description: song.name,
                    color: 0xe44424,
                    fields: [
                    {
                        name: `Timestamp:`,
                        value: `00:00:00 - ${song.duration}`
                    }
                    ],
                    thumbnail: {
                        url: song.thumbnail,
                    },
                    url: song.url
                }
            ];
        } else {
            // WITHOUT LINK
            messageContent = "✅ Printing display..."
            embedDisplay = []
        }

        const interactionChannel = song.queue.connection.channel
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