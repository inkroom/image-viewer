<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">选择文件夹</router-link> |
      <router-link to="/Images">浏览</router-link> | 
      <el-link @click="$store.commit('setTheme','style1')">主题1</el-link> | 
      <el-link @click="$store.commit('setTheme','style2')">主题2</el-link> | 
      <el-link @click="$store.commit('setTheme','style3')">主题3</el-link> | 
      <el-link @click="sortByTime">按时间排序</el-link> | 
      <el-link @click="sortByName">按名称排序</el-link> | 
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      desc:true,//降序排列
    }
  },
  methods:{
    sortByTime(){
      this.desc = !this.desc;
     let d = this.$store.state.imgs.filter(x=>x);
      d.sort((x1,x2)=>{
        let r = (x1.time - x2.time);
        if(this.desc) r *= -1;
        return r;
      })

      this.$store.commit('setImgs',d)
    },
    sortByName(){
      this.desc = !this.desc;
      let d = this.$store.state.imgs.map(x=>x.name);
      d.sort();
      if(this.desc) {
        console.log('重新逆序')
        d.reverse();
        }
      //按name去重新获取数据
      let org = [];

      d.map(x=>{
        org.push(this.$store.state.imgs.find(i=>i.name ===x))
      })
      this.$store.commit('setImgs',org);


    }
  }
}
</script>

<style lang="less">
html,body{
  margin:0;
  padding:0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100%;

  margin-top:-83px;
  padding-top:82px;
  box-sizing: border-box;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #8599ad;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
