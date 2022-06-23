<template>
  <div class="content">
    <div class="header">
      <div class="fr choose_box">
        <span class="back_btn" @click="goBack">返回</span>
      </div>
    </div>
    <div class="main_box">
      <el-scrollbar
        wrap-class="scrollbar-wrapper"
        style="width: 100%; height: 100%"
      >
        <div class="detail_box" style="margin-bottom: 0px">
          <div
            class="detail_content"
            style="border-bottom: 1px solid #e8efeb"
          >
            <h3 class="cj_title">“多规合一“实用性村庄规划信息</h3>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            class="form"
            style="width: 100%; height: 100%"
          >
            <div class="detail_content" style="padding: 0px">
              <div class="detail_item">
                <table class="cj_table">
                  <tr style="height: 50px">
                    <td
                      class="text_left"
                      colspan="12"
                      style="padding-left: 20px"
                    >
                      <strong style="font-size: 16px">村庄规划信息采集</strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg_tr text_right">行政区划:</td>
                    <td class="text_left" colspan="7" style="padding: 5px">
                      <el-form-item prop="county" style="display: inline-block">
                        <el-select
                          v-model="form.county"
                          placeholder="请选择县（区）"
                          :disabled="jzxq"
                          style="width: 150px"
                          @change="contyChange"
                        >
                          <el-option
                            v-for="item in contyOptions"
                            :key="item.orgCode"
                            :label="item.orgName"
                            :value="item.orgCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="town" style="display: inline-block">
                        <el-select
                          v-model="form.town"
                          placeholder="请选择乡（镇）"
                          :disabled="jzxh"
                          style="width: 150px"
                          @change="contryChange"
                        >
                          <el-option
                            v-for="item in contryOptions"
                            :key="item.orgCode"
                            :label="item.orgName"
                            :value="item.orgCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="cun" style="display: inline-block">
                        <el-select
                            v-model="form.cun"
                            placeholder="请选择村"
                            :disabled="jzcun"
                            style="width: 150px"
                            @change="contryCun"
                          >
                            <el-option
                              v-for="item in villageOptions"
                              :key="item.orgCode"
                              :label="item.orgName"
                              :value="item.orgCode"
                            ></el-option>
                          </el-select>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg_tr text_right">村庄规划图片</td>
                    <td colspan="7" class="text_left">
                      <el-form-item>
                        <upload-image
                          @changeId="changeId"
                          @changeIndex="changeIndex"
                          @changefm='changefm'
                          :uploadList="imgList"
                          :index='fmIndex'
                          :year="$route.query.year"
                          :disabled="fileDisabled"
                          type="dghy01"
                          style="margin: 12px"
                        ></upload-image>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg_tr text_right">
                      规划附件
                    </td>
                    <td colspan="7" class="text_left">
                      <el-upload
                        ref="upload"
                        style="margin: 12px"
                        action=""
                        list-type="picture-card"
                        accept=".xls,.xlsx,.doc,.docx,.pdf"
                        :file-list="fileList"
                        :http-request="httpRequest"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove"
                        :disabled="fileDisabled"
                        :class="{disabled: fileDisabled}">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}" style="width:100%; height: 100%">
                          <img class="el-upload-list__item-thumbnail" src="@/assets/image/import/icon_excel.png" v-if="file.name.indexOf('.xls')>0 || file.name.indexOf('.xlss')>0">
                          <img class="el-upload-list__item-thumbnail" src="@/assets/image/import/icon_word.png" v-else-if="file.name.indexOf('.doc')>0 || file.name.indexOf('.docx')>0">
                          <img class="el-upload-list__item-thumbnail" src="@/assets/image/import/icon_pdf.png" v-else-if="file.name.indexOf('.pdf')>0">
                          <img class="el-upload-list__item-thumbnail" src="@/assets/image/import/icon_mp4.png" v-else-if="file.name.indexOf('.mp4')>0">
                          <img class="el-upload-list__item-thumbnail" :src="file.url" v-else-if="file.url.indexOf('blob')>=0">
                          <img class="el-upload-list__item-thumbnail" :src="file.url" v-else>
                          <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                              <i class="el-icon-zoom-in"></i>
                            </span>
                            <span class="el-upload-list__item-delete" @click="handleRemove(file)" v-if="!fileDisabled">
                              <i class="el-icon-delete"></i>
                            </span>
                          </span>
                        </div>
                      </el-upload>
                    </td>
                  </tr>
                </table>
                <div class="subBox">
                  <el-button type="primary" size="medium" @click="submit()" v-if="$route.query.type === 'add'">
                    <span>提交</span>
                  </el-button>
                  <el-button type="primary" size="medium" @click="edit()" v-if="$route.query.type === 'edit'">
                    <span>编辑</span>
                  </el-button>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import UploadImage from "../../components/set-cover-uploder";
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      fileDisabled: false,
      id: '',
      badge: [],
      jzxq: false,
      jzxs: false,
      jzxh: false,
      jzcun: false,
      form: {
        // cunName: '',
        azc005: "",
        city: "",
        county: "",
        town: "",
        cun: ""
      },
      rules: {
        // cunName: [{ required: true, message: "请输入村庄规划名称", trigger: "change" }],
        city: [{ required: true, message: "请选择市", trigger: "change" }],
        county: [{ required: true, message: "请选择县(区)", trigger: "change" }],
        town: [{ required: true, message: "请选择乡镇", trigger: "change" }],
        cun: [{ required: true, message: "请选择村", trigger: "change" }]
      },
      dialogVisible: false,
      dialogImageUrl: '',
      imgList: [],
      img: [],
      fileList: [],
      file: [],
      province: "江西省",
      provinceOptions: [
        {
          orgName: "江西省",
          orgCode: "360000000000"
        }
      ],
      cityOptions: [],
      contyOptions: [],
      contryOptions: [],
      villageOptions: [],
      town: '',
      village: '',
      afterFileIds: [],
      fileIdsOne: [],
      fileIdsTwo: [],
      fileIdFm: '',
      fmIndex: -1
    }
  },
  mounted(){
    if(this.$route.query.id) {
      this.id = this.$route.query.id
      // 获取行政区划和村庄名称
      this.$http.queryYbById({
        id: this.id
      }).then(res => {
        this.getAreaNamebyID(res.data.data.azc005)
        // this.form.cunName = res.data.data.name
        this.fileIdFm = res.data.data.fmId
        // 获取村庄规划图片
        this.$http.getImageList({
          serviceId: this.id,
          serviceType: 'dghy01',
          year : ''
        }).then(res =>  {
          res.data.data.map((item, index) => {
            this.imgList.push({
              name: item.fileName,
              url: item.filePath,
              id: item.fileId
            })
            this.fileIdsOne.push(item.fileId)
            if(item.fileId == this.fileIdFm){ 
              this.fmIndex = index
            }
          })
        })
        // 获取规划附件
        this.$http.getImageList({
          serviceId: this.id,
          serviceType: 'dghy02',
          year : ''
        }).then(res =>  {
          res.data.data.map(item => {
            this.fileList.push({
              name: item.fileName,
              url: item.filePath,
              fileId: item.fileId
            })
            this.fileIdsTwo.push(item.fileId)
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }else {
      this.getAreaNamebyID(this.$store.state.login.areaCode)
    }
  },
  methods: {
    //根据地区码查询地区名
    getAreaNamebyID(codeid) {
      this.$http.queryAreaLevel({ code: codeid }).then(res => {
        let data = res.data.data;
        if(data == '1'){//省
          this.provinceChange(codeid);
        }
        if(data == '2'){//市
          let provinceId = codeid.substring(0, 2) + "0000000000"; //省
          this.provinceChange(provinceId);
          this.cityChange(codeid);
          this.jzxs =true;
        }
        if(data == '3'){//区县
          let provinceId = codeid.substring(0, 2) + "0000000000"; //省
          this.provinceChange(provinceId);
          let cityId = codeid.substring(0, 4) + "00000000"; //市
          this.cityChange(cityId);
          this.contyChange(codeid)
          this.jzxs =true;
          this.jzxq = true;
        }
        if (data == '4') {
          let provinceId = codeid.substring(0, 2) + "0000000000"; //省
          this.provinceChange(provinceId);
          let cityId = codeid.substring(0, 4) + "00000000"; //市
          this.cityChange(cityId);
          let countyId = codeid.substring(0, 6) + "000000"; //区 县
          this.contyChange(countyId)
          this.contryChange(codeid)
          this.jzxs =true;
          this.jzxq = true;
          this.jzxh = true;
        }
        if(data == '5'){
          let provinceId = codeid.substring(0, 2) + "0000000000"; //省
          this.provinceChange(provinceId);
          let cityId = codeid.substring(0, 4) + "00000000"; //市
          this.cityChange(cityId);
          let countyId = codeid.substring(0, 6) + "000000"; //区 县
          this.contyChange(countyId)
          let townId = codeid.substring(0, 9) + "000"; //镇
          this.contryChange(townId)
          this.contryCun(codeid)
          this.jzxs =true;
          this.jzxq = true;
          this.jzxh = true;
          this.jzcun=true;
        }
        if(this.$route.query.type === 'edit') {
          this.badge[2] = '编辑'
          this.jzxs = true
          this.jzxq = true
          this.jzxh = true
          this.jzcun = true
        }else if(this.$route.query.type === 'view') {
          this.badge[2] = '查看'
          this.jzxs = true
          this.jzxq = true
          this.jzxh = true
          this.jzcun = true
          this.fileDisabled = true
        }
      })
    },
    //省
    provinceChange(value) {
      this.form.azc005 = value;
      this.getselect1(value);
      this.form.city = "";
      this.form.county = "";
      this.form.town = "";
      this.form.cun = "";
      if (value == "1" || value == "2") {
        this.jzxq = true;
        this.jzxs = true;
        this.jzxh = true;
      } else {
        this.jzxq = false;
        this.jzxs = false;
        this.jzxh = false;
      }
    },
    //市
    cityChange(value) {
      this.form.azc005 = value;
      this.form.city = value;
      this.contryOptions = [];
      this.getselect2(value);
      this.form.county = "";
      this.form.town = "";
      this.form.cun = "";
    },
    //区县
    contyChange(value) {
      this.form.azc005 = value;
      this.form.county = value;
      this.getselect3(value);
      this.form.town = "";
      this.form.cun = "";
    },
    //乡镇
    contryChange(value) {
      this.form.azc005 = value;
      this.form.town = value;
      this.getselect4(value);
      this.form.cun = ''
    },
    // 村
    contryCun(value) {
      this.form.cun = value;
      this.form.azc005 = value;
    },
    getselect1(code) {
      this.$http
        .getSelectCode({
          areaCode: code
        })
        .then(res => {
          this.cityOptions = res.data.data;
        })
        .catch(err => {
          console.log(err)
        });
    },
    getselect2(code) {
      this.$http
        .getSelectCode({
          areaCode: code
        })
        .then(res => {
          this.contyOptions = res.data.data;
        })
        .catch(err => {
          console.log(err)
        });
    },
    getselect3(code) {
      this.$http
        .getSelectCode({
          areaCode: code
        })
        .then(res => {
          this.contryOptions = res.data.data;
        })
        .catch(err => {
          console.log(err)
        });
    },
    getselect4(code) {
      this.$http
        .getSelectCode({
          areaCode: code
        })
        .then(res => {
          this.villageOptions = res.data.data;
        })
        .catch(err => {
          console.log(err)
        });
    },
    goBack() {
      this.$router.back()
    },
    //设置封面id
    changefm(index){
      this.fmIndex=index 
      this.fileIdFm =  this.fileIdsOne[this.fmIndex]
    },
    //获取附件上传后id
    changeId(id) {
      this.fileIdsOne.push(id)
    },
    //删除
    changeIndex(index) {
      //判断是否删除的是已选为封面的图片，为true清空已选封面图片id
      if(this.fileIdsOne[index] == this.fileIdsOne[this.fmIndex]){
        this.fileIdFm = ''
      }
      this.fileIdsOne.splice(index, 1)
      //删除后重新设置封面图标id的索引
      this.fileIdsOne.map((item, index) => {
        if (item == this.fileIdFm) {
          this.fmIndex = index
        }
      })
    },
    httpRequest(item) {
      // 新增时，上传附件拿到id
      let formData = new FormData()
      formData.append('year', new Date().getFullYear())
      formData.append('serviceId', 0)
      formData.append('serviceType', 'dghy02')
      formData.append('file', item.file)
      this.$http.zdcUpload(formData).then(res => {
        this.fileIdsTwo.push(res.data.data)
      }).catch(err => {
        console.log(err)
      })
      this.file.push(item.file)
    },
    beforeUpload(file) {
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const extension3 = testmsg === 'doc'
      const extension4 = testmsg === 'docx'
      const extension5 = testmsg === 'pdf'
      if(!extension && !extension2 && !extension3 && !extension4 && !extension5) {
          this.$message({
              message: '上传文件只能是xls、xlsx、doc、docx、pdf格式!',
              type: 'warning'
          })
      }
      return (extension || extension2 || extension3 || extension4 || extension5)
    },
    handleRemove(file) {
      let fileList = this.$refs.upload.uploadFiles
      let index = fileList.findIndex( fileItem => {return fileItem.uid === file.uid})
      fileList.splice(index, 1)
      if(file.fileId) {
        this.fileIdsTwo.splice(this.fileIdsTwo.indexOf(file.fileId), 1)
      }else {
        this.file.map((item, index) => {
          if(item.name === file.name) {
            this.file.splice(index, 1)
            this.fileIdsTwo.splice(index, 1)
          }
        })
      }
    },
    handlePictureCardPreview(file) {
      window.open(file.url)
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.fileIdsOne.length == 0) {
            this.$message({
              message: '请上传图片再提交！',
              type: 'warning'
            })
            return
          }
          if(this.fileIdFm == '') {
            this.$message({
              message: '请将一张图片设为封面再提交！',
              type: 'warning'
            })
            return
          }
          if(this.fileIdsTwo.length === 0) {
            this.$message({
              message: '请上传附件再提交！',
              type: 'warning'
            })
            return
          }
          let obj = {
            rcxmYb: {
              aar040: new Date().getFullYear(),
              azc005: this.form.azc005,
              // name: this.form.cunName,
              fmId: this.fileIdFm
            },
            fileIds: this.fileIdsOne.concat(this.fileIdsTwo)
          }
          this.$http.addMoreAndOne(obj).then(res => {
            if (res.data.data.code == '-1') {
              this.$message({
                message: res.data.data.msg,
                type: "error"
              })
            } else {
              this.$message({
                message: "提交成功",
                type: "success"
              })
              this.$router.back()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    edit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.fileIdsOne.length == 0) {
            this.$message({
              message: '请上传图片再提交！',
              type: 'warning'
            })
            return
          }
          if(this.fileIdFm == '') {
            this.$message({
              message: '请将一张图片设为封面再提交！',
              type: 'warning'
            })
            return
          }
          if(this.fileIdsTwo.length === 0) {
            this.$message({
              message: '请上传附件再提交！',
              type: 'warning'
            })
            return
          }
          this.fileIdFm = this.fileIdsOne[this.fmIndex];
          let obj = {
            rcxmYb: {
              id: this.id,
              aar040: new Date().getFullYear(),
              azc005: this.form.azc005,
              // name: this.form.cunName,
              fmId: this.fileIdFm,
              flag: 'dghy'
            },
            fileIds: this.fileIdsOne.concat(this.fileIdsTwo)
          }
          this.$http.updateYbInfoById(obj).then(res => {
            if (res.data.code !== 0) {
              this.$message({
                message: res.data.msg,
                type: "error"
              })
            } else {
              this.$message({
                message: "提交成功",
                type: "success"
              })
              this.$router.back()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.disabled /deep/ .el-upload--picture-card {
  display: none;
}
.subBox {
  padding: 10px 0px;
  text-align: center;
}
.el-table /deep/ td,
.el-table /deep/ th {
  padding: 0px;
  height: 40px !important;
  color: #424242;
  text-align: center;
}
.el-form-item {
  margin-bottom: 0px !important;
}
.form {
  width: 100%;
  .da_title {
    width: 100%;
    color: #424242;
    text-align: left;
    font-size: 16px;
    line-height: 40px;
  }
}
.content {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 49px;
    border-bottom: 1px solid #e8efeb;
    background: #fff;
    .content_badge {
      height: 100%;
      padding-left: 15px;
      .home_icon {
        float: left;
        font-size: 20px;
        margin-top: 12px;
      }
      a {
        height: 100%;
        line-height: 49px;
        font-size: 14px;
        color: #424242;
        span {
          padding: 0px 5px;
        }
        .link_active {
          color: #2ea44f;
        }
      }
    }
    .choose_box {
      margin: 8px;
      .pageBox {
        background: #fbfffd;
        border: 1px solid #d7e6e0;
        box-sizing: border-box;
        padding: 5px 0px;
        height: 36px;
        float: left;
        width: 140px;
        font-size: 14px;
        color: #424242;
        margin-right: 10px;
        overflow: hidden;
        box-shadow: inset 0 2px 3px 0 rgba(0, 0, 0, 0.04);
        border-radius: 6px;
        span {
          float: left;
          height: 100%;
          line-height: 26px;
          text-align: center;
          width: 50%;
          box-sizing: border-box;
          border-right: 1px solid #d7e6e0;
          cursor: pointer;
          &:last-child {
            border-right: none;
          }
        }
      }
      .back_btn {
        float: left;
        background: #fbfffd;
        height: 34px;
        padding: 0px 15px;
        margin-right: 15px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        cursor: pointer;
        color: #424242;
        border: 1px solid #d7e6e0;
        box-shadow: inset 0 2px 3px 0 rgba(255, 255, 255, 0.04),
          inset 0 -2px 3px 0 rgba(0, 0, 0, 0.04);
        border-radius: 6px;
      }
    }
  }
  .main_box {
    width: 100%;
    height: calc(100% - 49px);
    background: #f5f8f6;
    overflow: hidden;
    .el-scrollbar {
      box-sizing: border-box;
      .main_title {
        margin: 15px;
        box-sizing: border-box;
        height: 100px;
        background: #ffffff;
        border: 1px solid #e8efeb;
        border-radius: 4px 0 0 4px;
        overflow: hidden;
        margin-bottom: 15px;
        li {
          float: left;
          width: 25%;
          height: 100%;
          box-sizing: border-box;
          padding: 9px 0px 9px 20px;
          overflow: hidden;
          border-right: 1px solid #e8efeb;
          font-family: "Rubik-Medium";
          &:last-child {
            border-right: none;
          }
          .home_icon {
            font-size: 80px;
            margin-right: 10px;
          }
          .text_box {
            font-size: 14px;
            color: #797979;
            p {
              margin-top: 10px;
              margin-bottom: 5px;
              font-size: 12px;
              color: #797979;
              strong {
                font-size: 24px;
                color: #424242;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
    .detail_box {
      margin: 15px;
      background: #fff;
      box-sizing: border-box;
      border: 1px solid #e8efeb;
      border-radius: 4px;
      overflow: hidden;
      .detail_content {
        padding: 15px;
        background: #fff;
        .cj_title {
          width: 100%;
          // margin-bottom: 10px;
          text-align: center;
          font-size: 22px;
          color: #424242;
        }
        .add_operate {
          width: 100%;
          margin: 15px 0px;
          text-align: center;
          span {
            display: inline-block;
            padding: 0px 16px;
            border: 1px solid #dfdfdf;
            border-radius: 6px;
            margin-right: 5px;
            font-size: 28px;
            cursor: pointer;
          }
        }
        .steps_list {
          width: 100%;
          display: flex;
          display: -webkit-flex;
          display: -moz-flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          li {
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            align-items: center;
            font-family: PingFangSC-Regular;
            .text_link {
              display: flex;
              display: -webkit-flex;
              display: -moz-flex;
              align-items: center;
              font-size: 14px;
              color: #929292;
              .circle_nums {
                display: inline-block;
                width: 28px;
                height: 28px;
                box-sizing: border-box;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 50%;
                line-height: 28px;
                text-align: center;
                font-family: HelveticaNeue;
                font-size: 16px;
                color: #999999;
                margin-right: 5px;
              }
            }
            .line_border {
              display: inline-block;
              width: 30px;
              border-top: 1px solid #e9e9e9;
              margin: 0px 5px;
            }
          }
        }
      }
    }
    .collectionList {
      padding: 10px 35px;
      overflow: hidden;
      li {
        float: left;
        margin-right: 15px;
        padding: 5px 10px;
        border-radius: 3px;
        color: #797979;
        font-size: 14px;
        font-family: Source Han Sans CN;
        &:hover {
          cursor: pointer;
          background: #fff;
        }
      }
      li.collectActive {
        background: #fff;
        color: #2ea44f;
      }
    }
  }
}
.detail_item {
  padding: 20px;
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: SourceHanSansCN-Medium;
    font-size: 13px;
    color: #424242;
    letter-spacing: 0.41px;
    border: none;
    .red_color {
      color: red;
      margin-right: 5px;
    }
    .bg_tr {
      background: #f5f8f6;
      color: #424242;
    }
    tr {
      td,
      th {
        border: 1px solid #e8efeb;
        height: 36px;
        padding: 0px 5px;
        text-align: center;
      }
      .location_btn {
        display: inline-block;
        padding: 3px 6px;
        background: #61a4e4;
        color: #fff;
        margin-left: 3px;
        box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.1);
        border-radius: 3px;
      }
      td.text_left {
        text-align: left;
        padding-left: 5px;
      }
      td.text_right {
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}
/deep/.el-upload-list--picture-card .el-upload-list__item{
  width: 80px;
  height: 80px;
  line-height: 90px;
}
/deep/.el-upload--picture-card{
  width: 80px;
  height: 80px;
  line-height: 90px;
}
/deep/.el-upload-list__item-thumbnail{
  width: 100%;
  height: 100%;
}
/deep/.el-upload-list__item-actions span {
  color: #ffffff;
}
</style>
