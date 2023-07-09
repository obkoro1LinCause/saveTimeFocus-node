import { ApiQuery,ApiBody,ApiParam,ApiHeader,ApiHeaders,ApiProperty } from '@nestjs/swagger';
import { isDevEnv } from '@app/app.environment';


export function useApiProperty(_attrs):Function{
     return isDevEnv ? ApiProperty(_attrs) :()=>{}
}


export function useApiQuery(_attrs):Function{
    return isDevEnv ? ApiQuery(_attrs): ()=>{}
}

export function useApiBody(_attrs):Function{
    return isDevEnv ? ApiBody(_attrs):()=>{}
}

export function useApiParam(_attrs):Function{
    return isDevEnv ? ApiParam(_attrs):()=>{}
}

export function useApiHeader(_attrs):Function{
    return isDevEnv ? ApiHeader(_attrs):()=>{}
}

export function useApiHeaders(_attrs):Function{
    return isDevEnv ? ApiHeaders(_attrs):()=>{}
}