import {BaseApiService} from './base.api.service';
import {LoginResponseModel} from "../components/models/loginResponse.model";
import {AxiosResponse} from "axios";

const reportsApiUrl = 'api/reports';

export class ReportsApiService extends BaseApiService {

  public async login (data: any): Promise<AxiosResponse<LoginResponseModel>> {
    return this.POST(reportsApiUrl, data);
  }
}
