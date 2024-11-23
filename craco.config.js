const cracoAlias = require('craco-alias');

module.exports = {
    plugin: [
        {
            options: {
                source: "tsconfig",
                baseUrl: ".",
                tsConfigPath: "tsconfig.paths.json",
                debug: false,
            },
        },
    ],
}