<template>
  <div class="rc-uploadfile-content">
    <el-upload
      v-loading="loading"
      element-loading-text="图片上传中..."
      :class="{imgHide: disabled}"
      action=""
      list-type="picture-card"
      :accept="'image/*'"
      :before-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :multiple="true"
      :limit="9"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :disabled="disabled"
    >
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }" style="position: relative; display: flex; width: 80px; height: 80px;">
        <img class="el-upload-list__item-thumbnail" :src="file.url" style="width: 100%; height: 80px"/>
        <i class="el-icon-success exhibition_pictures1" v-if="fileList[chooseIndex] ? fileList[chooseIndex].id == file.id : ''"></i> 
        <el-radio
          style="font-size: 12px; color: #fff"
          class="exhibition_pictures"
          :class="{ active: kong == file.id }"
          v-model="kong"
          @change="choosefm(file)"
          :label="file.id"
          v-if="!disabled"
        >选为封面</el-radio>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in" @click="handlePictureCardPreview(file)"></i>
          </span>
          <span class="el-upload-list__item-delete" v-if="!disabled">
            <i class="el-icon-delete" @click="handleRemove(file)"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-image-viewer
      :on-close="closeViewer"
      v-if="dialogVisible"
      :url-list="newFilesUrl"
      :hide-on-click-modal="true"
      :initial-index="initialIndex"
    ></el-image-viewer>
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: {
    ElImageViewer
  },
  data() {
    return {
      loading: false,
      years: "",
      types: "",
      kong: "",
      chooseIndex: 0,
      dialogVisible: "",
      newFilesUrl: [],
      fileList: [],
      initialIndex: 0
    }
  },
  props: {
    uploadList: {
      type: Array,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ""
    },
    year: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    uploadList: {
      deep: true,
      handler: function () {
        this.fileList = []
        this.fileList = this.uploadList
        //解决父传值到子组件出现{__ob__: Observer}格式
        // this.fileLength = value
      }
    },
    type: {
      deep: true,
      handler: function () {
        this.types = this.type
      }
    },
    index: {
      deep: true,
      handler: function () {
        this.fileList = this.uploadList
        this.chooseIndex = this.index
        this.kong = this.fileList[this.chooseIndex].id
      }
    }
  },
  mounted() {
    this.years = this.year ? this.year : new Date().getFullYear()
    this.types = this.type
    this.fileList = this.uploadList
    this.chooseIndex = this.index
    if (this.fileList.length) {
      this.fileList.forEach((item) => {
        this.newFilesUrl.push(item.url)
      })
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogVisible = true
      //获取当前点击图片索引
      if (this.fileList.length) {
        this.fileList.forEach((item, index) => {
          this.newFilesUrl.push(item.url)
          if(item.uid == file.uid) {
            this.initialIndex = index
          }
        })
      }
    },
    handleExceed() {
      this.$message.error('最多上传9张图片')
    },
    closeViewer() {
      this.dialogVisible = !this.dialogVisible
    },
    handleChange(file, fileList) {
      fileList.pop()
      this.loading = true
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        let image = new Image() //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result
        image.onload = () => {
          let canvas = document.createElement("canvas"), context = canvas.getContext("2d")
          var ratio = this.getPixelRatio(context) // 关键代码
          canvas.width = image.width * ratio // 画布宽度
          canvas.height = image.height * ratio // 画布高度
          var dataUrl = ""
          context.drawImage(image, 0, 0, canvas.width, canvas.height)
          dataUrl = canvas.toDataURL("image/jpeg")
          var files = this.baseFile(dataUrl, file.name)
          let form = new FormData()
          form.append("file", files)
          form.append("serviceId", 0)
          form.append("serviceType", this.types)
          form.append("year", this.years)
          this.$http.zdcUpload(form).then((res) => {
            this.loading = false
            if (res.data.code == 0) {
              var obj = {
                name: file.name,
                url: file.url,
                id: res.data.data,
                status: "success"
              }
              this.fileList.push(obj)
              this.$emit("changeId", res.data.data)
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch(() => {
            this.loading = false
            this.$message.error('图片上传失败')
          })
        }
      }
    },
    getPixelRatio(context) {
      var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore
    },
    baseFile(dataUrl, filename) {
      var arr = dataUrl.split(",")
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length;
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    choosefm(file) {
      this.fileList.forEach((item, index) => {
        if(item.id == file.id) {
          this.kong = item.id
          this.chooseIndex = index
          this.$emit("changefm", index)
        }
      })
    },
    handleRemove(file) {
      this.$confirm("确认删除？", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      }).then(() => {
        if (file.status == "success") {
          // let index = this.fileLength( fileItem => {return fileItem.uid === file.uid})
          // this.fileLength.splice(index, 1)
          // this.imgId.splice(index, 1)
          this.fileList.forEach((item, index) => {
            if (item.id == file.id) {
              //this.fileList.splice(index, 1)
              this.uploadList.splice(index, 1)
              this.newFilesUrl.splice(index, 1)
              this.$emit("changeIndex", index)
            }
          })
        } else {
          //删除预览数组中当前项
          //let fileList = this.$refs.upload.uploadFiles
          //let index = fileList.findIndex( fileItem => {return fileItem.uid === file.uid})
          //this.$emit("changeIndex", index)
        }
      }) 
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-radio__input.is-checked + .el-radio__label {
  font-size: 12px;
}
/deep/ .el-upload-list__item.is-success .el-upload-list__item-status-label {
  display: none !important;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-actions span + span {
  margin: 0px;
}
/deep/ .el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 90px;
}
/deep/ .el-radio__label {
  font-size: 12px !important;
}
.exhibition_pictures1 {
  position: absolute;
  height: 20px;
  display: flex;
  align-items: center;
  right: 5px;
  top: 0px;
  font-size: 12px;
  z-index: 1000;
  color: #409EFF;
}
.exhibition_pictures {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  text-align: center;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
}
.exhibition_pictures.active{
  opacity: 1;
}
.rc-uploadfile-content /deep/ .el-upload-list__item:hover .exhibition_pictures {
  opacity: 1;
}
.rc-uploadfile-content /deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 80px;
  line-height: 90px;
}
.rc-uploadfile-content /deep/ .el-upload--picture-card {
  width: 80px;
  height: 80px;
}
.rc-uploadfile-content /deep/ .el-radio__label{
  font-size: 12px;
  padding-left: 5px;
}
/deep/ .imgHide .el-upload{
  display: none !important; 
}
.rc-uploadfile-content /deep/ .el-loading-spinner{
  top: 0;
}
</style>
