import { Injectable, Inject, OnModuleInit } from "@nestjs/common";
import logger from "@app/utils/logger";
import * as Redis from "redis";
import { REDIS_OPTIONS } from '@app/app.config'

const redisLog = logger.scope("redis");
@Injectable()
export class CacheService {
  private redisClient;
  private isReadied = false;
  constructor() {
    this.redisClient = Redis.createClient(this.createCacheOptions());

    this.redisClient.on("connect", () => {
      redisLog.info("connecting...");
    });

    this.redisClient.on("reconnecting", () => {
      redisLog.warn("reconnecting...");
    });

    this.redisClient.on("ready", () => {
      this.isReadied = true;
      redisLog.info("readied.");
    });

    this.redisClient.on("end", () => {
      this.isReadied = false;
      redisLog.error("client end!");
    });

    this.redisClient.on("error", (error) => {
      this.isReadied = false;
      redisLog.error(`client error!`, error.message);
    });

    // connect
    this.redisClient.connect();
  }

  public retryStrategy(retries: number): number | Error {
    const errorMessage = `retryStrategy! retries: ${retries}`;
    // redisLog.error(errorMessage)
    // this.sendAlarmMail(errorMessage)
    if (retries > 6) {
      return new Error("Redis maximum retries!");
    }
    return Math.min(retries * 1000, 3000);
  }

  createCacheOptions() {
    const redisOptions: any = {
      socket: {
        host: REDIS_OPTIONS.host,
        port: REDIS_OPTIONS.port,
        reconnectStrategy: this.retryStrategy.bind(this),
      },
    };
    redisOptions.username = REDIS_OPTIONS.username;
    redisOptions.password = REDIS_OPTIONS.password;
    return redisOptions;
  }

  public  async set<T>(key: string, value: T, options?: {  ttl: number | any}): Promise<void> {
    if (!this.isReadied) {
        return Promise.reject("Redis has not ready!");
    }
    const { ttl } = options;
    const _value = value ? JSON.stringify(value) : "";
    if (ttl) {
        const _ttl = typeof ttl === "function" ? ttl(value) : ttl;
        // https://redis.io/commands/setex/
        await this.redisClient.setEx(key, _ttl, _value);
    } else {
        await this.redisClient.set(key, _value);
    }
  };

  public async get<T>(key: string): Promise<T> {
    if (!this.isReadied) {
      return Promise.reject("Redis has not ready!");
    }
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : value;
  }

  public async delete(key: string) {
    if (!this.isReadied) {
      return Promise.reject("Redis has not ready!");
    }
    return await this.redisClient.del(key);
  }
}
