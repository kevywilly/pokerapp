
export type AuthUserTypeMap = {
    id: number,
    username: string,
    idToken?: string,
    isActive?: boolean
}
export class AuthUser {
    id: number;
    username: string;
    idToken?: string;
    isActive:  boolean;

    constructor(options: AuthUserTypeMap) {
        this.id = options.id;
        this.username = options.username;
        this.idToken = options.idToken;
        this.isActive = options.isActive || true;
    }

}

export type OptionalAuthUser = (AuthUser | undefined)
