import { hashSync } from 'bcryptjs';

// 加密
export function md5Handle(password,num =10){
    return hashSync(password,num);
}

// 随机生成四位数
export function randHandle(min=1000, max=9999) {
  return Math.floor(Math.random() * (max - min)) + min;
}
