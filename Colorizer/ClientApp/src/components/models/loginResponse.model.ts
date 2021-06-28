import {User} from "./user.model";

export interface LoginResponseModel{
	token: string;
	User: User;
}
