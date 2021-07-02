export interface User{
    user:{
        _id:string;
        name:string;
        email:string;
        createdAt:string;
        updatedAt:string;
    }
    token:string;
}