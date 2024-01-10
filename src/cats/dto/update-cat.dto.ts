import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

//++ esto pasa todo a opcional las propiedades el dto de create
export class UpdateCatDto extends PartialType(CreateCatDto) {}
