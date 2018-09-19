import {ObjectID} from "bson";
import {Ref} from "typegoose";

export function getIDFromRef<T extends {_id:ObjectID}>(x:Ref<T>):ObjectID {
    if(x instanceof ObjectID) return x;
    return x._id;
}