import { AxiosResponse } from 'axios';
import { User } from '../components/models';
import { BaseApiService } from './base.api.service';

const usersApiUrl = 'api/users';
export class UsersApiService extends BaseApiService {
    
  public async getUsers(): Promise<User[]> {
    return (await this.GET<User[]>(usersApiUrl)).data;
  }

  public async getUserProfile(): Promise<User> {
    return (await this.GET<User>(`${usersApiUrl}/getUserProfile`)).data;
  }

  public async getUser(code: string): Promise<User> {
    return (await this.GET<User>(`${usersApiUrl}/getUserInfo/${code}`)).data;
  }

  public async createAccount(data: any): Promise<AxiosResponse> {
    return this.POST(`${usersApiUrl}/createAccount/`, data);
  }

  public async confirmAccount(data: any): Promise<AxiosResponse> {
    return this.POST(`${usersApiUrl}/confirmAccount/`, data);
  }

  public async DeleteUser(id: string) {
    await this.DELETE(usersApiUrl + '/' + id);
  }

}
