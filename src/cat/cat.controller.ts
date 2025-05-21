import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe , Query} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatFilter } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.catService.findOneByName(name);
  }

  @Patch(':name')
  update(@Param() filter: CatFilter, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(filter, updateCatDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.catService.remove(name);
  }
}
