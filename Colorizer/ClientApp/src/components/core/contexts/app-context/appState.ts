import { UserProfile } from "src/components/models";

export interface AppState {
    isLoading: boolean;
    email: string;
    token: string;
    user: UserProfile;
}