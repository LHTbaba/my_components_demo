import axios from 'axios';
import router from '../router';
import store from '@/store/index';
import ElementUI from 'element-ui';
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function endLoading () {
  loading.close()
}
function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
let axios2 = axios.create();
let axios3 = axios.create();
let axios4 = axios.create();
axios.defaults.timeout = 1000000;
axios.defaults.withCredentials=true;//axios请求默认是不携带cookie的，让了让其带上cookie，需要做一些设置。
axios2.defaults.timeout = 1000000;
axios3.defaults.timeout = 1000000;
axios4.defaults.timeout = 1000000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form--urlencoded;charset-UTF-8'; 
axios3.defaults.headers.post['Content-Type'] = 'application/x-www-form--urlencoded;charset-UTF-8'; 
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? '/api' : '/end';   //配置接口地址根目录
axios2.defaults.baseURL = process.env.NODE_ENV === "development" ? '/api' : '/end';
axios3.defaults.baseURL = process.env.NODE_ENV === "development" ? '/api' : '/end';
axios4.defaults.baseURL = process.env.NODE_ENV === "development" ? '/api' : '/end';
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事 //请求之前加入token
    //console.log(config)
    // let token = store.state.login.token || ""  //获取token 
    let token =JSON.parse(localStorage.getItem('token')) || ""  //获取token  
    let refreshtoken =JSON.parse(localStorage.getItem('refreshtoken')) || "" 
    if (token != "") {
        config.headers = {
            'authorization':'Bearer '+token, //写自己后端传回来的token的命名，本项目为 authorization，
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Type': 'application/json',
            'Refresh':refreshtoken
        }
    }
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)//序列化post 参数
    }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});
// 返回状态判断(添加响应拦截器)
// 响应拦截器
axios.interceptors.response.use( 
    response => {
        // 更新token和refreshToken
        if(response.headers.token || response.headers.refreshToken) {
            localStorage.setItem('token', JSON.stringify(response.headers.token))
            localStorage.setItem('refreshtoken', JSON.stringify(response.headers.refreshToken))
        }
        hideFullScreenLoading()
        //alert(response)
        if (response.status === 200 || response.status===500) {
            if(response.data.code == 2) {
                ElementUI.Message({
                    message: '登录过期，请重新登录',
                    duration: 1000, 
                });
                // 清除token                                        
                store.commit('login/loginError');
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        //alert(error)
        hideFullScreenLoading();  
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.fullPath }
                });
                break;
                // case 500:
                //     ElementUI.Message({
                //         message: '登录过期，请重新登录',
                //         duration: 1000, 
                //     });
                //     router.replace({
                //         path: '/login',
                //         query: { redirect: router.currentRoute.fullPath }
                //     });
                // break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:
                    ElementUI.Message({
                        message: '登录过期，请重新登录',
                        duration: 1000, 
                    });
                    // 清除token                                      
                    store.commit('login/loginError');
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在                
                case 404:
                    ElementUI.Message({
                        message: '网络请求不存在',
                        duration: 1500, 
                    });
                    break;
                // 其他错误，直接抛出错误提示                
                default:
                    ElementUI.Message({
                        message: error.response.data.message,
                        duration: 1500, 
                    });
            }
            return Promise.reject(error.response);
        }
    }
);
axios2.interceptors.request.use((config) => {
    //     //在发送请求之前做某件事 //请求之前加入token
    let token =JSON.parse(localStorage.getItem('token')) || ""  //获取token  
    let refreshtoken =JSON.parse(localStorage.getItem('refreshtoken')) || "" 
    if (token != "") {
        config.headers = {
            'authorization':'Bearer '+token, //写自己后端传回来的token的命名，本项目为 authorization，
            'Content-Type': 'application/json;charset=UTF-8',
            'Refresh':refreshtoken
        }
    }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});

// 响应拦截器
axios2.interceptors.response.use(    
    response => {        
        // 更新token和refreshToken
        if(response.headers.token || response.headers.refreshToken) {
            store.commit('login/loginsuccess', response.headers.token)
            store.commit('login/setRefreshToken', response.headers.refreshToken)
        }
        if (response.status === 200 || response.status === 500) {  
            if(response.data.code == 2) {
                ElementUI.Message({
                    message: '登录过期，请重新登录',
                    duration: 1000, 
                });
                // 清除token                                    
                store.commit('login/loginError');
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
            }
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error => {    
        //console.log(error.status)    
        if (error.status) {            
            switch (error.status) {                
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:                    
                    router.replace({                        
                        path: '/login',                        
                        query: { redirect: router.currentRoute.fullPath } 
                    });
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:                     
                    ElementUI.Message({                        
                        message: '登录过期，请重新登录',                        
                        duration: 1000,                        
                        forbidClick: true                    
                    });                    
                    // 清除token                                    
                    store.commit('login/loginError');                    
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/login',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 
                // 404请求不存在                
                case 404:                    
                    ElementUI.Message({                        
                        message: '网络请求不存在',                        
                        duration: 1500,      
                    });                    
                break; 
                // case 500:
                //     ElementUI.Message({
                //         message: '登录过期，请重新登录',
                //         duration: 1000, 
                //     });
                //     router.replace({
                //         path: '/login',
                //         query: { redirect: router.currentRoute.fullPath }
                //     });
                // break;
                // 403 tok               
                // 其他错误，直接抛出错误提示                
                default:                    
                    ElementUI.Message({                        
                        message: error.response.data.message,                        
                        duration: 1500,        
                    });            
            }            
            return Promise.reject(error.response);        
        }       
    }
);
axios3.interceptors.request.use((config) => {
    //在发送请求之前做某件事 //请求之前加入token
    // showFullScreenLoading();
    //console.log(config) 
    // let token = store.state.login.token || ""  //获取token 
    let token =JSON.parse(localStorage.getItem('token')) || ""  //获取token  
    let refreshtoken =JSON.parse(localStorage.getItem('refreshtoken')) || "" 
    if (token != "") {
        config.headers = {
            'authorization':'Bearer '+token, //写自己后端传回来的token的命名，本项目为 authorization，
            'Content-Type': 'application/x-www-form-urlencoded',
            'Refresh':refreshtoken
        }
    }
    if (config.method === 'post') {
         config.data = qs.stringify(config.data)//序列化post 参数
     }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});
// 返回状态判断(添加响应拦截器)
// 响应拦截器
axios3.interceptors.response.use( 
    response => {
        // 更新token和refreshToken
        if(response.headers.token || response.headers.refreshToken) {
            store.commit('login/loginsuccess', response.headers.token)
            store.commit('login/setRefreshToken', response.headers.refreshToken)
        }
        hideFullScreenLoading()
        //alert(response)
        if (response.status === 200 || response.status === 500) { 
            if(response.data.code == 2) {
                ElementUI.Message({
                    message: '登录过期，请重新登录',
                    duration: 1000, 
                });
                // 清除token                                    
                store.commit('login/loginError');
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
            }
            var refresh=response.headers.refreshtoken;
            if(response.data.code==0){ 
                if(refresh){
                   localStorage.setItem('refreshtoken',JSON.stringify(refresh));
                   localStorage.setItem('token',JSON.stringify(response.headers.token));
                } 
            } 
            
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        //alert(error)
        hideFullScreenLoading();
        //alert(1122)
        console.log(error.response)
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:
                    ElementUI.Message({
                        message: '登录过期，请重新登录',
                        duration: 1000, 
                    });
                    // 清除token                                    
                    store.commit('login/loginError');
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在                
                case 404:
                    ElementUI.Message({
                        message: '网络请求不存在',
                        duration: 1500, 
                    });
                    break;
                // case 500:
                //     ElementUI.Message({
                //         message: '登录过期，请重新登录',
                //         duration: 1000, 
                //     });
                //     router.replace({
                //         path: '/login',
                //         query: { redirect: router.currentRoute.fullPath }
                //     });
                // break;
                        // 403 tok    
                // 其他错误，直接抛出错误提示                
                default:
                    ElementUI.Message({
                        message: error.response.data.message,
                        duration: 1500, 
                    });
            }
            return Promise.reject(error.response);
        }
    }
);
axios4.interceptors.request.use((config) => {
    //在发送请求之前做某件事 //请求之前加入token
    // let token = store.state.login.token || ""  //获取token 
    let token =JSON.parse(localStorage.getItem('token')) || ""  //获取token  
    let refreshtoken =JSON.parse(localStorage.getItem('refreshtoken')) || "" 
    if (token != "") {
        config.headers = {
            'authorization':'Bearer '+token, //写自己后端传回来的token的命名，本项目为 authorization，
            'Content-Type': 'multipart/form-data',
            'Refresh':refreshtoken
        }
    }
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data)//序列化post 参数
    // }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});
// 返回状态判断(添加响应拦截器)
// 响应拦截器
axios4.interceptors.response.use( 
    response => {
        // 更新token和refreshToken
        if(response.headers.token || response.headers.refreshToken) {
            store.commit('login/loginsuccess', response.headers.token)
            store.commit('login/setRefreshToken', response.headers.refreshToken)
        }
        hideFullScreenLoading()
        //alert(response)
        if (response.status === 200) {
            if(response.data.code == 2) {
                ElementUI.Message({
                    message: '登录过期，请重新登录',
                    duration: 1000, 
                });
                // 清除token                                    
                store.commit('login/loginError');
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
            }
            var refresh=response.headers.refreshtoken;
            if(response.data.code==0){ 
                if(refresh){
                   localStorage.setItem('refreshtoken',JSON.stringify(refresh));
                   localStorage.setItem('token',JSON.stringify(response.headers.token));
                } 
            } 
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        //alert(error)
        hideFullScreenLoading(); 
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:
                    ElementUI.Message({
                        message: '登录过期，请重新登录',
                        duration: 1000, 
                    });
                    // 清除token                                    
                    store.commit('login/loginError');
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在                
                case 404:
                    ElementUI.Message({
                        message: '网络请求不存在',
                        duration: 1500, 
                    });
                    break;
                // 其他错误，直接抛出错误提示                
                default:
                    // ElementUI.Message({
                    //     message: error.response.data.message,
                    //     duration: 1500, 
                    // });
            }
            return Promise.reject(error.response);
        }
    }
);
//返回一个Promise(发送请求头为application/json的post请求)
function jsonpost(url, params) {
    return new Promise((resolve, reject) => {
        axios2.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function jsonget(url, params) {
    return new Promise((resolve, reject) => {
        axios2.get(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}


function jsondelete(url, params) {
    return new Promise((resolve, reject) => {
        axios2.delete(url, { data: params })
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}


//返回一个Promise(发送post请求)
function post(url, params) {
    return new Promise((resolve, reject) => {
        axios3.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
} 
//返回一个Promise(发送put请求)
function put(url, params) {
    return new Promise((resolve, reject) => {
        axios3.put(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
} 
 
//返回一个Promise(发送get请求)
function get(url, param) {
    return new Promise((resolve, reject) => {
        axios3.get(url, { params: param })
            .then(response => { resolve(response) }, err => { reject(err) })
            .catch((error) => { reject(error) })
    })
}
function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios3.delete(url + [params])
            .then(response => { resolve(response) }, err => { reject(err) })
            .catch(err => {
                reject(err)
            })
    });
}

function getQrCode(url, params) {
    return new Promise((resolve, reject) => {
        axios3.request(
            {
              url:url,
              data:params,
              responseType: 'blob',
              method: 'post'
            }).then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
function download(url, params) {
    return new Promise((resolve, reject) => {
        axios2.post(url, params, { responseType: 'blob' })
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
function upload(url, params) {
    return new Promise((resolve, reject) => {
        axios4.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function jsonput(url,params){
    return new Promise((resolve,reject)=>{
        axios2.put(url,params)
        .then(response=>{
            resolve(response);
        }, err=>{
            reject(err);
        }).catch((error)=>{
            reject(error)
        })
    })
}

function exportExl(url,params){
    return new Promise((resolve, reject) => {
        axios.post(url, params, {responseType: 'blob'})
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    get,
    post,
    put,
    deletefn,
    jsonpost,
    jsonget,
    jsondelete,
    download,
    getQrCode,
    upload,
    jsonput,
    exportExl
}