#! /usr/bin/env node

import chalk from "chalk";
import * as yargs from "yargs";
import { getDsl } from "../core";
import { download } from "../core/io";
import { exit } from "process";

(async () => {

    try {

        if (yargs.argv.help) {
            console.log(chalk.yellowBright("tsuml --glob './src/**/*.ts'"));
            console.log(chalk.yellowBright("tsuml --glob './src/**/*.ts' --showyuml"));
            console.log(chalk.yellowBright("tsuml --glob './src/**/*.ts' --yumluri 'https://.......'"));
        }

        const pattern: string = yargs.argv.glob;
        const yumluri: string = yargs.argv.yumluri || "https://yuml.me";
        const showYuml = yargs.argv.showyuml

        if (!pattern) {
            console.log(chalk.redBright("Missing --glob"));
        } else {
            const dsl = await getDsl("./tsconfig.json", pattern);

            if (showYuml) {
                console.log(dsl);
            }

            const url = await download(yumluri, dsl);
            const opn = require("opn");
            await opn(url, {wait: false});
        }

    } catch(e) {
        console.log(chalk.redBright(e));
    }

    exit(0);

})();
