import { User } from "../../../models/user.model";

export interface AppState {
    isLoading: boolean;
    email: string;
    token: string;
    user: User;
}