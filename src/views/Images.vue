<template>
  <div :class="['images',$store.state.theme]">
    
    <!-- 显示的图片 -->
    <div class="preview">
      <div class="img">
        <el-image  :src="'file://'+$store.state.imgs[selectIndex].path" lazy fit="scale-down">
          <div slot="placeholder" class="loading">
            加载中<i class="el-icon-loading"></i>
          </div>
        </el-image>
      </div>
      <div class="info">
       {{$store.state.imgs[selectIndex].name}} ({{$store.state.imgs[selectIndex].width}} x {{$store.state.imgs[selectIndex].height}}) {{humanSize($store.state.imgs[selectIndex].size)}}
      </div>
    </div>
    <!-- 图片集合 -->
    <div class="list">
      <div class="header">
        <span>名称</span>
        <span>宽度</span>
        <span>高度</span>
        <span>大小</span>
        <span>创建时间</span>
      </div>

      <el-scrollbar style="height:100%">
        <div class="content" ref="content">
          <div :class="['item',selectIndex == index ?'selected':'']" v-for="(item,index) in $store.state.imgs" :key="index" @click="selectIndex = index" ref="item">
              <ul >
                <li class="name">
                  <div class="img">
                    <el-image  :src="'file://'+item.path" class="thumb" lazy fit="scale-down" scroll-container=".el-scrollbar__wrap">
                      <div slot="placeholder" class="loading">
                        <i class="el-icon-loading"></i>
                      </div>
                    </el-image>
                    </div>
                  <span class="name-text">{{ item.name }}</span>
                </li>
                <li class="width">{{ item.width }}</li>
                <li class="height">{{ item.height }}</li>
                <li class="size">{{ humanSize(item.size) }}</li>
                <li class="time">{{ item.time }}</li>
              </ul>
            </div>
        </div>
      </el-scrollbar>
     
    </div>

  </div>
</template>

<script>

//import '@/styles/images/style3.less'

export default {
  data(){
    return {
      selectIndex:0,
    }
    
  },
  created(){
    console.log('vuex的数据=',this.$store.state.imgs);
    let p = this.$store.state.theme;
    require('@/styles/images/'+p+'.less');


   
  },

  mounted(){
    //key

    document.onkeydown = this.keydown;
  },

  destroyed(){
    document.onkeydown = null;
  },

  watch:{
    "$store.state.theme"(nv){
      let p = nv;
      require('@/styles/images/'+p+'.less')
    }
  },

  methods:{

    keydown(event){

      let t;

          //计算每行最多多少个元素
      let contentWidth =this.$refs.content.offsetWidth;
      let itemWidth = this.$refs.item[this.selectIndex].offsetWidth;

      let colCount = Math.floor (contentWidth / itemWidth);//向下取整

      let rowCount = Math.ceil(this.$store.state.imgs.length / colCount) ;// 向上取整

      console.log(`每行${colCount} 共 ${rowCount} 行，共计${colCount * rowCount},${this.$store.state.imgs.length}` )

      //获取当前元素所在行、列，起始0
      let row = Math.ceil ((this.selectIndex + 1) / colCount ) - 1;
      let col = this.selectIndex - row * colCount 

      let index;
      switch(event.keyCode){
        case 38:// 方向键向上

          if(this.$store.state.theme==='style1'){
            this.selectIndex = (this.selectIndex + this.$store.state.imgs.length - 1) % this.$store.state.imgs.length;
            break;
          }

          t = row;
          //向上则，列不变，行-1
          row = ( row + rowCount - 1) % rowCount;

          console.log(`当前坐标(${t},${col}；新坐标(${row},${col} )`)

          //根据新的行列坐标，计算出新的数组下标
          index = ( row * colCount ) + col ;
          //最后一行可能不够数量，
          this.selectIndex = Math.min(index,this.$store.state.imgs.length - 1);
          break;
        case 40://向下
          if(this.$store.state.theme === 'style1'){
            this.selectIndex = ( this.selectIndex + 1 ) % this.$store.state.imgs.length;
            break;
          }

          //列不变，行+1
          row = ( row + 1) % rowCount;
          index = ( row * colCount ) + col ;
          this.selectIndex = Math.min(index,this.$store.state.imgs.length - 1);


          break;
        case 37://left
          //行不变，列-1
          t = col;
          col = ( col + colCount - 1) % colCount;
          index = ( row * colCount ) + col ;
          this.selectIndex = Math.min(index,this.$store.state.imgs.length - 1);

          console.log(`当前坐标(${row},${t}；新坐标(${row},${col} )`)


          break;
        case 39:// right
          t = col;
          //行不变，列+1
          col = ( col + 1) % colCount;
          index = ( row * colCount ) + col ;
          this.selectIndex = Math.min(index,this.$store.state.imgs.length - 1);

          console.log(`当前坐标(${row},${t}；新坐标(${row},${col} )`)

          break;
      }
    },

    humanSize(size){
      if (size < 1024) return size +' B';
      if(size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
       return (size / 1024 / 1024).toFixed(2) + ' MB';
    },
    humanTime(time){
      return time;
    }
  }
}
</script>

<style lang="less" >
.images{

  .loading{
    height: 100%;
    .el-icon-loading{
      font-size: 33px;
      margin-top: 70%;
    }
  }

  
  ul{
    padding: 0;
    margin: 0;
    li{
      list-style-type: none;
    }
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
}
</style>