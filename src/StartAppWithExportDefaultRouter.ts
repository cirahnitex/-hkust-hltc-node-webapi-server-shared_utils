import http from "http";
import express from "express";
import {callExportDefaultFunctionRouter} from "./CallExportDefaultFunctionRouter";
import multer from "multer";

export function startAppWithExportDefaultRouter(apiRoot: string) {
    const app = express();

    app.use(express.json({limit: '100mb'}));
    app.use(express.urlencoded({ extended: true, limit: '100mb' }));
    app.use(multer({storage:multer.memoryStorage()}).any());

    callExportDefaultFunctionRouter(app, apiRoot);

    const PORT:number = process.env.PORT && parseInt(process.env.PORT) || 3000;
    http.createServer(app)
        .listen(PORT)
        .on("listening", ()=>{
            console.log(`server listening on port ${PORT}`);
        });
}