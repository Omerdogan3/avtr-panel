import React, {useEffect, useState} from 'react';
import 'rsuite/styles/index.less';
import { Container, InputGroup, InputNumber, Button,Table, Dropdown } from 'rsuite';
import api from 'src/api';
import _ from 'lodash';
import RegionSelect from './RegionSelect';

const {Cell, Column, HeaderCell} = Table;

function RegionDividers({regionDividers,isLoading,onSubmit}) {
  const [editRegion, setEditRegion] = useState(false);
  const [editableRegion, setEditableRegion] = useState([]);
  const [newRegionValue, setNewRegionValue] = useState();
  const [updatedRegionValue, setUpdatedRegionValue] = useState();
  const [createNewRegion, setCreateNewRegion] = useState(false);
  const [timeZones, setTimeZones] = useState([]);
  const [newregion, setNewRegion] = useState();

  const newRegionHandler = async () => {
    setCreateNewRegion(true);
    setEditRegion(false);
    const timeZones = await api.getAllTimeZones();
    if (timeZones) {
      setTimeZones(timeZones);
    }
    onSubmit();
  };

  const updateRegionDivider = async () => {
    const data = {
      regionId: editableRegion._id,
      region: editableRegion.countryCode,
      divider: parseInt(updatedRegionValue),
    };
    api.updateRegionDivider(data);
    onSubmit();
  };

  const removeRegion = async (regionId) => {
    api.removeRegion(regionId);
    onSubmit();
  };

  const newRegionDivider = async (regionData) => {
    api.newRegionDivider(regionData);
    onSubmit();
  };
  const editRegionHandler = async (regionId) => {
    setEditRegion(true);
    setCreateNewRegion(false);
    const data = await api.getRegionDividerById(regionId);
    setEditableRegion(data[0]);
  };

  return (
    <Container>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <p style={{marginBottom:10}}>Reward Dividers by Region </p>
        <Table
          loading={isLoading}
          autoHeight={false}
          virtualized
          bordered
          data={regionDividers}
        >
          <Column flexGrow={1}>
            <HeaderCell>Region</HeaderCell>
            <Cell dataKey="countryCode" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Divider</HeaderCell>
            <Cell dataKey="divider" />
          </Column>

          <Column flexGrow={1} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {(rowData) => {
                return (
                  <span>
                    <a onClick={() => editRegionHandler(rowData._id)}>Edit</a>
                    <a> | </a>
                    <a onClick={() => window.confirm( "Are you sure you wish to delete this item?") 
                      && removeRegion(rowData._id)}>
                      Remove
                    </a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
        <Button style={{marginTop:20}} onClick={() => newRegionHandler()}>Create New</Button>

        {editRegion && (
          <div style={{ paddingBottom: 20, paddingTop:20,width: 224 }}>
            <p style={{ paddingBottom: 4 }}>{editableRegion.countryCode}</p>
            <InputGroup>
              <InputNumber
                placeholder={editableRegion.divider}
                value={updatedRegionValue}
                onChange={(value) => {
                  setUpdatedRegionValue(value);
                }}
              />
              <InputGroup.Button onClick={() => updateRegionDivider()}>
                Update
              </InputGroup.Button>
            </InputGroup>
          </div>
        )}

        {createNewRegion && (
          <div>
            <RegionSelect onChange={(val)=>setNewRegion(val)}></RegionSelect>
            <InputGroup>
              <InputNumber
                placeholder={"dividervalue"}
                value={newRegionValue}
                onChange={(value) => {
                  setNewRegionValue(value);
                }}/>
              <InputGroup.Button
                onClick={() =>
                  newRegionDivider({
                    region: newregion,
                    divider: parseInt(newRegionValue),
                  })}>
                Create New
              </InputGroup.Button>
            </InputGroup>
          </div>
        )}
      </div>
    </Container>
  );
}

export default RegionDividers;



