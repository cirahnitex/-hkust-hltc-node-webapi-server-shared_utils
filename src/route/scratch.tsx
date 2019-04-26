import {RemoteUser, requireRemoteUser} from "../ApiDecorators";
import {JSXXML} from "jsx-xml";
import {requireAdmin} from "../ApiDecorators";
const secret = Math.random();
function showRandomSecret() {
    return <value>{secret}</value>;
}

export default requireAdmin(showRandomSecret);