import { Typegoose } from "typegoose";
import { ObjectID } from "bson";
export default class DocumentBase extends Typegoose {
    _id: ObjectID;
    constructor();
}
