

module.exports.data = {
    name:"play",
    description: "Phát âm nhạc",
    type: 1,
    options: [],
    integration_types: [0],
    contexts: [0],
}

module.exports.execute = async(Integration) => {
    const ping = interaction.client.ws.ping;
    interaction.reply(ping);
    return;
}