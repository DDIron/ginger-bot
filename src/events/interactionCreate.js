module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
        
        // BUTTON PRESS
        if (interaction.isButton()) {
            const buttonFunctions = require("../loose_functions/buttons.js");
            try {
                buttonFunctions.execute(interaction);
            } catch(e) {
                console.log("## Caught an error!")
                console.error(e);
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
            if (command.data.name == "play") {
                await interaction.deferReply();
            }
            command.execute(interaction);
        } catch (e) {
            console.log("## Caught an error!")
            console.error(e);
            interaction.reply({
                content: "There was an error while executing this command.",
                ephemeral: true
            });
        }
	},
};