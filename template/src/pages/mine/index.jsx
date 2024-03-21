import {get} from 'lodash';
import {Image, View} from "@tarojs/components";
import {AvatarPreview, useGlobalContext} from "@kne/mini-core";

import {ApplicationLayout} from '@components';
import femaleSrc from "@assets/female.svg";
import maleSrc from "@assets/male.svg";
import defaultAvatarSrc from "@assets/default_avatar.png";
import style from './style.module.scss';

const MineContentInner = () => {
  const {global: userInfo} = useGlobalContext('userInfo');

  return (
    <View className={style["mine"]}>
      <View className={style["mine-avatar"]}>
        {
          get(userInfo, 'avatar')
            ? <AvatarPreview value={get(userInfo, 'avatar')}/>
            : <Image
              className={style['avatar-icon']}
              src={get(userInfo, 'gender') ? (get(userInfo, 'gender') === 'F' ? femaleSrc : maleSrc) : defaultAvatarSrc}
            />
        }
      </View>
      <View className={style["mine-name"]}>{get(userInfo, 'englishName')}</View>
      <View className={style["mine-english-name"]}>{get(userInfo, 'name')}</View>
      <View className={style["mine-email"]}>{get(userInfo, 'email')}</View>
    </View>
  );
}

const Mine = () => {
  return (
    <ApplicationLayout
      showToolBar
      header={{
        title: '我的',
        back: null
      }}
    >
      {(props) => <MineContentInner {...props}/>}
    </ApplicationLayout>
  );
};

export default Mine;
