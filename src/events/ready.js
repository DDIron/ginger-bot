const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	execute(bot) {
		console.log(`## Ready! Logged in as ${bot.user.tag}`);
        // Set bot status:
	    bot.user.setActivity("/help || Trialing Ginger v2.0.0 || Happy october :)", {
			type: ActivityType.Listening,
		});
	},
};