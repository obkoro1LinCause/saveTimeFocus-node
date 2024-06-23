import { Injectable,Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Block, User } from "@app/module";
import { plainToClass } from "class-transformer";
import { AuthService } from "../auth/auth.service";
import { CacheService } from "@app/processors/cache/cache.service";
import { websites } from "@app/constants/website.constant";
import { HttpService } from "@nestjs/axios";
import { isUrl, isDomain } from "@app/utils/index";
import * as cheerio from "cheerio";
import path from "node:path";
import { REQUEST } from '@nestjs/core';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block) private blockRepository: Repository<Block>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(REQUEST) private request: Request,
    private readonly httpService: HttpService

  ) {}

  websiteRes = [];
  // 添加
  async addBlockSite(user) {
    console.log(this.request.url,'====1==1====')
    // const block = new Block();
    // block.domainName = "我是domainName1的的的11sdedewsww";
    // block.domain = "我是domain11s的的dededeeewww";
    // block.users = await this.userRepository.find({
    //   where: {
    //     id: user.id,
    //   },
    // });
    // // // this.blockRepository.save(block)
    // // // const newObj = await this.blockRepository.create({
    // // //     domainName:'我是domainName',
    // // //     domain:'我是domain',
    // // //     users:user
    // // // });
    // // // newObj 中会去除haha字段
    // const res = await this.blockRepository.save(block);
    // return 1;
  }
  // 更新
  updateBlockSite() {}

  // 删除
  delBlockSite() {}

  // 搜索网站信息
  async searchWebSite(query) {
    try {
      // 前端需要判断是否是合理的url，关键字
      const urlBool = isUrl(query);
      const domainBool = isDomain(query);
      let url = query;
      if (!domainBool && !urlBool) return [];
      if (!urlBool) {
        url = `https://${query}`;
      }
      console.log(url, "====url===");
      const res = await this.getWebSiteInfo(url);
      return res;
    } catch (err) {
      return [];
    }
  }

  async getWebSiteList() {
    // try{
    //     const filePath = path.resolve(__dirname,'../../../public/website.txt');
    // }catch(err){
    //     return  Promise.reject(err);
    // }
  }

  // 爬虫获取信息
  getWebSiteInfo(href) {
    if (!href) return;
    return new Promise((resolve, reject) => {
      const result = { title: "", icons: [] };
      this.httpService.axiosRef
        .request({
          method: "get",
          url: href,
        })
        .then((res) => {
          const $ = cheerio.load(res.data);
          result.title = $("title").text();
          // rel不是 === icon，也有可能存在 rel="xxx icon"的情况
          $('link[rel*="icon"]').each(function () {
            const rel = $(this).attr("rel");
            // 排除rel="mask-icon"这种情况
            if (/[^-]icon/.test(rel) || rel === "icon") {
              const ico = $(this).attr("href");
              result.icons.push(ico);
            }
          });
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 查询用户的阻止列表
  async findBlockSite(user) {
    console.log(this.request.url,'=====this===')
    // const blocks = await this.blockRepository.find({
    //   relations: {
    //     users: true,
    //   },
    // });

    // blocks.filter((item:any)=>{
    //     item.users.length
    // })

    // console.log(user.id);
    // return blocks;
    // const users = await this.userRepository.find({
    //     where:{
    //         id:user.id
    //     }
    // });
    // const blocks = await this.blockRepository.find({
    // where:{
    //     users:true
    // },
    //     relations: {
    //         users: true,
    //     },
    // });
    // console.log(blocks);
    // return { blocks };
  }
}
