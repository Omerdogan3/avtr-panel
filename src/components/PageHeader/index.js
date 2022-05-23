import React, { useState } from 'react';
import 'rsuite/styles/index.less';
import { Header, Divider, IconButton } from 'rsuite';
import NewUser from 'src/screens/PanelUsers/NewUser';
import PlusIcon from '@rsuite/icons/Plus';

function PageHeader({title, displayPlus, drawerType, rightComponent, onSubmit}) {
  const [open, setOpen] = useState(false);
  return (
    <Header>
      <div style={{display: "flex", paddingLeft: 50, paddingRight: 50, paddingTop: 24, flexDirection: 'row', alignItems: "center", justifyContent: 'space-between'}}>
        <h2 style={{fontSize: 24}}>
          {title}
          {
            displayPlus &&
            <IconButton onClick={()=> setOpen(true)} style={{marginLeft: 12}} icon={<PlusIcon />} circle size="xs"/>
          }
        </h2>
        {
          rightComponent &&
          rightComponent()
        }
      </div>
      <Divider style={{marginTop: 8}}/>
        <NewUser
          open={open}
          onSubmit={onSubmit}
          setOpen={setOpen}
        />
    </Header>
  );
}

export default PageHeader;
