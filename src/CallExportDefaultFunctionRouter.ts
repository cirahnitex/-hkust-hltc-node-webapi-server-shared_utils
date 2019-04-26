import {Express} from "express";
import {join} from "path";
import {JSXXML, render} from "jsx-xml";
import {JSDOM} from "jsdom";
import {inspect} from "util";
interface MulterFile {
    /** Field name specified in the form */
    fieldname: string;
    /** Name of the file on the user's computer */
    originalname: string;
    /** Encoding type of the file */
    encoding: string;
    /** Mime type of the file */
    mimetype: string;
    /** Size of the file in bytes */
    size: number;
    /** The folder to which the file has been saved (DiskStorage) */
    destination: string;
    /** The name of the file within the destination (DiskStorage) */
    filename: string;
    /** Location of the uploaded file (DiskStorage) */
    path: string;
    /** A Buffer of the entire file (MemoryStorage) */
    buffer: Buffer;
}

export function callExportDefaultFunctionRouter(app:Express, apiRoot:string) {
    const handler = async (req,res)=>{
        try {

            const api = require(join(apiRoot, req.path)).default;

            let paramsFromFileUpload:any = {};
            if(req.files) {
                for(const file of req.files as MulterFile[]) {
                    const root = new JSDOM(file.buffer, {contentType: file.mimetype}).window.document.firstElementChild;
                    if(!root) throw new Error("fail to parse XML parameter");
                    if(root.tagName === 'value' && root.children.length <= 0 && root.textContent) {
                        paramsFromFileUpload[file.fieldname] = root.textContent;
                    }
                    else {
                        paramsFromFileUpload[file.fieldname] = root;
                    }
                }
            }

            const value = await api({...paramsFromFileUpload, ...req.query, ...req.body}, req.headers);
            res.contentType("text/xml");

            if(value == null) {
                res.contentType("text/plain");
                res.send("");
                return;
            }
            else if(typeof(value) === 'string') {
                if(value.startsWith("<?xml")) {
                    res.send(value);
                }
                else {
                    res.status(500);
                    res.contentType("text/plain");
                    res.send("WebAPI handler does not return XML");
                }
            }
            else {
                try {
                    res.send(render(value, {endOptions: {pretty: true}}));
                }
                catch(e) {
                    res.status(500);
                    res.contentType("text/plain");
                    res.send("WebAPI handler does not return XML");
                }
            }
        }
        catch(e) {
            res.status(500);
            res.contentType("text/plain");
            res.send(e.message);
        }
    };
    app.get(/^.*$/,handler);
    app.post(/^.*$/,handler);
}