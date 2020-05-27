<template>
  <div class="images">
    
    <!-- 显示的图片 -->
    <div class="preview">
      <div class="img">
        <img :src="'file://'+$store.state.imgs[selectIndex].path"/>
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
        <div class="content">
          <div :class="['item',selectIndex == index ?'selected':'']" v-for="(item,index) in $store.state.imgs" :key="index" @click="selectIndex = index">
              <ul >
                <li class="name">
                  <div class="img"><img :src="'file://'+item.path" alt="" class="thumb"></div>
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

import '@/styles/images/style2.less'

export default {
  data(){
    return {
      selectIndex:0,
    }
    
  },
  created(){
    console.log('vuex的数据=',this.$store.state.imgs)
  },

  methods:{

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