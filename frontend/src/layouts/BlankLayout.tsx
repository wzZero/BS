import React, {useEffect} from 'react';
import { Inspector } from 'react-dev-inspector';
import {inject, observer} from "mobx-react";
import {history} from "@@/core/history";

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout: React.FC = inject('baseStore')(
  observer((component) => {
    useEffect(()=>{
      const {pathname} = window.location;
      // @ts-ignore
        const {uid} = component.baseStore;
      if(!uid && pathname!=='/user/login'){
        history.replace({
          pathname: '/user/login'
        });
      }
    },
      []);
    return <InspectorWrapper>{component.children}</InspectorWrapper>
  })

)

export default Layout;
