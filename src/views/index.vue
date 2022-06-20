<template>
  <div class="index-page">
    <div class="title">{{name}}</div>
    <el-carousel :interval="2000" type="card" height="300px">
      <el-carousel-item v-for="(item, index) in picList" :key="index">
        <img class="banner-item" :src="item.url">
      </el-carousel-item>
    </el-carousel>
    <div class="enter-panel">
      <div class="enter-item" :style="{background: item.background}" v-for="(item, index) in testEnter" :key="index" @click="navigeteTo(item)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '首页',
      picList: [{
        url: require("@/assets/image/banner_01.png")
      }, {
        url: require("@/assets/image/banner_02.jpg")
      }, {
        url: require("@/assets/image/banner_03.png")
      }, {
        url: require("@/assets/image/banner_04.jpg")
      }, {
        url: require("@/assets/image/banner_05.jpg")
      }, {
        url: require("@/assets/image/banner_06.jpeg")
      }, {
        url: require("@/assets/image/banner_07.png")
      }],
      testEnter: [{
        url: '/multiCom',
        name: '封面图片设置组件测试',
        background: 'rgb(25, 199, 54)'
      }, {
        url: '/',
        name: '组件测试',
        background: 'rgb(235, 43, 10)'
      }, {
        url: '/',
        name: '组件测试',
        background: 'rgb(11, 44, 233)'
      }]
    }
  },
  mounted() {
  },
  methods: {
    navigeteTo(item) {
      this.$router.push(item.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  width: 100%;
  height: 100%;
  .title {
    color: #ffffff;
    background: rgb(126, 139, 211);
    font-size: 40px;
    font-weight: bold;
    line-height: 84px;
  }
  .banner-item {
    height: 300px;
  }
  .enter-panel {
    padding: 0 50px;
    display: flex;
    flex-wrap: wrap;
    .enter-item {
      width: 40%;
      height: 100px;
      margin: 20px 5% 20px 5%;
      color: #ffffff;
      border-radius: 20px;
      font-size: 40px;
      line-height: 100px;
      cursor: pointer;
    }
    .enter-item:hover {
      opacity: 0.8;
    }
  }
}
</style>
