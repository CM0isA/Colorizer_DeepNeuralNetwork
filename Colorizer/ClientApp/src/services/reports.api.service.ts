import {BaseApiService} from './base.api.service';
import {AxiosResponse} from "axios";

const reportsApiUrl = 'api/report';

export class ReportsApiService extends BaseApiService {

  public async submitReport (data: any): Promise<AxiosResponse> {
    return this.POST(reportsApiUrl, data);
  }
}
