import preset from './preset';
import {Global} from '@kne/mini-core';
import './app.scss';
import Taro, {useLaunch} from "@tarojs/taro";

function App({children}) {
  useLaunch(async () => {

    //强制更新版本
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate();
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      Taro.showModal({
        title: '手动更新小程序',
        content: '新版本需要手动更新，请您删除当前小程序，重新搜索打开。',
      })
    });
  });

  return <Global preset={preset}>{children}</Global>
}

export default App
