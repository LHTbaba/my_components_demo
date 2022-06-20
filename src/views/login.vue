<template>
  <div class="wrap">
    <div class="container">
      <header class="header">
        <div class="headline"></div>
        <div class="logo_div">
          <img src="../../src/assets/image/logo.jpg">
          <h1>组件测试项目</h1>
        </div>
      </header>
      <div class="main">
        <div class="login_content">
          <div class="login_box">
            <el-form ref="form" :model="form" :rules="rules">
              <h3>用户登录</h3>
              <el-form-item prop="username">
                <el-input
                  v-model="form.username"
                  placeholder="请输入用户名"
                  name="username"
                  type="text"
                  autocomplete="off"
                  @keyup.enter.native="onSubmit()"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  placeholder="请输入密码"
                  name="password"
                  type="password"
                  autocomplete="off"
                  @keyup.enter.native="onSubmit()"
                ></el-input>
              </el-form-item>
              <div class="yz_box" style="width:100%;height:48px;display:flex;margin-bottom:20px">
                <el-form-item style="flex:1" prop="qrcode">
                  <el-input
                    v-model="form.qrcode"
                    placeholder="请输入验证码"
                    name="qrcode"
                    type="text"
                    autocomplete="off"
                    @keyup.enter.native="onSubmit()"
                  ></el-input>
                </el-form-item>
                <img
                  :src="qrcodeImage"
                  title="看不清，点击换一张"
                  class="qrcode_icon"
                  @click="changeCode()"
                  alt
                />
              </div>

              <el-form-item style="margin: 0px;border:0px;" class="sub_form">
                <el-button type="primary" class="subBox" @click="onSubmit()">登录</el-button>
              </el-form-item>
              <div class="check_box">
                <el-checkbox v-model="form.checkbox">记住密码</el-checkbox>
              </div>
            </el-form>
            <div class="login_qrcode"></div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="copyright_bot">
          2020 - {{thisYear}} 李航涛
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex"
import md5 from "js-md5"
var getMd5 = function(pwd) {
  pwd = md5(pwd)
  return pwd
};
const pasArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9']
export default {
  name: "login",
  components: {},
  data() {
    return {
      showClose: false,
      dialogVisible: false,
      infoContent: '',
      form: {
        username: "",
        password: "",
        qrcode: "",
        checked: true
      },
      qrcodeImage: "",
      seeBool: true,
      rules: {
        username: {
          required: true,
          message: "用户名不能为空",
          trigger: ["change", "blur"]
        },
        password: {
          required: true,
          message: "密码不能为空",
          trigger: ["change", "blur"]
        },
        qrcode: {
          required: true,
          message: "验证码不能为空",
          trigger: ["change", "blur"]
        }
      },
      randomCode: ''
    };
  },
  mounted() {
    this.getCode()
    var codeArr=[]
    var _this=this
    document.onkeydown = function(ev) {
      var event = ev || event;  
      if(event.keyCode == 17&&!codeArr.includes(17)){
        codeArr.push(event.keyCode)
      }
      if(event.keyCode == 13&&!codeArr.includes(13)){
        codeArr.push(event.keyCode)
      }
      if(event.keyCode == 16&&!codeArr.includes(16)){
        codeArr.push(event.keyCode)
      }
      if(codeArr.includes(17)&&codeArr.includes(13)&&codeArr.includes(16)){ 
        _this.dialogVisible = false
      }
    };
    document.onkeyup = function(ev) {
      var event = ev || event;
      codeArr.forEach((item,index)=>{
        if(item==event.keyCode){
          codeArr.splice(index,1)
        }
      })
    };

    // 退出登录后清空浏览器缓存在sessionStorage,localStorage的数据
    const Ssession = window.sessionStorage;
    const Lstorage = window.localStorage;
    Ssession.clear();
    Lstorage.clear();
  },
  methods: {
    ...mapMutations({
      loginsuccess: "login/loginSuccess",
      loginError: "login/loginError",
      setRefreshToken: "login/setRefreshToken",
      setUserName: "login/setUserName",
      setLoginName: "login/setLoginName",
      setAreaName: "login/setAreaName",
      setPwd: "login/setPwd",
      setCardNO: "login/setCardNO",
      setDeptId: "login/setDeptId",
      setMail: "login/setMail",
      setOrganizationId: "login/setOrganizationId",
      setPhone: "login/setPhone",
      setUserId: "login/setUserId",
      setOrgId: "login/setOrgId",
      setAreaCode: "login/setAreaCode",
      getRoles:"login/getRoles"
    }),
    // 生成随机码
    getRandomPassword (pasLen) {
      var password = ''
      var pasArrLen = pasArr.length
      for (var i=0; i<pasLen; i++) {
        var x = Math.floor(Math.random()*pasArrLen)
        password += pasArr[x]
      }
      return password
    },
    closeDialog(){
      this.dialogVisible = false
    },
    readFinish() {
      this.dialogVisible = false
    },
    onSubmit() {
      var _this=this;
      this.$refs["form"].validate(async valid => {
        if (valid) {
          //登录
          this.$axios({
            method: "post",
            url: "/code/login",
            data: {
              random: this.randomCode,
              code: this.form.qrcode,
              loginType: 0,
              account: this.form.username,
              password: getMd5(this.form.password)
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: 'success',
                duration: 3000
              })
              this.loginsuccess(res.data.data.token)
              this.setRefreshToken(res.data.data.refreshToken)
              this.setUserName(res.data.data.userName)
              this.setLoginName(res.data.data.loginName)
              this.setAreaName(res.data.data.areaName)
              this.setPwd(res.data.data.pwd)
              this.setDeptId(res.data.data.deptId)
              this.setOrganizationId(res.data.data.organizationId)
              this.setUserId(res.data.data.userId)
              this.setOrgId(res.data.data.orgId)
              this.setAreaCode(res.data.data.areaCode)
              this.getRoles(res.data.data.authorities)
              this.setMail(res.data.data.mail);
              _this.$store.commit('login/getparentId', '200')
              this.$router.push("/index")
            } else {
              this.loginError()
              this.getCode()
            }
          }).catch(err => {
            console.log(err)
            this.getCode()
          })
        } else {
          return false
        }
      })
    },
    changeCode() {
      this.getCode()
    },
    //获取code
    getCode() {
      this.randomCode = this.getRandomPassword(12)
      var that = this
      this.$axios({
        url: "/auth/code",
        responseType: "blob",
        data: {
          random: this.randomCode
        },
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        let blob = new Blob([res.data], {
          type: "image/png"
        })
        let url = window.URL.createObjectURL(blob)
        that.qrcodeImage = url
      }).catch(err => {
        console.log(err)
      })
    },
    //获取随机数
    getrandom() {},
    toVersion() {
      this.$router.push('/version/record')
    }
  },
  computed: {
    // 计算属性的 getter
    thisYear: function () {
      const nowDate = new Date()
      return nowDate.getFullYear()
    }
  }
}
</script>
<style  lang='scss' scoped>
.wrap {
  width: 100vw;
  height: 100vh;
}
.container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  background: url('../../src/assets/image/login_back.png') center/cover;
  .top_icon {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 45px;
    height: 45px;
    i {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    i.qrcode_icon {
      cursor: pointer;
    }
    i.computer_icon {
      cursor: pointer;
    }
  }

  .header {
    height: 84px;
    line-height: 84px;
    background: rgb(126, 139, 211);
    position: relative;
    .headline {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 100%;
    }
    .header-pic {
      width: 30vw;
      height: 7vh;
    }
    .logo_icon {
      position: absolute;
      left: 15px;
      top: 0;
      width: 50px;
      height: 50px;
      bottom: 0;
      margin: auto;
    }
    .logo {
      position: absolute;
      left: 70px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .logo_div{
      display: flex;
      align-items: center;
      padding-left: 150px;
      img{
        display: inline-block;
        width: 52px;
        height: 52px;
        border-radius: 15px;
      }
      h1{
        padding-left: 20px;
        color: #ffffff;
        font-size: 26px;
      }
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 250px);
    padding: 0px;
    overflow: hidden;
    position: relative;
    .carousel {
      width: 100%;
      height: 100%;
      padding: 0;
      .el-carousel__container {
        width: 100%;
        padding: 0px;
        height: 100%;
        img {
          width: 100%;
          height: auto;
        }
      }
    }

    .login_content {
      height: 100%;
      z-index: 99;
      position: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      .login_box {
        padding-bottom: 20px;
        border-radius: 8px;
        border-radius: 10px;
        overflow: hidden;
        bottom: 0;
        background: rgba(126, 139, 211, 0.6);
        .el-form {
          height: 100%;
          padding: 0px 40px;
          position: relative;
          h3 {
            font-size: 20px;
            color: #fff;
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
          }
          /deep/ .el-form-item__content {
            width: 100%;
            display: flex;
            align-items: center;
            .subBox {
              width: 100%;
              line-height: 30px;
              font-size: 20px;
            }
            i {
              position: absolute;
              display: inline-block;
              width: 20px;
              height: 22px;
              left: 12px;
              top: 13px;
              z-index: 9999;
            }
            box-sizing: border-box;

            .el-input__inner {
              flex: 1;
              height: 38px;
              margin: 0px;
              border: 0px;
              padding-left: 10px;
              color: #ffffff;
              background: rgba(0, 0, 0, 0.2);
            }
          }
          .qrcode_icon {
            width: 90px;
            height: 40px;
            margin-left: 10px;
            border-radius: 3px;
          }
        }
      }
    }
  }
  .check_box {
    margin-top: 20px;
    /deep/ .el-checkbox {
      color: #fdf7f7;
    }
  }
  .footer {
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0;
    .copyright_bot {
      font-size: 18px;
      color: #e7dddd;
    }
  }
  // @media screen and (max-width: 1440px) {}
}
/deep/ input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
  -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
}
</style>