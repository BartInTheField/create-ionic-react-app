#!/usr/bin/env node

const filesystem = require('fs-extra')
const path = require('path')
const {
    exec
} = require('child_process')
const https = require('https')
const argv = require('yargs').argv

const scripts = require('./config/scripts')
const browserlist = require('./config/browserlist')
const dependencies = require('./config/dependecies')
const devDependencies = require('./config/devdependecies')
const projectName = argv._[0]

const writePackageJson = () => {
    const projectPackageJsonPath = `${projectName}/package.json`
    filesystem.readFile(projectPackageJsonPath, (error, file) => {
        if (error) throw error

        const data = file
            .toString()
            .replace('"test": "echo \\"Error: no test specified\\" && exit 1"', scripts)
            .replace('"author": "",', '"author": "", \n  ' + browserlist)

        filesystem.writeFile(projectPackageJsonPath, data, error2 => error2 || true)
    })
}

const writeGitIgnore = (resolve) => {
    https.get(
        'https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore',
        (result) => {
            result.setEncoding('utf8')
            let body = ''

            result.on('data', (data) => {
                body += data
            })

            result.on('end', () => {
                filesystem.writeFile(`${projectName}/.gitignore`, body, {
                    encoding: 'utf-8'
                }, (error) => {
                    if (error) throw error

                    resolve()
                })
            })
        }
    )
}

const copyAdditonalConfigFiles = () => {
    return new Promise((resolve, reject) => {
        const filesToCopy = ['README.md', 'tsconfig.json', 'tslint.json', '.editorconfig']

        filesToCopy.forEach(file => {
            filesystem.createReadStream(path.join(__dirname, `../${file}`))
                .pipe(filesystem.createWriteStream(`${projectName}/${file}`))
        })

        writeGitIgnore(resolve)
    })
}

const getDependencies = () => {
    let list = dependencies

    if(argv.redux) {
        const reduxDependecies = require('./config/redux/dependecies')
        list = list.concat(reduxDependecies)
    }

    return list
}

const getDevDependencies = () => {
    let list = devDependencies

    if(argv.redux) {
        const reduxDevDependecies = require('./config/redux/devdependecies')
        list = list.concat(reduxDevDependecies)
    }

    return list
}

const installDependencies = () => {
    return new Promise((resolve, reject) => {
        console.log(`⏳  - Installing dependencies... This is going to be a long one`)

        const dependencies = getDependencies()
        const devDependencies = getDevDependencies()

        exec(
            `cd ${projectName}&& npm i -D ${devDependencies.join(" ")} && npm i -S ${dependencies.join(" ")}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`🛑  - npm failed us! :
          ${error}`)
                    return
                }

                console.log(stdout)
                console.log(`⌛  - Dependencies installed`)
                resolve()
            }
        )
    })
}

const copyParticularSourceFiles = () => {
    return new Promise(async (resolve, reject) => {
        if (argv.redux) {
            await filesystem.copy(path.join(__dirname, '../sources/redux'), `${projectName}/src`)
        } else {
            await filesystem.copy(path.join(__dirname, '../sources/default'), `${projectName}/src`)
        }
        resolve()
    })
}

const copySourceFiles = () => {
    console.log(`📁  - Copying source files...`)
    return new Promise(async (resolve, reject) => {
        try {
            await copyParticularSourceFiles()
            await filesystem.copy(path.join(__dirname, '../public'), `${projectName}/public`)
            resolve()
        } catch (error) {
            console.error(error)
        }
    })
}

if (projectName !== undefined) {
    console.log(`🎬  - Initializing ${projectName}...`)
    exec(
        `mkdir ${projectName} && cd ${projectName} && npm init -f`,
        async (error, stdout, stderr) => {
            if (error) {
                console.error(`🛑  - Okay cut!, error occured:
                ${error}`)
                return
            }

            writePackageJson()
            await copyAdditonalConfigFiles()
            console.log(`🍿  - Done initializing ${projectName}`)

            await installDependencies()
            await copySourceFiles()

            console.log(`🚀  - ${projectName} is ready!`)
            console.log(`First type 'cd ${projectName}' to go into the project folder.`)
            console.log(`After that type 'npm start' to start the development server.`)
        }
    )
} else {
    console.log(`🛑  - We need a project name! Like this 'create-ionic-react-app projectName'`);
}
