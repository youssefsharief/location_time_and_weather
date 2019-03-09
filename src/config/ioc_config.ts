import 'reflect-metadata'

import { Container } from 'inversify'
import { productionValues } from './ioc-container-modules'

const container = new Container({ autoBindInjectable: true })

container.load(productionValues)

export default container
