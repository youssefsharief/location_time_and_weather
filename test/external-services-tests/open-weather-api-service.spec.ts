import testingContainer from '../ioc_config_test'
import { OpenWeatherApiService } from '../../src/services/open-weather-api-service'

describe('open weather api service', () => {
  let openWeatherApiService: OpenWeatherApiService
  beforeAll(() => {
    openWeatherApiService = testingContainer.get<OpenWeatherApiService>(OpenWeatherApiService)
  })
  describe('get Weather', () => {
    it('should get humidity, longitude and latitude ', async () => {
      const result = await openWeatherApiService.getWeather(98001)
      expect(result.coord.lat).toBeTruthy()
      expect(result.coord.lon).toBeTruthy()
      expect(result.main.humidity).toBeTruthy()
    })

    it('should respond when zip code is invalid ', async () => {
      await expect(openWeatherApiService.getWeather(11471)).rejects.toThrow(URIError)
    })
  })
})
