const fs = require("fs")
const system = require("child_process")
const testRequirements = require("./requirements");

const { d, root } = require("./paths")

const ERR_ENV_EXAMPLE_MISSING = `
This project utilises environment variables. 
There should be a file called .env.example in the repository, but it was not found.

Make sure you are on a branch that is actually supposed to be worked on.
`

const ERR_ENV_EQUALS_EXAMPLE = `
Please set environment variables before proceeding.
`

const WARN_ENV_COPIED = `
A file called .env was created at the root of the repository.
The container will be started with the default values in .env.example.

Take a look at the resulting .env file. If necessary: 
- cancel this operation
- change any variables you wish
- save the file 
- rerun this command
`

const Setup = async () => {
    await testRequirements()

    console.log("Installing")
    system.execSync('yarn', { stdio: 'inherit' })

    const dotenv = require('dotenv')
    dotenv.config()

    system.exec("clear").stdout.pipe(process.stdout);

    if (!fs.existsSync(d(root, '.env'))) {
        console.log("Environment file missing – creating from example file")

        if (!fs.existsSync(d(root, ".env.example"))) {
            console.error(ERR_ENV_EXAMPLE_MISSING)
            process.exit(1)
        }

        fs.cpSync(d(root, ".env.example"), d(root, ".env"))
        console.log(WARN_ENV_COPIED)
        system.exec('code -r .env')
        // process.exit(1)
    }

    // if (String(fs.readFileSync(d(root, ".env"))) === String(fs.readFileSync(d(root, ".env.example")))) {
    //     console.error(ERR_ENV_EQUALS_EXAMPLE)
    //     system.exec('code -r .env')
    //     process.exit(1)
    // }

    system.exec('yarn dev:build').stdout.pipe(process.stdout);
}

module.exports = Setup

if (process.argv.includes("-run")) Setup()