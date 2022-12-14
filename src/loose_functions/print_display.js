const { getBasicInfo } = require("ytdl-core");

module.exports = {
    async execute(queue, song = null) {
        if (!song) {
            return;
        }

        song.queue.connection.channel.send({
            content: "",
            embeds: [
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
            ],
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