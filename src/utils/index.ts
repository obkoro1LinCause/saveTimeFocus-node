import md5 from 'blueimp-md5';

// 加密
export function md5Handle(data){
    return md5(data);
}

// 随机生成四位数
export function randHandle(min=1000, max=9999) {
  return Math.floor(Math.random() * (max - min)) + min;
}
