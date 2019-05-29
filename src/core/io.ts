import * as glob from "glob";
import * as request from "request";

export async function findFilesByGlob(pattern: string) {
    return new Promise<string[]>((res, rej) => {
        glob(pattern, (err, files) => {
            if (err) {
                rej(err);
            } else {
                res(files);
            }
        });
    });
}

export async function download(yumlUri: string, dsl: string) {
    return new Promise<string>((resolve, reject) => {
        const url = `${yumlUri}/diagram/plain/class/`;
        const options = {
            form: {
                dsl_text: dsl
            }
        };
        request.post(url, options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            const svgFileName = body.replace(".png", ".svg");
            const diagramUrl = `${url}${svgFileName}`;
            resolve(diagramUrl);
        });
    });
};
