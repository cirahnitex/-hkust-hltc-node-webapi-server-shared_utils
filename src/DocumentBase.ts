import {prop, Typegoose} from "typegoose";
import {ObjectID} from "bson";

export default class DocumentBase extends Typegoose {
    @prop()
    _id: ObjectID;
    constructor() {
        super();
        this._id = new ObjectID();
    }
}