import {BaseApiService} from './base.api.service';
import {LoginModel} from "../components/models/login.model";
import {LoginResponseModel} from "../components/models/loginResponse.model";
import {AxiosResponse} from "axios";

const loginApiUrl = 'api/login';

export class LoginApiService extends BaseApiService {

  public async login (model: LoginModel): Promise<AxiosResponse<LoginResponseModel>> {
    return (await this.POST(loginApiUrl, model, true));
  }
}
