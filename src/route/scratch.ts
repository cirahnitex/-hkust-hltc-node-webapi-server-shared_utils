import {RemoteUser, requireRemoteUser} from "../ApiDecorators";
function sayHi(params:any, remoteUser:RemoteUser) {
    return "hello, "+remoteUser.email;
}
export default requireRemoteUser(sayHi);