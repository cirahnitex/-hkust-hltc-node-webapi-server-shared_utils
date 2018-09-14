
export function requireAdmin(api:(param:{[key:string]:string})=>Promise<any>) {
    return (param:any)=>{
        if(param.REMOTE_USER !== '1') throw new Error("PERMISSION_DENIED");
        return api(param);
    }
}