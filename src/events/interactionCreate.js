module.exports = {
	name: "interactionCreate",
	execute(interaction) {

        // BUTTON PRESS
        if (interaction.isButton()) {
            const buttonFunctions = require("../loose_functions/buttons.js");
            try {
                buttonFunctions.execute(interaction);
            } catch(e) {
                interaction.reply({
                    content: "There was an error while executing this function.",
                    ephemeral: true
                });
            }
        }

        // SLASH COMMAND
		if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        
        if (!command) return;
        try {
            command.execute(interaction);
        } catch (e) {
            interaction.reply({
                content: "There was an error while executing this command.",
                ephemeral: true
            });
        }
	},
};