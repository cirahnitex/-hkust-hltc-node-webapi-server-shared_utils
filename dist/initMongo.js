"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// don't know what the f**k is going wrong, I have to hardcode IP address here. When I try to use the string "hltc31" it gives segfault
const hltc31 = "192.168.152.31";
function default_1(dbName) {
    return mongoose.connect(`mongodb://${hltc31}:27017/${dbName}`, { useNewUrlParser: true }).then(() => {
        console.log('[mongodb] connected');
    });
}
exports.default = default_1;
//# sourceMappingURL=initMongo.js.map