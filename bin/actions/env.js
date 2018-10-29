const fs = require('fs');
const command = require('../util/command');

module.exports = async (appName, path) => {
    if (!fs.existsSync(path)) {
        console.log(`${path} não foi encontrado`)
        return;
    }
    const allEnvs = fs.readFileSync(path).toString().split('\n').filter(q => q[0] != '#' && q != '');
    return runEnv(appName, allEnvs);
};

async function runEnv(appName, allEnvs) {
    if (allEnvs[0] == null)
        return undefined;

    await command(`teresa app env-set ${allEnvs.join(', ')} --app ${appName} --no-input`);
}


