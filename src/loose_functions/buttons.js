const fs = require("fs");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
	execute(interaction) {
        const connection = getVoiceConnection(interaction.guildId);
        const audioPlayer = connection.state.subscription.player;
        if (interaction.customId == "buttonPause") {
            // PAUSE
            audioPlayer.pause();
            interaction.reply("✅ Music has been paused.");
        } else if (interaction.customId == "buttonPlay") {
            // RESUME
            audioPlayer.unpause();
            interaction.reply("✅ Resuming the track...")
        } else if (interaction.customId == "buttonSkip") {
            // SKIP
            interaction.reply("✅ Skipping to the next track...");
            const playNextTrack = require("../commands/play.js");
            playNextTrack.execute(interaction);
        } else if (interaction.customId == "buttonStop") {
            // STOP
            const fileData = fs.readFileSync("./src/gingerDatabase.json");
		    const musicQueues = JSON.parse(fileData);
            musicQueues[interaction.guildId] = [];
            fs.writeFile("./src/gingerDatabase.json", JSON.stringify(musicQueues, null, 2), function finished(e) {
                // error: misc
                if (e) interaction.editReply(`❌ **Error**\n${e.message}`);
                return;
            });
            audioPlayer.stop();
            connection.destroy();
            interaction.reply("✅ Music has been stopped.");
        }
    }
};