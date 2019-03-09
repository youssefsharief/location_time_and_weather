import { ContainerModule } from 'inversify'
import { OpenWeatherApiService } from '../services/open-weather-api-service'
import { TimeApiService } from '../services/time-api-service'

// export const concrete = new ContainerModule(bind => {});

// export const commonConfigurableValues = new ContainerModule(bind => {});

export const productionValues = new ContainerModule(bind => {
  bind<OpenWeatherApiService>(OpenWeatherApiService).toSelf()
  bind<TimeApiService>(TimeApiService).toSelf()
})
