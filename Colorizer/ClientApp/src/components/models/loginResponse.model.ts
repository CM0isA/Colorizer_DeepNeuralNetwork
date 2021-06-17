import {UserProfile} from "./userProfile.model";

export interface LoginResponseModel{
	token: string;
	userProfile: UserProfile;
}
