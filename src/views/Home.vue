<template>
  <div class="home">
    <i class="el-icon-folder-opened" @click="chooseFile"></i>
    <div class="" @click="chooseFile">选择图片所在文件夹</div>

  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  methods:{
    chooseFile(){
      console.log('选择文件')
      this.$ipc.chooseFile().then(imgs=>{
        this.$store.commit('setImgs',imgs);

        // 开始读取图片信息
        this.$router.push({name:'Images'})


      })
    }
  }
}
</script>

<style lang="less">
.home {

  .el-icon-folder-opened{
    font-size: 120px;
  }


}


</style>