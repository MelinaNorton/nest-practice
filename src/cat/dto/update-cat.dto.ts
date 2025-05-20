import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

//all this function does is allows the user to PUT/PATCH just one or so fields, by marking properties in the base
//class as optional (foreach (@isOptional prop?: Base[prop]))
//note: this is only when update-cat.dto is used; using create-cat.dto will trow an error in thye absence of required
//fields
export class UpdateCatDto extends PartialType(CreateCatDto) {
    name?: string;
    age?: number;
    isNice: boolean;
}
