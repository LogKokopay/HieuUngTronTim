const { Events } = require("discord.js");
const { config } = require("dotenv");
const deploy = require("../deploy");

module.exports ={
    name: Events.ClientReady,
    execute: async(client) => {
        if (config.deploy) {
            await deploy(client)
        }
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity({name:config.ActivityName || "hieuungtrontim",type: 2})
        client.user.setStatus(config?.Status || "online");
    }
}