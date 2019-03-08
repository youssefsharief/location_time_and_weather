import { injectable } from 'inversify';
import * as request from 'request-promise-native';
import { config } from '../config/config';

export interface OpenWeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    };
}

@injectable()
export class OpenWeatherApiService {
    async getWeather(zipCode: number): Promise<OpenWeatherResponse> {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${config.weather.apiKey}`;
        try {
            const res = await request.get(url);
            return JSON.parse(res);
        } catch (e) {
            if (e.statusCode === 404) {
                throw URIError();
            } else {
                throw Error();
            }
        }
    }
}
