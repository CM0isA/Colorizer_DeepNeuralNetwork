import { UserProfile } from "../../../models/userProfile.model";

export interface AppState {
    isLoading: boolean;
    email: string;
    token: string;
    user: UserProfile;
}