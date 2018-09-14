"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function callExportDefaultFunctionRouter(app, apiRoot) {
    app.post(/^.*$/, (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.contentType("application/json");
        try {
            const api = require(path_1.join(apiRoot, req.path)).default;
            const value = yield api(req.body);
            res.send(JSON.stringify({
                success: true,
                value
            }));
        }
        catch (e) {
            res.send(JSON.stringify({
                success: false,
                message: e.message
            }));
        }
    }));
}
exports.callExportDefaultFunctionRouter = callExportDefaultFunctionRouter;
//# sourceMappingURL=CallExportDefaultFunctionRouter.js.map