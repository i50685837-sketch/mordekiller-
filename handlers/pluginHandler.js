const fs = require("fs");
const path = require("path");

const plugins = new Map();

/**
 * Load plugins
 */
function loadPlugins() {

    const pluginFolder = path.join(
        __dirname,
        "../plugins"
    );

    if (!fs.existsSync(pluginFolder)) {
        fs.mkdirSync(pluginFolder);
    }

    const files = fs.readdirSync(pluginFolder);

    for (const file of files) {

        if (!file.endsWith(".js")) continue;

        try {

            const pluginPath = path.join(
                pluginFolder,
                file
            );

            delete require.cache[
                require.resolve(pluginPath)
            ];

            const plugin = require(pluginPath);

            if (!plugin.name) {
                console.log(
                    `⚠️ Plugin ${file} has no name`
                );
                continue;
            }

            plugins.set(
                plugin.name.toLowerCase(),
                plugin
            );

            console.log(
                `🔌 Plugin Loaded: ${plugin.name}`
            );

        } catch (error) {

            console.error(
                `❌ Plugin Error (${file}):`,
                error.message
            );
        }
    }
}


/**
 * Execute plugin
 */
async function executePlugin(
    sock,
    msg,
    name,
    args = []
) {

    const plugin =
        plugins.get(name.toLowerCase());

    if (!plugin) return false;

    await plugin.execute(
        sock,
        msg,
        args
    );

    return true;
}


loadPlugins();


module.exports = {
    plugins,
    loadPlugins,
    executePlugin
};
