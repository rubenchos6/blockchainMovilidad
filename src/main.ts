import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { NestFactory } from '@nestjs/core';
import { config } from './config/endpoint.config'
import * as morgan from 'morgan'
import * as helmet from 'helmet';
const { port} = config;

 const apm = require('elastic-apm-node').start({
//   //Override service name from package.json
//   //Allowed characters: a-z, A-Z, 0-9, -, _, and space
   //serviceName: 'besu_rest',

//   //Use if APM Server requires a token
   //secretToken: '',

//   //Set custom APM Server URL (default: http://localhost:8200)
   serverUrl: 'http://localhost:8200',
 })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'))
  await app.listen(port);
}
bootstrap();


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
