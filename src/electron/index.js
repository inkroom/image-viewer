const { ipcMain,dialog } = require('electron');
import {scanImgs} from './util'
import sharp from 'sharp';
import p from 'path';
let win;
export default function regiest(win){

    ipcMain.on('sync-choose-directory', (event, arg) => {
        console.log('main进程选择文件')
        
        dialog.showOpenDialog(win,{
    
            title:'选择图片所在文件夹',
            properties:['openDirectory']
        }).then(filepaths=>{
            //开始遍历文件夹中的图片
            return  scanImgs(filepaths.filePaths[0])
        }).then(imgs=>{
            let v = []
            imgs.forEach((img,index)=>{
                
                sharp(img.path) .metadata().then(stat=>{
                    console.log('push ',stat)
                    v.push({name:p.basename(img.path), path:img.path,format:stat.format,width:stat.width,height:stat.height,size:img.size,time:img.time});
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
