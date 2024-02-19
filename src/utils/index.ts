import { hashSync } from 'bcryptjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import randomstring from 'randomstring';
import { EquipmentEnum } from '@app/types';

dayjs.extend(utc);


interface Charset {
  alphanumeric?:any[],
  alphabetic?:any[],
  numeric?:any,
  hex?:any,
  binary?:any,
  octal?:any
  custom?:any
}
interface Capitalization{
  lowercase?:any,
  uppercase?:any
}
interface RandomStrOptions {
  length?:number,
  readable?:boolean,
  charset?:Charset,
  capitalization?:Capitalization
}

// 加密
export function createHashStr(password,num = 10){
    return hashSync(password,num);
}

// 随机生成字符串,默认生成6位数
export function createRandomStr(options?:RandomStrOptions,cb?:Function){
  if(!options) return randomstring.generate(6);
  return randomstring.generate(options,cb)
}

// vip时间计算 
export function createVipTimestamp({ timestamp,base }:{
  timestamp?:number,
  base:number
}){
  if(!timestamp){
    timestamp = dayjs.utc().valueOf();
  }
  const dateTime = +timestamp + base;
  return dateTime;
}


// 判断设备信息
export function getEquipmenType(ua:string){
  if (ua.indexOf('Firefox') > -1) return EquipmentEnum.Firefox;
  if (ua.indexOf('WebKit') > -1 || ua.indexOf('Chrome')) return EquipmentEnum.Chrome;
  if (ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1) return EquipmentEnum.IE;
  if (!!ua.match(/AppleWebKit.*Mobile.*/)){
    if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) return EquipmentEnum.ios;
    if(ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) return EquipmentEnum.android;
  }
}