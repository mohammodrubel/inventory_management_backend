export type T_registration_type = {
    userName:string;
    email:string;
    password:string;
    isDeleted:boolean,
    role:'user' | 'admin' | 'saller'
    status:'active' | 'blocked'
}

export type T_login_type = {
    email:string,
    password:string
}