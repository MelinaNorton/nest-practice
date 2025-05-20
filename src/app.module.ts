import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';

//module decorator (function adding data to the current class/function)
//can import other modules
//feature modules allow you to separate your app's functionalities
@Module({
  imports: [CatModule]
})
export class AppModule {}
