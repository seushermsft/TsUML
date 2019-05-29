import chalk from "chalk";
import { flatten } from "lodash";
import { findFilesByGlob } from "./io";
import { getAst, parseClasses, parseInterfaces, parseHeritageClauses } from "./parser";
import { IEmitter } from "./interfaces";

export async function getDsl(tsConfigPath: string, pattern: string, emitter: IEmitter) {

  const sourceFilesPaths = await findFilesByGlob(pattern);

  console.log(
    chalk.yellowBright(
      "Matched files:\n" + sourceFilesPaths.reduce((p, c) => `${p}${c}\n`, "")
    )
  );

  const ast = getAst(tsConfigPath, sourceFilesPaths);
  const files = ast.getSourceFiles();

  // parser
  const declarations = files.map(f => {
    const classes = f.getClasses();
    const interfaces = f.getInterfaces();
    const path = f.getFilePath();
    return {
      fileName: path,
      classes: classes.map(parseClasses),
      heritageClauses: classes.map(parseHeritageClauses),
      interfaces: interfaces.map(parseInterfaces)
    };
  });

  // emitter
  const entities = declarations.map(d => {
    const classes = d.classes.map((c) => emitter.emitSingleClass(c.className, c.properties, c.methods));
    const interfaces = d.interfaces.map((i) => emitter.emitSingleInterface(i.interfaceName, i.properties, i.methods));
    const heritageClauses = flatten(d.heritageClauses.map(emitter.emitHeritageClauses));
    return [...classes, ...interfaces, ...heritageClauses];
  });

  return emitter.postProcess(flatten(entities));

}