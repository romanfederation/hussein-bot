const presence = require("../commands/presence.js")

exports.run = async (client, message, args) => {
    console.log("Command !%s received from %s", "crabrave", message.author.username);
    if(!args || !args.length){
        message.channel.send(":crab: :crab: **CRAB RAVE** :crab: :crab:");
    }
    else{
        let messageText = `:crab: :crab: **${args.join(" ")}** :crab: :crab:`;
        message.channel.send(messageText);
    }
    if(message.member.voiceChannel){
      try{
        const connection = await message.member.voiceChannel.join();
        client.user.setPresence({ status:'online', game: {name: 'CRAB RAVE'}});
        const dispatcher = connection.playFile('./resources/crabrave.mp3');
        dispatcher.setVolume(0.15);
        dispatcher.on('end', async () => {
            try{
                const connection = await client.voiceConnections.get(message.guild.id);
                setTimeout(()=>{
                   connection.disconnect();
                   presence.setPresence(client);
                }, 3000);
            }
            catch(err){
                console.log(err);
            }
        });
        dispatcher.on('error', err => {
            console.log(err);
        });
        }
        catch(err){
            console.error(err);
        }
    }
}
