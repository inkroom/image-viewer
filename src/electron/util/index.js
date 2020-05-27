import fs from 'fs';
import path from 'path';
/**
 * 扫描文件夹下的图片文件
 * @param {string} dir 文件夹路径
 */
export function scanImgs(dir){

    let imgs = []
    let files =  fs.readdirSync(dir)
    files.forEach((filename,index)=>{
        let pathname = path.join(dir, filename);
        let stat = fs.statSync(pathname);

        if(stat.isFile() && isImg(filename)){
            imgs.push({path:pathname,size:stat.size,time:stat.birthtimeMs  });
        }
    })

    return Promise.resolve(imgs);

}
/**
 * 判断是不是图片
 * @param {string} name 文件名
 */
export function isImg(name){

    return /\.(jpg|jpeg|png|bmp|gif)/.test(name);

}