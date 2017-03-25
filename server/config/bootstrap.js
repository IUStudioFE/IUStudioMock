/**
 * @module config/bootstrap
 * @description 自定义启动脚本
 * @author wing
 */
const chalk = require('chalk');

module.exports = function() {
    /**********************************
     *                                *
     *            启动逻辑             *
     *                                *
     *********************************/
    console.log(chalk.blue('/***************************************************************************'));
    console.log(chalk.blue('/*                                                                         *'));
    console.log(chalk.blue('/* IUStuio Mock Server is Running                                          *'));
    console.log(chalk.blue('/*                                                                         *'));
    console.log(chalk.blue('/***************************************************************************'));
}