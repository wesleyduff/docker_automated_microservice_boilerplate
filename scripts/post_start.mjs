import chalk from 'chalk';

if(process.env.TEST){
    console.log(chalk.magenta(`================== DONE : NODE SERVER (local) ========================`));
} else {
    console.log(chalk.magenta('================== DONE : NODE SERVER (local) :  ' + chalk.red(`NEED TO FIX TESTS`) +'  ========================'));
}
