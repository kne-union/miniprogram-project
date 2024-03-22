import React from "react";
import axios from 'axios';
import {preset as fetchPreset} from '@kne/react-fetch';
import {Empty, Result} from '@kne/antd-taro';
import * as apis from './apis';
import Taro from '@tarojs/taro';
import {CommonLoadingView, preset as miniCorePreset} from '@kne/mini-core';
import {preset as formPreset} from '@kne/react-form-antd-taro';
import {enumMapping, formRules} from "./common";
import '@kne/antd-taro/dist/index.css';
import '@kne/react-form-antd-taro/dist/index.css';
import '@kne/mini-core/dist/index.css';
import './theme.scss';

const accountInfo = Taro.getAccountInfoSync();
export const envVersion = accountInfo?.miniProgram?.envVersion;

const baseUrlMapping = {
  "develop": "/",
  "trial": "/",
  "release": "/",
}

export const baseURL = baseUrlMapping[envVersion] || '/';

export const ajax = axios.create({
  validateStatus: function () {
    return true;
  }, baseURL
});

ajax.interceptors.request.use(async config => {
  if (config.method.toUpperCase() !== 'GET' && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

ajax.isNotLogin = false;

ajax.interceptors.response.use(response => {
  if (response.status === 200 && response.data.code === 401) {
    Taro.showToast({
      title: '请先登录', icon: 'error'
    });
    Taro.reLaunch({
      url: '/packages/system/login/index'
    });
    ajax.isNotLogin = true;
  } else {
    ajax.isNotLogin = false;
  }
  return response;
});

ajax.interceptors.response.use((response) => {
  if ((response.status !== 200 || (response.data.hasOwnProperty('code') && response.data.code !== 0)) && response.config.showError !== false && !ajax.isNotLogin) {
    Taro.showToast({
      icon: 'error', title: response.data?.msg || '请求发生错误'
    });
  }
  return response;
});

fetchPreset({
  ajax,
  loading: <CommonLoadingView/>,
  error: (err) => <Result status="error" title={err || "请求发生错误"}/>,
  empty: <Empty/>,
  transformResponse: (response) => {
    const {data} = response;
    response.data = {
      code: data?.code === 0 ? 200 : data?.code, msg: data?.msg, results: data?.data,
    };
    return response;
  }
});

miniCorePreset({
  stateColors: {
    primary: '#4F185A'
  }
});

const preset = {
  ajax,
  apis: Object.assign({}, apis, {baseURL}),
  enums: enumMapping,
  formInfo: formRules,
};

// 补充 Form Rules
formPreset({
  rules: {}
})

export default preset;
