const consoleView = require('./views/consoleView');

async function startConsole() {
  const { default: chalk } = await import('chalk'); // dynamically import chalk
  console.log(chalk.green('Starting the interactive console...'));
  consoleView.displayMenu();
}

startConsole();
