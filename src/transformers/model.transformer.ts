import { DB_MODEL_CONNECTION_TOKEN } from '@app/constants/sys.constant';
import { Provider, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';


export interface Model{
    new (...args: any[])
}

export function getProviderByModelClass(modelClass:string,Model:Model):Provider{
    return {
        provide: modelClass, 
        useFactory:  (dataSource: DataSource) => dataSource.getRepository(Model),
        inject: [DB_MODEL_CONNECTION_TOKEN],
    }
}