import axios, { AxiosResponse } from 'axios';

const photoApiUrl = 'api/colorize/';

export class PhotoApiService {

  public async downloadPhoto (url: string): Promise<AxiosResponse> {
    return axios.get(photoApiUrl + url, 
      {
        headers: {
            'Content-Type': 'image/png'
        },
        baseURL:"https://localhost:44360/",
        responseType: 'arraybuffer'
    })
  }
}
