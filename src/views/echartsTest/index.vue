<template>
  <div class="charts-panel">
    <div id="chart01"></div>
  </div>
</template>

<script>

import jiangxi from '../../assets/js/jiangxi.json'
export default {
  data() {
    return {
      option: {
        geo: [{
          map: 'JS',
          zlevel: 5,
          label: {
            show: true,
            color: '#eee'
          },
          itemStyle: {
            color: '#2075B8', // 背景
            borderWidth: '1', // 边框宽度
            borderColor: '#fff' // 边框颜色
          }
        }, {
          map: 'JS',
          top: '11%',
          zlevel: 4,
          itemStyle: {
            color: '#3C5FA1', // 背景
            borderWidth: '1', // 边框宽度
            borderColor: '#3C5FA1' // 边框颜色
          }
        }, {
          map: 'JS',
          top: '12%',
          zlevel: 3,
          itemStyle: {
            color: '#163F6C', // 背景
            borderWidth: '1', // 边框宽度
            borderColor: '#163F6C' // 边框颜色
          }
        }, {
          map: 'JS',
          top: '13%',
          zlevel: 2,
          itemStyle: {
            color: '#31A0E6', // 背景
            borderWidth: '1', // 边框宽度
            borderColor: '#31A0E6', // 边框颜色
            shadowColor: '#fff',  // 外部阴影 
            shadowBlur: '10'
          }
        }]
      }
    }
  },
  mounted() {
    let chart = this.$echarts.init(document.getElementById('chart01')) // 初始化echarts
    this.$echarts.registerMap('JS',jiangxi) // 注册地图
    chart.setOption(this.option)
    chart.getZr().on('click', function (params) {
      console.log(params)
    })
    //浏览器窗口缩小放大时，图表自适应
    window.addEventListener('resize', function() {chart.resize()})
  }
}
</script>

<style lang="scss" scoped>
.charts-panel {
  width: 100%;
  height: 100%;
  #chart01{
    width: 100%;
    height: 100%;
  }
}
</style>
