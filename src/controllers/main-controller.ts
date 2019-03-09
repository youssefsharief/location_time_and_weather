import { inject, injectable } from 'inversify'
import { TimeApiService } from '../services/time-api-service'
import { OpenWeatherApiService } from '../services/open-weather-api-service'
import * as yargs from 'yargs'
import { utility } from '../services/utility'
import { logger } from '../infrastructure/logger'

@injectable()
export class MainController {
  constructor(
    @inject(TimeApiService) private readonly timeApiService: TimeApiService,
    @inject(OpenWeatherApiService) private readonly openWeatherApiService: OpenWeatherApiService,
  ) {}

  async start() {
    const argv: any = yargs
      .usage('Usage: node $0 [array of locations]')
      .example('', 'node $0 -; Cairo -z 11474  -l "New York" -z 12324')
      .alias('l', 'locationName')
      .alias('z', 'zipCode')
      .demandOption(['l', 'z'])
      .help('h')
      .alias('h', 'help').argv

    if (utility.areDataInCompatible(argv)) {
      return logger.log('error', 'Please provide data for all location names and zip codes for all locations')
    } else {
      let locations: Array<{ locationName: string; zipCode: number }> = []
      if (typeof argv.l === 'string') {
        locations = [{ locationName: argv.l, zipCode: argv.z }]
      } else {
        locations = argv.l.map((locationName, i) => ({ locationName, zipCode: argv.z[i] }))
      }
      // This api calls are in series. The api does not work for more than two locations when run in parallel
      for (const item of locations) {
        await this.dataForOneLocation(item.zipCode, item.locationName)
      }
    }
  }

  async dataForOneLocation(zipCode: number, locationName: string): Promise<void> {
    try {
      const weather = await this.openWeatherApiService.getWeather(zipCode)
      const time = await this.timeApiService.fetchTimeFromCoordinates(weather.coord.lat, weather.coord.lon)
      logger.log(
        'info',
        `Weather for ${locationName}: Temp is ${weather.main.temp} Kelvin, humidity is ${weather.main.humidity}%.
             Pressure is ${weather.main.pressure}hPa. Current Time is ${time.formatted}`,
      )
    } catch (e) {
      switch (e.constructor) {
        case URIError:
          logger.error(`Please enter a correct zip code for the location ${locationName}`)
          return
        case Error:
          logger.error(`An error occurred in the weather api for the location ${locationName}`)
          return
        default:
          logger.error(`Unknown error for the location ${locationName}`)
          return
      }
    }
  }
}
