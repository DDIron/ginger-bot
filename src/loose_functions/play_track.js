const {
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus
} = require("@discordjs/voice");

module.exports = {
	async execute(audioDownload, youtubeLink, voiceConnection, interaction) {
        const audioPlayer = createAudioPlayer();
        const resource = createAudioResource(audioDownload);

        // play track
        try {
            audioPlayer.play(resource);
            audioPlayer.enqueue
            voiceConnection.subscribe(audioPlayer);
        } catch (e) {
            // error: misc
            await interaction.editReply(`❌ **Error**\n${e}`);
            return;
        }
        
        // create display
        const print_display = require("./print_display.js");
		await print_display.execute(interaction, youtubeLink);

        // ON FINISHED PLAYBACK
        audioPlayer.on(AudioPlayerStatus.Idle, () => {
            const playNextTrack = require("../commands/play.js");
            playNextTrack.execute(interaction);
        });

        
        return;
	},
};