import {withUserInfo} from './UserInfo';
import BaseLayout from './BaseLayout';
import React from 'react';

const ApplicationLayout = withUserInfo(BaseLayout);

export default ApplicationLayout;
