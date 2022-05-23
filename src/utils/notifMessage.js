import React from 'react';
import { Notification, toaster } from 'rsuite';
import {TITLE_CONSTANTS} from 'src/constants';

const notifMessage = (message, notifType, placement="topEnd") => {
  toaster.push(notifObj(message, notifType), {placement})
}

const notifObj = (message, notifType) => {
  return(
    <Notification duration={1400} type={notifType} header={TITLE_CONSTANTS[notifType]} closable>
      <div style={{width: 280}}>
        <p>{message}</p>
      </div>
    </Notification>
  )
}

export default notifMessage;