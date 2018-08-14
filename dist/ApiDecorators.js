"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireAdmin(api) {
    return (param) => {
        if (param.REMOTE_USER !== 1)
            throw new Error("PERMISSION_DENIED");
        return api(param);
    };
}
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=ApiDecorators.js.map