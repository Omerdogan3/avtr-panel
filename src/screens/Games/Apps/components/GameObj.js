import React from 'react';
import { Col, Badge, Placeholder, FlexboxGrid } from 'rsuite';
import 'rsuite/styles/index.less';

import {Link} from "react-router-dom";
import PlatformBadge from 'src/components/PlatformBadge';

function GameObj({title, thumbnail, platform, appId, isActive}){
  return(
    <Link to={{
      pathname: `/apps/${appId}`,
      // search: '?sort=name',
      // hash: '#the-hash',
     }}>
      <Col path style={{paddingBottom: 40}} xsOffset={1} mdOffset={1} lgOffset={1} xs={23} md={7} lg={6}>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          
          <Badge color={isActive ? "green" : "red"} content={isActive ? "Active" : "Inactive"} >
            {
              thumbnail ? 
              <img 
                style={{width: 100, height: 100, borderRadius: 24}}
                src={thumbnail}/>
              :
              <Placeholder.Graph style={{borderRadius: 24}} width={100} height={100}/>
            }
          </Badge>
          
          <div style={{padding: 16}}>
            <div>
              <p style={{fontSize: 16, fontWeight: 'bold', color: "white"}}>{title}</p>
              <PlatformBadge platform={platform}/>
            </div>
          </div>
        </div>
      </Col>
    </Link>
  )
}

export default GameObj;