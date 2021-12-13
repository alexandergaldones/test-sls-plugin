"use strict";

const PLUGIN_NAME = "test-lib-seed";

const BASE_POLICY = {
    Effect: "Allow",
    Principal: "*",
    Action: "execute-api:Invoke"
};

const PUBLIC_RESOURCE = {
    Resource: ["execute-api:/*/*/*"]
}

class FlywayMigrationPlugin {
    constructor(serverless, options) {
        console.log(`Starting ${PLUGIN_NAME}`);

        this.serverless = serverless;
        this.options = options || /* istanbul ignore next */ {};

        // Set defaults
        this.pluginCustom = {
            dbName: null,
            readWriteEndpoint: null,
            readOnlyEndpoint: null,
            port: null,
            automatic: false,
            seed: []
        };
        
        let config = {};

        if (serverless.service.custom && serverless.service.custom[PLUGIN_NAME]) {
            config = serverless.service.custom[PLUGIN_NAME];
        }

        const hooks = {
            "before:offline:start": () => this.runMigrate(config, true), // For testing the resource policy
            "package:initialize": () => this.runMigrate(config)
        };

        Object.assign(this, {
            serverless,
            options,
            hooks,
            resourcePolicy: [],
            provider: serverless.getProvider("aws")
        });
    }

    runMigrate(config, inDevMode = false) {
      this.serverless.cli.log(
        `TODO flyway cli wrapper here`
      );

      this.loadCustom(this.serverless.service.custom)
    }

    loadCustom(custom) {       
        console.log(custom.flywayMigration.seed.dbName, custom.flywayMigration.seed.readOnlyEndpoint, custom.flywayMigration.seed.port);
    }
}

module.exports = FlywayMigrationPlugin;