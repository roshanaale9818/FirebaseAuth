import { Roles } from './roles';
export class User {
  uid:string;
  firstName:string;
  lastName:string;
  email:string;
  roles:Roles;
  password:string;
}
