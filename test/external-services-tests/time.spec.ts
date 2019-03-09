import testingContainer from '../ioc_config_test'
import { TimeApiService } from '../../src/services/time-api-service'

describe('time api service', () => {
  let timeApiService: TimeApiService
  beforeAll(() => {
    timeApiService = testingContainer.get<TimeApiService>(TimeApiService)
  })
  describe('get time', () => {
    it('should get formatted date ', async () => {
      const result = await timeApiService.fetchTimeFromCoordinates(32, 33)
      expect(result.formatted).toBeTruthy()
    })
  })
})
