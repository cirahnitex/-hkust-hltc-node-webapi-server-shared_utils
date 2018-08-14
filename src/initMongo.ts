import * as mongoose from 'mongoose';

// don't know what the f**k is going wrong, I have to hardcode IP address here. When I try to use the string "hltc31" it gives segfault
const hltc31 = "192.168.152.31";
export default function(dbName: string):Promise<void> {
    return mongoose.connect(`mongodb://${hltc31}:27017/${dbName}`,{useNewUrlParser:true}).then(()=>{
        console.log('[mongodb] connected');
    });
}
