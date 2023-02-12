module.exports = {
	name: "interactionCreate",
	async execute(interaction) {

        // BUTTON PRESS
        if (interaction.isButton()) {
            const buttonFunctions = require("../modules/buttons.js");
            try {
                return buttonFunctions.execute(interaction);
            } catch(e) {
                interaction.reply({
                    content: "There was an error while executing this function. Please try again.",
                    ephemeral: true
                });
            }
        }

        // SLASH COMMAND
		if (!interaction.isChatInputCommand() || !interaction.guild) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        
        try {
            command.execute(interaction);
        } catch (e) {
            interaction.reply({
                content: `There was an error while executing this command. Please try again.\nError: ${e.message}`,
                ephemeral: true
            });
        }
	},
};