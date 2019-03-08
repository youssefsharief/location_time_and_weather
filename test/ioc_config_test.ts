import 'reflect-metadata';

import { Container, ContainerModule } from 'inversify';
import { productionValues } from '../src/config/ioc-container-modules';

const testingContainer = new Container({ autoBindInjectable: true });

testingContainer.load(productionValues);

export default testingContainer;
