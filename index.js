const core = require('@actions/core');
const fs = require('fs');
const join = require('path').join;

try {
    const path = core.getInput('path');
    core.debug(`Load package.json at ${path}`);

    const packageJsonRaw = fs.readFileSync(join(path, 'package.json')).toString();
    const packageJson = JSON.parse(packageJsonRaw);

    const nodeVersion = packageJson.engines.node;
    const versionTags = nodeVersion.split('.');
    core.debug(`Node version from package.engines.node: ${nodeVersion}`);

    core.setOutput('version', nodeVersion);
    core.setOutput('major', versionTags[0]);
    core.setOutput('minor', versionTags[1]);
    core.setOutput('patch', versionTags[2]);

}
catch (error) {
    core.setFailed(error.message);
}