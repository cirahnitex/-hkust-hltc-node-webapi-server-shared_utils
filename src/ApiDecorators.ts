import fetch from "node-fetch";

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
        const fetchResult = await fetch(`http://hltc00:${HLTC00_DISPATCHER_PORT}/account/get_active_user?format=json`, {
            method: "get",
            headers: {
                cookie: headers.cookie
            }
        });
        const json:ServerResponse = await fetchResult.json();
        if(json.success && json.user != null) {
            return api(params, json.user);
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