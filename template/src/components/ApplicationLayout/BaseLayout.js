import React from 'react';
import {Layout} from '@kne/mini-core';
import toolBarList from './TAB_BAR_LIST';

const BaseLayout = ({showToolBar, children, reload, refresh, ...props}) => {
  return (
    <Layout {...props} toolBarList={showToolBar ? toolBarList : null}>
      {typeof children === 'function' ? children({reload, refresh}) : children}
    </Layout>
  )
};

BaseLayout.defaultProps = {
    showToolBar: false, header: {}
};


export default BaseLayout;
