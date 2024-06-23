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


export function isDomain(domain:string){
  const weburl = new RegExp(
    "^" +
      "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broadcast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
        // host & domain names, may end with dot
        // can be replaced by a shortest alternative
        // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
        "(?:" +
          "(?:" +
            "[a-z0-9\\u00a1-\\uffff]" +
            "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
          ")?" +
          "[a-z0-9\\u00a1-\\uffff]\\." +
        ")+" +
        // TLD identifier name, may end with dot
        "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      // port number (optional)
      "(?::\\d{2,5})?" +
      // resource path (optional)
      "(?:[/?#]\\S*)?" +
    "$", "i"
  );
  return weburl.test(domain);
}

export function isUrl (url:string) {
  const weburl = new RegExp(
    "^" +
      // protocol identifier (optional)
      // short syntax // still required
      "(?:(?:(?:https?|ftp):)?\\/\\/)" +
      // user:pass BasicAuth (optional)
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broadcast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
        // host & domain names, may end with dot
        // can be replaced by a shortest alternative
        // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
        "(?:" +
          "(?:" +
            "[a-z0-9\\u00a1-\\uffff]" +
            "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
          ")?" +
          "[a-z0-9\\u00a1-\\uffff]\\." +
        ")+" +
        // TLD identifier name, may end with dot
        "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      // port number (optional)
      "(?::\\d{2,5})?" +
      // resource path (optional)
      "(?:[/?#]\\S*)?" +
    "$", "i"
  );
  return weburl.test(url);
}



export const formatNum = (...val: any[]) =>
  val.map(item => (isNaN(item) ? item : Number(item)));