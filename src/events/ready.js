const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	execute(bot) {

		console.log(`## Ready! Logged in as ${bot.user.tag}`);
        // Set bot status:
	    bot.user.setActivity("/feedback || Hello :)", {
			type: ActivityType.Listening,
		});
		
		// list servers
		console.log("~ Servers:");
		bot.guilds.cache.forEach(guild => {
			console.log(`-- ${guild.name} || ${guild.id}`);
		});
	},
};