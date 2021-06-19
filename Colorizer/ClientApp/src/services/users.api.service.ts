import { AxiosResponse } from 'axios';
import { User, UserProfile } from '../components/models';
import { BaseApiService } from './base.api.service';

const usersApiUrl = 'api/users';
export class UsersApiService extends BaseApiService {
    
  public async getUsers(): Promise<User[]> {
    return (await this.GET<User[]>(usersApiUrl)).data;
  }

  public async getUserProfile(): Promise<UserProfile> {
    return (await this.GET<UserProfile>(`${usersApiUrl}/getUserProfile`)).data;
  }



  public async createAccount(invitationCode: string, data: any): Promise<AxiosResponse> {
    return await this.PUT(`${usersApiUrl}/createAccount/${invitationCode}`, data);
  }

  public async checkInvitationCode(invitationCode: string) {
    return (await this.GET(`${usersApiUrl}/invitationCodeStatus/${invitationCode}`)).status;
  }

  public async DeleteUser(id: string) {
    await this.DELETE(usersApiUrl + '/' + id);
  }

  public async postUser(user: User) {
    return await this.POST(usersApiUrl, user);
  }
}
