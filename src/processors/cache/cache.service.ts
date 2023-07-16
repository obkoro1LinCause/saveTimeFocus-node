import { Injectable ,Inject} from "@nestjs/common";
import logger from "@app/utils/logger";
import RedisClientType,{ Redis } from 'ioredis';


@Injectable()
export class CacheService{
    public redisClient: RedisClientType;
    constructor(){
        this.redisClient = new Redis({
            host: 'localhost',
            port: 6379,
            db:2,
        });
        this.redisClient.on('error', (err) => logger.error('Redis cluster Error', err));
        this.redisClient.on('connect', () => logger.info('redis连接成功'));
    }

    set = async <T>(key: string, value: T, options:any = {}): Promise<void> => {
        const { ttl } = options
        const _value = value ? JSON.stringify(value) : ''
        if (ttl) {
          const _ttl = typeof ttl === 'function' ? ttl(value) : ttl
          await this.redisClient.setex(key, _ttl, _value)
        } else {
          await this.redisClient.set(key, _value)
        }
    }
    
    get = async <T>(key: string): Promise<T> => {
        const value = await this.redisClient.get(key)
        return value ? JSON.parse(value) : value
    }
    
    del = async (key: string) => {
        await this.redisClient.del(key)
    }
}