const core = require('@actions/core');
const fs = require('fs');
const join = require('path').join;

try {
    const path = core.getInput('path');
    core.debug(`Load package.json at ${path}`);

    const packageJsonRaw = fs.readFileSync(join(path, 'package.json')).toString();
    const packageJson = JSON.parse(packageJsonRaw);

    const nodeVersion = packageJson.engines.node;
    core.debug(`Node version from package.engines.node: ${nodeVersion}`);

    core.setOutput('version', nodeVersion);
}
catch (error) {
    core.setFailed(error.message);
}