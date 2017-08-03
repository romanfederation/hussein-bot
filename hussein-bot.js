const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const PersistentCollection = require('djs-collection-persistent');
const macros = new PersistentCollection({name: "macros"});
client.macros = macros;
let cooldown = [];
client.cooldown = cooldown;

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.login(config.token)
    .then(() =>{})
    .catch(console.log);