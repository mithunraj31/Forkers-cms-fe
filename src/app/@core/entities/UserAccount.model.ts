export interface UserAccount {
    name: string;
    roles?: string[];
    id: string;
    email?: string;
    systemRoles?: string[];
    siteUuid?: string;
    imgUrl?: string;
    stk_user: string;
}