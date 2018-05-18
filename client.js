#!/usr/bin/env node
const version = require('./package.json').version;
const program = require('commander');
const checkUpdate = require('./bin/actions/checkUpdate');
const download = require('./bin/actions/downloadTeresa');
const plus = require('./bin/actions/plus');
const os = require('os');

if (process.argv.length === 2) {
  console.log('Verifique os comandos com $ teresinha --help')
}

program
  .version(version)
  .command('check')
  .description('Verifica a versão do teresa cli')
  .action(async () => {
    try {
      await checkUpdate();
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('update')
  .description('Atualiza o teresa cli')
  .action(async () => {
    try {
      await download()
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('start')
  .description('Starta todos seus apps')
  .action(async () => {
    try {
      await plus.startAllApps();
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('env')
  .description('Configura variáveis de ambiente em massa')
  .action(async () => {
    try {

      if (os.type() === "Windows_NT") {
        console.log('Não disponível para Windows');
        return;
      }

      const app = process.argv[4];
      if (!app) {
        console.log('Informe nome do app');
        return;
      }
      const envPath = process.argv[5];
      if (envPath) {
        console.log('Informe caminho do .env');
        return;
      }

      await plus.setConfigs(app, envPath);
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);