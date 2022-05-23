import React from 'react';
import {Badge} from 'rsuite';
import 'rsuite/styles/index.less';

function PlatformBadge({style, platform}){
  return(
    <div style={{paddingTop: 4, ...style}}>
      {
        platform &&
        platform === "Android" ?
        <Badge color="red" content="Android" />
        :
        platform &&
        <Badge color="blue" content="IOS"/>
      }
    </div>
  )
}

export default PlatformBadge;