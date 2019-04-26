import {startAppWithExportDefaultRouter} from "./StartAppWithExportDefaultRouter";
import initMongo from "./initMongo";
import Path from "path";

(async() =>{
    await initMongo("shared_utils");

    startAppWithExportDefaultRouter(Path.join(__dirname, "route"));
})();
