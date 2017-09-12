const udpBroadcastMessage = new Buffer('¿l4n?');

module.exports = {
    MessageParser: require('./lib/MessageParser'),
    Resolver: require('./lib/Resolver'),
    Spy: require('./lib/Spy'),

    defaults: {
        // provider
        udpServer: {
            port: 19999,
            message: udpBroadcastMessage,
        },
        tlsServer: {
            // TLS options
            port: 20000,
        },

        // server
        udpScanner: {
            message: udpBroadcastMessage,
            port: 19998,
            interval: 30e3, // 30sec
        },
        tlsClient: {
            // TLS options
        },
        db: {
            filePath: 'core.db',
        },
        httpServer: {
            sessionStore: {
                db: 'session.db',
            },
        },
    },
};
