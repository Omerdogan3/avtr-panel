import React, { useState, useCallback } from 'react';
import {Toggle} from 'rsuite';
import api from 'src/api';
import 'rsuite/styles/index.less';

function AsyncToggle(props) {
  const [checked, setChecked] = useState(props.isActive);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);   
    await api.updateGame(props.appId, {"isActive": !checked})
    setChecked(checked => !checked);
    setLoading(false);
  }

  return <Toggle loading={loading} checked={checked} onChange={toggle} {...props} />;
}

export default AsyncToggle;