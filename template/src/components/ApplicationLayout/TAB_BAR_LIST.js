import {Icon} from "@kne/antd-taro";
import React from "react";

const TAB_BAR_LIST = [{
  key: '/pages/index/index',
  icon: (active) => active
    ? <Icon className={"adm-component"} type="clockCircleFill"/>
    : <Icon className={"adm-component"} type="check-mark"/>,
  title: '首页',
  pagePath: '/pages/index/index'
}, {
  key: '/pages/mine/index',
  icon: (active) => active
    ? <Icon type="informationCircleFill" className={"adm-component"}/>
    : <Icon type={'down-outline'} className="adm-component"/>,
  title: '我的',
  pagePath: '/pages/mine/index'
}];

export default TAB_BAR_LIST;
