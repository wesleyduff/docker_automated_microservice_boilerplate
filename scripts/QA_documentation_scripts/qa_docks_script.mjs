import chalk from "chalk";
import config from "../../config/index";
import fs from 'fs';
import path from 'path';

console.log(chalk.magenta(`================== Building QA docs ========================`));

fs.writeFile(`${path.resolve(path.dirname(''))}/Documentation_for_QA/share_with_qa.txt`, 'clean', (errorWritingFile) => {
    if(errorWritingFile){
        console.log('-- IF YOU SEE THIS ERROR, Fix the Mock Logger Writter.js file');
        console.log(`path ---- ${path.resolve(path.dirname(''))}/Documentation_for_QA/)`)
    } else {

        const content = `
        ==== RUN DOCKER CONTAINER ====
        Follow steps: 
        1. Make sure your local database is running
        2. Make sure your docker for (windows | mac) is running
        3. Download the .tar file from AWS OR from the location where the developer stashed the image.
        3. Run this command
        docker run -p 3000:3000 -d --name ${config.docker.image.name} ${config.docker.image.name}:${config.docker.image.version}
        `

        fs.writeFile(`${path.resolve(path.dirname(''))}/Documentation_for_QA/share_with_qa.txt`, content, (errorWritingFile) => {
            if(errorWritingFile){
                console.log(`path ---- ${path.resolve(path.dirname(''))}/Documentation_for_QA/)`)
                console.log('-- IF YOU SEE THIS ERROR, Fix the Mock Logger Writter.js file')
            } else {
                return true;
            }
        })
    }
})


console.log(chalk.magenta(`================== DONE : Building QA docs ========================`));