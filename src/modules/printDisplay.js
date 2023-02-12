const { getBasicInfo } = require("ytdl-core");

module.exports = {
    async execute(queue, song = false, progress = "00:00:00", title = "🍪 Next up:") {
        if (!song) {
            return;
        }

        song.queue.connection.channel.send({
            content: "",
            embeds: [
                {
                    title: title,
                    description: song.name,
                    color: 0xe44424,
                    fields: [
                    {
                        name: `Timestamp:`,
                        value: `${progress} - ${song.duration}`
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
                    emoji: {
                    id: null,
                    name: `🛑`
                    },
                    type: 2
                }]
            }],
        });
    }
}