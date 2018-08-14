import * as http from "http";
import * as express from "express";
import {callExportDefaultFunctionRouter} from "./CallExportDefaultFunctionRouter";

export function startAppWithExportDefaultRouter(apiRoot: string) {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    callExportDefaultFunctionRouter(app, apiRoot);

    const PORT:number = process.env.PORT && parseInt(process.env.PORT) || 3000;
    http.createServer(app)
        .listen(PORT)
        .on("listening", ()=>{
            console.log(`server listening on port ${PORT}`);
        });
}