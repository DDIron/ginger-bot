const fs = require("fs");
const { getVoiceConnection } = require("@discordjs/voice");
const { channel } = require("diagnostics_channel");

module.exports = {
	execute(interaction) {
        const channel = interaction.client.channels.cache.get(interaction.channelId);
        let guildQueue;
        try {
            guildQueue = interaction.client.player.getQueue(interaction.guildId);
        } catch (e) {
            return;
        }
        if (!guildQueue) { return; }

        if (interaction.customId == "buttonPause") {
            if (!guildQueue.connection.paused) {
                // PAUSE
                guildQueue.setPaused(true);
                channel.send("✅ Music has been paused.");
            } else {
                // RESUME
                guildQueue.setPaused(false);
                channel.send("✅ Resuming the track...")
            }
            
        } else if (interaction.customId == "buttonLoop") {
            // LOOP
            guildQueue.setRepeatMode((guildQueue.repeatMode + 1) % 3);
            if (guildQueue.repeatMode == 2) {
                channel.send("✅ Looping the queue.");
            } else if (guildQueue.repeatMode == 1) {
                channel.send("✅ Looping the current track.");
            } else {
                channel.send("✅ Looping disabled.");
            }
            
        } else if (interaction.customId == "buttonSkip") {
            // SKIP
            guildQueue.skip()
            channel.send("✅ Skipping the current track...");
        } else if (interaction.customId == "buttonStop") {
            // STOP
            const fileData = fs.readFileSync("./src/gingerDatabase.json");
		    const musicQueues = JSON.parse(fileData);
            musicQueues[interaction.guildId] = [];
            fs.writeFile("./src/gingerDatabase.json", JSON.stringify(musicQueues, null, 2), function finished(e) {});
            guildQueue.stop();
            guildQueue.clearQueue();
            channel.send("✅ Music has been stopped.");
        }
    }
};