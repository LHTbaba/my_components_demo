<template>
  <div class="multicom-page" v-loading="loading">
    <div class="page-title">
      <span>封面图片设置组件测试数据列表</span>
      <el-button class="back-button" @click="goBack">返回</el-button>
    </div>
    <div class="header-line">
      <div class="left">
        <el-date-picker
          :clearable="false"
          :editable="false"
          class="block"
          v-model="selectYear"
          value-format="yyyy"
          type="year"
          placeholder="请选择年">
        </el-date-picker>
        <el-input placeholder="请输入村名" v-model="searchName" suffix-icon="el-icon-search" class="block"></el-input>
        <el-button type="primary" size="small" @click="search">查询</el-button >
      </div>
      <div class="right">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addData">新增</el-button >
      </div>
    </div>
    <div class="content-panel" ref="contentDiv">
      <div class="block-item" v-for="(item, index) in dataList" :key="index">
        <div class="topic">
          <p class="title">{{item.xiangzhen}}-{{item.short_name}}</p>
          <div class="tag">{{item.aar040}}年</div>
        </div>
        <div class="photo" :style="{background: 'url('+item.file_path+') no-repeat center/cover'}">
          <div class="photo-mask"></div>
        </div>
        <div class="item-bottom">
          <div class="button-item edit" @click="edit(item.id)">
            <img src="../../assets/image/import/icons-edit.png">
            <p>编辑</p>
          </div>
          <div class="button-item view" @click="view(item.id)">
            <img src="../../assets/image/import/icons-eye.png">
            <p>查看</p>
          </div>
          <div class="button-item delete" @click="delet(item.id)">
            <img src="../../assets/image/import/icons-delete.png">
            <p>删除</p>
          </div>
        </div>
      </div>
      <div class="no-more" v-if="noMore">没有更多了</div>
      <div class="no-data" v-if="dataList.length === 0"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectYear: '2022',
      searchName: '',
      dataList: [],
      current: 1,
      pageSize: 10,
      total: 0,
      noMore: false,
      loading: false
    }
  },
  mounted() {
    this.$refs.contentDiv.addEventListener('scroll',this.scroll)
    this.fetchData()
  },
  activated() {
    this.fetchData()
    this.$store.commit('login/refreshCope',false)
  },
  deactivated() {
    this.$store.commit('login/refreshCope',false)
  }, 
  methods: {
    goBack() {
      this.$router.back()
    },
    search() {
      this.current = 1
      this.fetchData()
    },
    addData() {
      let query = {
        type: 'add',
        year: this.selectYear
      }
      this.$router.push({
        path: "/multiCom/edit",
        query: query
      })
    },
    edit(id) {
      let query = {
        id: id,
        type: 'edit',
        year: this.selectYear
      }
      this.$router.push({
        path: "/multiCom/edit",
        query: query
      })
    },
    view(id) {
      let query = {
        id: id,
        type: 'view',
        year: this.selectYear
      }
      this.$router.push({
        path: "/multiCom/edit",
        query: query
      })
    },
    delet(id) {
      this.$confirm("确认删除？", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning"
      }).then(() => {
        this.$http.deleteMoreAndOne({
          id: id,
        }).then((res) => {
          if (res.data.code == 0) {
            this.current = 1
            this.fetchData()
          }
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    fetchData() {
      this.loading = true
      this.$http.queryMoreAndOneList({
        name: this.searchName,
        year: this.selectYear,
        current: this.current,
        size: this.pageSize
      }).then(res => {
        this.loading = false
        this.dataList = res.data.data.records
        this.total = res.data.data.total
        this.noMore = false
      })
      .catch(err => {
        this.$message.error(err)
      })
    },
    scroll() {
      let scrollTop = this.$refs.contentDiv.scrollTop
      // 获取可视区的高度
      let windowHeight = this.$refs.contentDiv.clientHeight
      // 获取滚动条的总高度
      let scrollHeight = this.$refs.contentDiv.scrollHeight
      if (scrollTop + windowHeight >= scrollHeight) {
        // 把距离顶部的距离加上可视区域的高度 等于或者大于滚动条的总高度就是到达底部
        if(this.pageSize * this.current < this.total) {
          this.current++
          this.loadMore()
        }else {
          this.noMore = true
        }
      }
    },
    loadMore() {
      this.loading = true
      this.$http.queryMoreAndOneList({
        name: this.searchName,
        year: this.selectYear,
        current: this.current,
        size: this.pageSize
      }).then(res => {
        this.loading = false
        this.dataList = this.dataList.concat(res.data.data.records)
      })
      .catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.multicom-page {
  width: 100%;
  height: 100%;
  .page-title {
    color: #ffffff;
    background: rgb(126, 139, 211);
    font-size: 40px;
    font-weight: bold;
    line-height: 84px;
    position: relative;
    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
  .header-line {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .block {
        margin-right: 16px;
      }
    }
  }
  .content-panel {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    height: calc(100% - 156px);
    margin: 0 16px;
    overflow: auto;
    .block-item {
      position: relative;
      width: 19.2%;
      height: 50%;
      margin: 0 1% 1% 0;
      border-radius: 4px;
      background: #ffffff;
      border: 1px solid rgb(232, 239, 235);
      overflow: hidden;
      cursor: pointer;
      box-sizing: border-box;
      box-shadow: 0px 1px 4.2px rgba(0, 0, 0, 0.06);
      .topic {
        padding: 0 6%;
        height: 25.9%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          color: rgba(0, 0, 0, 1);
          font-weight: bold;
          font-size: 18px;
        }
        .tag {
          padding: 0 3.5px;
          height: 22px;
          border-radius: 2px;
          color: rgb(18, 117, 244);
          background: rgba(18, 117, 244, 0.08);
          line-height: 22px;
        }
      }
      .photo {
        width: 88%;
        height: 62.6%;
        margin: 0 6%;
        border-radius: 4px;
        .photo-mask {
          height:100%;
          width:100%;
          background: rgba(0,0,0,.08);
        }
      }
      .item-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 17.3%;
        display: flex;
        justify-content: center;
        border-top: 1px solid rgb(232, 239, 235);
        background: #ffffff;
        opacity: 0;
        transition: opacity 0.5s;
        .button-item {
          width: 33.3%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
        .edit {
          color: #2EA44F;
        }
        .view {
          color: #1275F4;
        }
        .delete {
          color: #FF5C44;
        }
      }
    }
    .block-item:hover {
      box-shadow: 0px 4px 4px 0px #f3f5f5;
      .photo-mask {
        display: none;
      }
      .item-bottom {
        opacity: 1;
        transition-duration: 0.5s;
      }
    }
    .block-item:nth-child(5n) {
      margin-right: 0;
    }
    .no-more {
      width: 100%;
      font-size: 18px;
      text-align: center;
      color: #6B7473;
      line-height: 60px;
    }
    .no-data{
      width: 100%;
      height: 100%;
      background:url(../../assets/image/common/imgs-empty.png) no-repeat center;
    }
  }
}
</style>
