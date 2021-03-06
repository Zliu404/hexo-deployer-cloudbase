'use strict'

const CloudBase = require('@cloudbase/manager-node')
const Fs = require('hexo-fs')
const Chalk = require('chalk')

module.exports = function (args) {
  // Hexo's Logger
  const log = this.log

  if (!args.secretId) {
    args.secretId = process.env.COS_SECRET_ID
  }
  if (!args.secretKey) {
    args.secretKey = process.env.COS_SECRET_KEY
  }
  if (!args.envId) {
    args.envId = process.env.TCB_ENV_Id
  }
  if (!args.region) {
    args.region = process.env.COS_REGION
  }

  // Check the user's configuration
  if (!checkHexoConfig(args)) {
    log.error('hexo-deployer-tcb: config error')
    return
  }

  // create and init cloudbase
  const app = new CloudBase({
    secretId: args.secretId,
    secretKey: args.secretKey,
    envId: args.envId,
    region: args.region,
  })

  log.info('Uploading files to COS, preparing...')
  log.info('[dir]:%s', this.public_dir)
  log.info('[secretId]:%s', args.secretId)
  log.info('[secretKey]:%s', args.secretKey)
  log.info('[envId]:%s', args.envId)
  log.info('[region]:%s', args.region)
  log.info('Uploading files to COS, uploading...')

  deployHostingFile(app, this.public_dir).then((value) => {
    if (value) {
      log.info(value)
    }
  }, (value) => {
    log.info(value)
  })

  log.info('Uploading files to COS, done.')
}

/**
 * Check if the configuration is correct in _config.yml file
 * @param {string} args
 * @return {boolean}
 */
function checkHexoConfig (args) {
  if (!args.secretId ||
    !args.secretKey ||
    !args.envId ||
    !args.region ) {
    const tips = [

      'Please check if you have made the following settings in _config.yml.',
      '',
      'deploy:',
      '  type: cos',
      '  secretId: your SecretId',
      '  secretKey: you rSecretKey',
      '  envId: your EnvId',
      '  region: your Region',
      ''
    ]
    console.log(tips.join('\n'))
    return false
  } else {
    return true
  }
}

/**
 * Upload file to TCB
 * @param {object} cos
 * @param {object} config
 * @param {object} file
 */
async function deployHostingFile (cloudbase, srcPath) {

  const { hosting, env} = cloudbase
  const successFiles = [];
  const failedFiles = [];

  hosting.uploadFiles({
    localPath: srcPath,
    cloudPath: '/',
    ignore: ['**/ignore.*'],
    onFileFinish: (error, fileInfo) => {
      if (error){
          console.log(error);
      } 
      
      if(fileInfo) {
          if (fileInfo.statusCode == 200) {
            console.log('Upload Success: %s', decodeURI(fileInfo.Location));
          } else {
            console.log('Upload Failed: %O', fileInfo);
          }
      }
  }
  })
}
