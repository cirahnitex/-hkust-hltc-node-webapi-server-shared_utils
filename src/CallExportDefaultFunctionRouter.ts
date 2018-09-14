import {Express} from "express";
import {join} from "path";

export function callExportDefaultFunctionRouter(app:Express, apiRoot:string) {
    app.post(/^.*$/,async (req,res)=>{
        res.contentType("application/json");
        try {
            const api = require(join(apiRoot, req.path)).default;
            const value = await api(req.body);
            res.send(JSON.stringify({
                success: true,
                value
            }))
        }
        catch(e) {
            res.send(JSON.stringify({
                success: false,
                message: e.message
            }));
        }
    })
}