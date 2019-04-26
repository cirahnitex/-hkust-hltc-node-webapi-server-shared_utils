import {startAppWithExportDefaultRouter} from "./StartAppWithExportDefaultRouter";

import Path from "path";

(async() =>{

    startAppWithExportDefaultRouter(Path.join(__dirname, "route"));
})();
