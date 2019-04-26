import {RemoteUser, requireRemoteUser} from "../ApiDecorators";
import {JSXXML, Raw} from "jsx-xml";
import {requireAdmin} from "../ApiDecorators";

interface Params {
    object: Element,
    expires?: string,
    description?: string,
}

function showRandomSecret({object, expires, description}:Params) {
    if(expires == null) {
        expires = "[infinite]";
    }
    if(description == null) {
        description = "[empty]";
    }
    return <value>
        {object && Raw({children:object.outerHTML})}
        <expires>{expires}</expires>
        <description>{description}</description>
    </value>;
}

export default requireAdmin(showRandomSecret);