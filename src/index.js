const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, } = require("discord.js");
const { botToken } = require("./config.json");
const { Player } = require("discord-music-player");

// put receiving endpoints in here:
const bot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]});

// event handling
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}

// command handling
bot.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	bot.commands.set(command.data.name, command);
}

// create player
const player = new Player(bot, {
	leaveOnEmpty: true,
});
bot.player = player;

//// player events
const print_display = require("./loose_functions/print_display.js");
bot.player
	.on("songChanged", (queue, newSong) =>
		print_display.execute(queue, newSong))
	.on("songFirst", (queue, song) =>
	 	print_display.execute(queue, song))
	.on("queueEnd", (queue) =>
		bot.channels.cache.get(queue.connection.channel.id).send("Disconnected from voice channel."))
	.on("channelEmpty", (queue) =>
		bot.channels.cache.get(queue.connection.channel.id).send(`<:gingerNeutral:1043991232281575554> I don't like to be alone, so I left the voice channel.`))
	.on("error", (error, queue) => {
		console.log("error occured:");
		console.log(e)
	});

// log in
bot.login(botToken);