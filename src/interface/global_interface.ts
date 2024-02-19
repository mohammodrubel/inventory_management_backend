export type  T_Error_Sources = {
    path:string | number ,
    message:string
}[]

export type T_Generic_Error_Responce = {
    statusCode:number,
    message:string,
    errorSources:T_Error_Sources
}
export type T_User_Role = {
    user:string,
    admin:string,
    moderator:string,
}
export const USERROLE:T_User_Role = {
    user : 'user',
    admin : 'admin',
    moderator : 'moderator'
} 