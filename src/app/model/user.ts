import { Audit } from "./Audit";

export class Users{
    id:number;
    email:string;
    name:string;
    username:string;
    password:string;
    cpassword:string;
    role:string[];
    city:string;
    mobile:string;
    audit:Audit;

}