import { Schema } from 'mongoose';

//this schema is used to compile to runtime model defined within the cat.module file 
export const CatSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    isNice: {type: Boolean, required: false}
});