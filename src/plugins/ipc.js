
import  { ipcRenderer } from 'electron'


export default {
    chooseFile(){
       let imgs =  ipcRenderer.sendSync('sync-choose-directory')
       console.log(`选择的文件夹=${imgs}`)
       return Promise.resolve(JSON.parse(imgs));
    }
}

