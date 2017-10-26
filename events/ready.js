const logger = require('winston');

// noinspection Annotator
logger.remove(logger.transports.Console);
// noinspection Annotator
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

exports.run = (client) => {
    client.user.setPresence({ status:'online', game: {name: 'League of Legends'}})
        .then(() =>{})
        .catch(console.log);
    // noinspection Annotator
    logger.info("Connected");
    // noinspection Annotator
    logger.info("Logged in as : ");
    // noinspection Annotator
    logger.info(`${client.user.username} - (${client.user.id})`);
};
