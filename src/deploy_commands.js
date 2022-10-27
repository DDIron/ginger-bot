const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { botId, guildId, botToken } = require("./config.json");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(botToken);

rest.put(Routes.applicationCommands(botId), { body: commands })
	.then(() => console.log("Successfully registered global commands."))
	.catch(console.error);

// delete all commands
//
// rest.put(Routes.applicationCommands(botId), { body: [] })
// .then(() => console.log("Successfully deleted all application commands."))
// .catch(console.error);