import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';

//module decorator (function adding data to the current class/function)
//can import other modules
//feature modules allow you to separate your app's functionalities
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://linamelina0707:gfnmEAPfyM3BlMMJ@cluster0.gqer0il.mongodb.net/',{}),
    CatModule
  ]
})
export class AppModule {}
