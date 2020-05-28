const { ipcMain,dialog } = require('electron');
import {scanImgs} from './util'
import sharp from 'sharp';
import p from 'path';let win;
export default function regiest(win){

    ipcMain.on('sync-choose-directory', (event, arg) => {
        console.log('main进程选择文件')
        let p = null;
        if(arg){//指定了文件夹
            p = scanImgs(arg);
        }else{
            p = dialog.showOpenDialog(win,{
    
                title:'选择图片所在文件夹',
                properties:['openDirectory']
            }).then(filepaths=>{
                //开始遍历文件夹中的图片
                return  scanImgs(filepaths.filePaths[0])
            })
        }
        p.then(imgs=>{
            let v = []
            imgs.forEach((img,index)=>{
                
                sharp(img.path) .metadata().then(stat=>{
                    console.log('push ',stat)
                    v.push({...img, format:stat.format,width:stat.width,height:stat.height});
                }).finally(_=>{
                    if(index == imgs.length - 1){
                        //获取图片信息
                        event.returnValue = JSON.stringify(v);
                    }
                })
            })
           
    
        }).catch(_=>{event.returnValue=''})
    
    
    })
    
    
}
