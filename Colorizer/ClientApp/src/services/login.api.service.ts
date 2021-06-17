import {BaseApiService} from './base.api.service';
import {LoginModel} from "../models/login.model";
import {LoginResponseModel} from "../models/loginResponse.model";
import {AxiosResponse} from "axios";

const loginApiUrl = 'api/login';

export class LoginApiService extends BaseApiService {

  public async login (model: LoginModel): Promise<AxiosResponse<LoginResponseModel>> {
    return (await this.POST(loginApiUrl, model, true));
  }
}
