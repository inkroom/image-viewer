<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Images">Images</router-link> | 
      <el-link @click="$store.commit('setTheme','style1')">主题1</el-link> | 
      <el-link @click="$store.commit('setTheme','style2')">主题2</el-link> | 
      <el-link @click="$store.commit('setTheme','style3')">主题3</el-link> | 
    </div>
    <router-view/>
  </div>
</template>

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

  margin-top:-82px;
  padding-top:82px;
  box-sizing: border-box;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
