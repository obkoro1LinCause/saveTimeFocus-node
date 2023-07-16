import { Injectable } from '@nestjs/common';
import { CacheService } from '@app/processors/cache/cache.service'
@Injectable()
export class LoginService {
    constructor(
        private readonly cacheService: CacheService,
    ){
       
    }
}
