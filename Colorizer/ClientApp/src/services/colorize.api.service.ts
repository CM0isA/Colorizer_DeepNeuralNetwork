

import axios, {AxiosResponse} from "axios";

const colorizeApiUrl = 'api/colorize';

export class ColorizeApiService {

  public async Colorize (formData: FormData): Promise<AxiosResponse> {
    return axios.post(colorizeApiUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
  }
}
