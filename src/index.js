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
	leaveOnEmpty: false,
});
bot.player = player;

//// player events // lint later
// print display
const print_display = require("./loose_functions/print_display.js");
bot.player.on("songChanged", (queue, newSong) =>
print_display.execute(queue, newSong));
bot.player.on("songFirst", (queue, song) =>
print_display.execute(queue, song))

// log in
bot.login(botToken);