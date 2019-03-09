import * as request from 'request-promise-native'
import { config } from '../config/config'
import { injectable } from 'inversify'

interface TimeApiResponse {
  formatted: string
}

@injectable()
export class TimeApiService {
  async fetchTimeFromCoordinates(lat: number, lng: number): Promise<TimeApiResponse> {
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${
      config.timezoneDbApi.apiKey
    }&by=position&lat=${lat}&lng=${lng}&format=json`
    return JSON.parse(await request.get(url))
  }
}
