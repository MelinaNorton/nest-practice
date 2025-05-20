import { Module }            from '@nestjs/common';
import { MongooseModule }    from '@nestjs/mongoose';
import { CatService }       from './cat.service';
import { CatController }    from './cat.controller';
import { CatSchema }         from './schemas/cat.schema';

//add the imports field to hold your cats-model (compiled using the schema defined in ./schemas/cat.schema)
//'Cat' will be the name of our model to be used in injection, and CatSchema is what we named our schema in its
//definition. Also, remember to add this new module to your app.module.ts
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema}])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
