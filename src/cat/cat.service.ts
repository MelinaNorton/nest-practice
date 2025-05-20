import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Cat } from './interfaces/cat.interface'

export interface CatFilter{
  isNice?: boolean;
  color?: string;
  name?: string;
}
//the services contain all functionailty called upon by the controller
export class CatService {

  //the constructor accesses the 'Cat' model compiled in cat.module (NOT to be confused with Cat (no quotes)) and
  //uses it in the InjectModel parameter as the model-to-be-injected. Cat-no-quotes references the Cat interface
  // (used for type validation for incoming data) as the type
  constructor(
    @InjectModel('Cat') private readonly catModel: Model<Cat>,){}
  
  //this create-cat function uses the dto defined in ./dto/create-cat.dto to creat an instance of a cat with the same
  //shape as the dto. The actual creation is handled through a parameter passed to the catModel from the function
  //above, the parameter being the instance of CreateCatDto, createCatDto
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const newcat = new this.catModel(createCatDto);

    //newcat.save() adds the new document to the (theoretical) database
    return newcat.save();
  }

  //this function "finds all" of the cats according to the parameter: truly all, should the filter be empty, or all
  //the cats that match the given filters
  findAll(filter: CatFilter = {}): Promise<Cat[]> {
    //the query can be of any type, as referenced by "any"
    const query: any = {};

    //if the isNice or color fields of the filter are defined, set them as fields in the query to be passed to our 
    //database (catModel)
    if(filter.isNice !=undefined) query.isNice = filter.isNice;
    if(filter.color !=undefined) query.color = filter.isNice;
    return this.catModel.find(query).exec();
  }

  //this function uses the string parameter name and promises one of two things- a cat documents (of shape Cat), or
  //null. This is acheived by using catModel's built-in method findOne with the name parameter
  async findOneByName(name: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ name }).exec();
    return cat;
  }

  //this function updates the isNice field of a cat found through the CatFilter (we assume the only filter applied)
  //here is "name". It determines the new temperment based on a terniary operator, and passes the new ({isNice:newIsNice})
  //directly to the fineOneAndUpdate() function
  //the handling of the contingency !updated is NECESSARY- so that the program can ensure that the Promise<Cat> is 
  //upheld
  async update(filter: CatFilter, isNice: boolean, updateCatDto: UpdateCatDto): Promise<Cat> {
    const newIsNice = !isNice;
    const temperment = newIsNice? 'nicer':'meaner';
    console.log(`This action makes a cat #${temperment}`);

    const updated = await this.catModel
      .findOneAndUpdate(filter, {isNice:newIsNice}, {new:true})
      .exec();
    if(!updated){
      throw new NotFoundException('No cat found by that name!');
    }
    return updated;
  }


//This function utilizes the VERY convenient fineOneAndDelete method connected to mongoose models; it finds and deletes
//the cat with the parameter-name passed to the function, and necessarily handles the contongency of a nonexistent-cat
 async  remove(name: string): Promise<Cat> {
    console.log(`This action removes #${name} :(`);
    const deletedCat = await this.catModel 
      .findOneAndDelete({ name })
      .exec();
    if(!deletedCat){
      throw new NotFoundException("Cat not found!")
    }
    return deletedCat;
  }
}
