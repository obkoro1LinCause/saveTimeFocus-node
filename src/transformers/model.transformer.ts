import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export interface Model{
    new (...args: any[])
}


export function getDynamicModuleByModel(Model:Model):DynamicModule{
    return TypeOrmModule.forFeature([Model]);
};