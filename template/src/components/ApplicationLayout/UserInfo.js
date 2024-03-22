import React, {createContext, useContext} from 'react';
import {getCache, useFetch, withFetch} from "@kne/react-fetch";
import {CommonLoadingView, SetGlobal, usePreset} from '@kne/mini-core';
import {View} from "@tarojs/components";
import get from "lodash/get";

import style from './style.module.scss';
import {testJson} from '../../../doc/mock';

const userInfoContext = createContext({});

const {Provider} = userInfoContext;

const userInfoCache = {
  current: null
};

const UserInfoInner = ({data, refresh, children}) => {
  return <Provider value={{
    reload: () => {
      const cache = getCache();
      cache.delByCacheName('user-info');
      userInfoCache.current = null;
      refresh();
    }
  }}>
    <SetGlobal globalKey="userInfo" value={data}>{children}</SetGlobal>
  </Provider>
};

const UserInfo = withFetch(UserInfoInner);

let errorCode = null;
export const withUserInfo = (WrappedComponent) => {
  return (props) => {
    const {apis} = usePreset();
    const {
      isLoading,
      data,
      isComplete,
      reload,
      refresh,
      error
    } = useFetch(Object.assign({}, apis.test.getUserInfo, {
      transformData: (data) => {
        return {
          ...(data || {}),
          formatUserName: (get(data, 'englishName') || '') + ' ' + (get(data, 'name') || '')
        }
      },
      transformResponse: (response) => {
        // ------START TODO 测试数据，请删除
        response.data = testJson;
        // ------END

        // const {data} = response;
        // if (data?.code === 401) {
        //   errorCode = 401;
        // }
        // response.data = {
        //   code: data?.code === 0 ? 200 : data?.code,
        //   msg: data?.msg,
        //   results: data?.data,
        // };
        return response;
      },
      onRequestSuccess: (data) => {
        errorCode = null;
        userInfoCache.current = data;
      }
    }));

    if (isLoading && !userInfoCache.current) {
      return <View className={style['loading']}><CommonLoadingView/></View>;
    }
    // if (error) {
    //   Taro.switchTab({url: "/pages/index/index"})
    // }

    if (!isComplete && !data && !userInfoCache.current) {
      return null;
    }

    return (
      <UserInfoInner
        data={testJson.data}
        // data={data || userInfoCache.current}
        reload={reload}
        refresh={refresh}
      >
        <WrappedComponent{...props} reload={reload} refresh={refresh}/>
      </UserInfoInner>
    );
  };
};

export default UserInfo;

export const useReloadUserInfo = () => {
  const {reload} = useContext(userInfoContext);
  return reload;
};
