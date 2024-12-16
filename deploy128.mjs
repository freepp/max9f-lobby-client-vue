#!/usr/bin/env zx

// 使用此脚本需要先安装sshpass
// https://blog.csdn.net/weixin_35757704/article/details/109740901 mac安装sshpass

const klawSync = require('klaw-sync')

const localDeployPath = 'dist/build/h5'
const remoteDeployPath = '/root/wwwroot/lobby/bra/'

const [, , , serverIp, userName, pwd ] = process.argv;

// get all cats
const dirs = klawSync(localDeployPath, {nofile: true, depthLimit: 0})

// get all files
const files = klawSync(localDeployPath, {nodir: true, depthLimit: 0})

// sync dirs to server
for (const dir of dirs) {
    await syncAsset(dir.path, false) 
}

// sync files to server
for (const file of files) {
    await syncAsset(file.path) 
}

async function syncAsset(filePath, isFile=true) {
    try {
        const fileName = filePath.split("/").pop()
        await spinner(`syncing ${fileName} 🙄...`, () => $`sshpass -p ${pwd} scp ${isFile ? '' : '-r' } ${filePath} ${userName}@${serverIp}:${remoteDeployPath}`)

        console.log(chalk.green(`${fileName} ${isFile ? 'file' : 'folder'} sync done 😆`))
    } catch (error) {
        console.log(chalk.red(`Exit code: ${error.exitCode}, Error: ${error.stderr} 😤`))
        await $`exit 1`
    }
}