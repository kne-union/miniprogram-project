import {View} from "@tarojs/components";
import React from "react";

import {ApplicationLayout} from '@components';
import style from './style.module.scss';

const Dashboard = () => {
  return (<ApplicationLayout
    className={style['dashboard']}
    header={{
      title: '首页',
      back: null
    }}
    showToolBar
  >
    {props => <View>这里是首页...</View>}
  </ApplicationLayout>)
};

export default Dashboard;
