import axios from 'axios'
import {Loading,Message} from 'element-ui'
import router from './router/index'

let loading;
function startLoading(){
  loading = Loading.service({
    lock: true,
    text: '拼命加载中',
    background: 'rgba(0,0,0,0.7)'
  });
}
function endLoading(){
  loading.close();
}

//请求拦截
axios.interceptors.request.use(
  config => {
  startLoading();
  if(localStorage.Token){
    //设置统一的请求头
    config.headers.Authorization = localStorage.Token;
  }
  return config;
},error =>{
  return Promise.reject(error);
});
//响应拦截
axios.interceptors.response.use(response =>{
  //结束加载动画
  endLoading();
  return response;
},error =>{
  endLoading();
  Message.error(error.response.data);
  //获取错误状态码
  const { status } = error.response;
  if(status == 401){
    Message.error("Token失效，请重新登录!");
    //清除token
    localStorage.removeItem('Token');
    //跳转至登录界面
    router.push('/login');
  }
  return Promise.reject(error);
})
export default axios;