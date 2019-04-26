import {RemoteUser, requireRemoteUser} from "../ApiDecorators";
import {JSXXML, Raw} from "jsx-xml";
import {requireAdmin} from "../ApiDecorators";

function showRandomSecret() {
    return `<?xml version="1.0"?>\n<foo>a</foo>`;
}

export default showRandomSecret;