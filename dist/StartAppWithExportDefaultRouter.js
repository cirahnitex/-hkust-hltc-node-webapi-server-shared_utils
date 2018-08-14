"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const CallExportDefaultFunctionRouter_1 = require("./CallExportDefaultFunctionRouter");
function startAppWithExportDefaultRouter(apiRoot) {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    CallExportDefaultFunctionRouter_1.callExportDefaultFunctionRouter(app, apiRoot);
    const PORT = process.env.PORT && parseInt(process.env.PORT) || 3000;
    http.createServer(app)
        .listen(PORT)
        .on("listening", () => {
        console.log(`server listening on port ${PORT}`);
    });
}
exports.startAppWithExportDefaultRouter = startAppWithExportDefaultRouter;
//# sourceMappingURL=StartAppWithExportDefaultRouter.js.map