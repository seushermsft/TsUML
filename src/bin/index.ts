#! /usr/bin/env node

import chalk from "chalk";
import * as yargs from "yargs";
import { getDsl } from "../core";
import { download } from "../core/io";
import { exit } from "process";
import { EmitterFactory, EmitterType } from "../core/emitters/emitterfactory";

(async () => {

    try {

        if (yargs.argv.help) {
            console.log("\n");
            console.log("Yuml.me:");
            console.log(chalk.yellowBright("tsuml --glob './src/**/*.ts'"));
            console.log(chalk.yellowBright("tsuml --glob './src/**/*.ts' --showyuml"));
            console.log(chalk.yellowBright("tsuml --glob './src/**/*.ts' --yumluri 'https://.......'"));

            console.log("\n");
            console.log("Plantuml.com:");
            console.log(chalk.yellowBright("tsuml --glob './src/**/*.ts' --umlTarget plantuml"));

            console.log("\n");
        }

        const pattern: string = yargs.argv.glob;
        const umlTarget: string = yargs.argv.umlTarget || "yuml";
        const yumluri: string = yargs.argv.yumluri || "https://yuml.me";
        const showYuml = yargs.argv.showyuml

        if (!pattern) {
            console.log(chalk.redBright("Missing --glob"));
        } else {
            const dsl = await getDsl("./tsconfig.json", pattern, EmitterFactory.getEmitter(umlTarget));

            switch (umlTarget) {
                case EmitterType.yuml.toString(): {
                    if (showYuml) {
                        console.log(dsl);
                    }

                    const url = await download(yumluri, dsl);
                    const opn = require("opn");
                    await opn(url, {wait: false});
                    break;
                }

                case EmitterType.plantuml.toString(): {
                    console.log(dsl);
                    break;
                }

                default: {
                    throw new Error(`No emitter found of type ${umlTarget}`);
                }
            } 
        }

    } catch(e) {
        console.log(chalk.redBright(e));
    }

    exit(0);

})();
