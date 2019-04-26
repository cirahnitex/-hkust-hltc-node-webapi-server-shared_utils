import fetch from "node-fetch";
import {JSDOM} from "jsdom";
export type RemoteUser = {
    ID:string, email:string
}

type ServerResponse = {
    user: RemoteUser | null,
    success: boolean
}

const HLTC00_DISPATCHER_PORT = 8792;

export function requireRemoteUser(api:(params:any, remoteUser:RemoteUser)=>Promise<any>|any) {
    return async (params:any, headers:any) => {
        const fetchResult = await fetch(`http://hltc00:${HLTC00_DISPATCHER_PORT}/account/get_active_user`, {
            method: "get",
            headers: {
                cookie: headers.cookie
            }
        });

        if(!fetchResult.ok) throw new Error("fail to communicate with account server");

        const text = await fetchResult.text();
        const document = new JSDOM(text, {
            contentType: "text/xml"
        }).window.document;

        const idNode = document.querySelector("id");
        const emailNode = document.querySelector("email");
        if(idNode && idNode.textContent && idNode.textContent.length>0) {
            if(emailNode && emailNode.textContent && emailNode.textContent.length>0) {
                return api(params,{ID:idNode.textContent, email:emailNode.textContent})
            }
        }

        throw new Error("UNAUTHORIZED");
    }
}

export function requireAdmin(api:(params:any)=>Promise<any>|any) {
    return requireRemoteUser((params:any, remoteUser:RemoteUser)=>{
        if(remoteUser.ID !== '1') throw new Error("PERMISSION_DENIED");
        return api(params);
    });
}