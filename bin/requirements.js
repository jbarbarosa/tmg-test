const util = require('util')
const system = require("child_process")
const exec = util.promisify(system.exec);
const requirements = require("../requirements.json")

const testRequirements = async () => {
    console.log("🧐 Validating program requirements")

    for (let [programName, { version: requiredVersion, url }] of Object.entries(requirements)) {
        const program = programName.toLowerCase();

        try {
            await exec(`which ${program}`);

            const { stdout: output } = await exec(`${program} -v`);
            const [currentVersion] = output.match(/[0-9]+\./g).map(v => Number(v.replace(/\./g, "")));

            if (currentVersion !== requiredVersion) {
                console.error(`❌ Version v${requiredVersion} of ${programName} is required to run this application; version v${currentVersion} found.`);
                console.log(`Refer to ${url} to know more`)
                process.exit(1);
            }

            process.stdout.cursorTo(0);
            console.log(`✅ ${programName} v${requiredVersion}`)
        } catch {
            process.stdout.cursorTo(0);
            console.log(`❌ ${programName} v${requiredVersion}`)
            console.error(`\nInstall ${programName} to run this application\n${url}`);
            process.exit(1);
        }
    }

    console.log("👍 Passed")
}

module.exports = testRequirements
