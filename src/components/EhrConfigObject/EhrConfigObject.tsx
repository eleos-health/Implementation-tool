import React, { useState } from 'react';
import { Select } from 'antd';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { getFields, getNoteTypeName } from '../../context/Context';
import './EhrConfigObject.css';
import { getEhrBasicObject } from '../../utils';

const EhrConfigObject = () => {
  const fields = getFields();
  const noteType = getNoteTypeName();
  const [ehr, setEhr] = useState('');
  const [configurationObject, setConfigurationObject] = useState({});

  const onEhrSelect = (value: string) => {
    setEhr(value);
    const ehrConfigObj: any = getEhrBasicObject(value);
    const reportFields = {};
    fields.forEach((field) => {
      const { key, title } = field;
      reportFields[key] = `tr[class*=\\'']:has(td:contains('${title || ''}')):contains():last`;
    });
    if (!ehrConfigObj.progress_notes) {
      ehrConfigObj.progress_notes = [];
      ehrConfigObj.progress_notes[0] = {};
    }
    ehrConfigObj.progress_notes[0].report_fields = reportFields;
    ehrConfigObj.progress_notes[0].type = noteType;
    setConfigurationObject(ehrConfigObj);
  };

  return <div className="ehr-config-ui-container">
    <div >
      <div style={{ paddingBottom: '12px' }}>Select an EHR:</div>
      <Select onChange={onEhrSelect} style={{ width: '200px' }}>
        <Select.Option value="carelogic">Carelogic</Select.Option>
        <Select.Option value="myavatarnx">MyAvatarNX</Select.Option>
        <Select.Option value="kipu">Kipu</Select.Option>
        <Select.Option value="pce">PCE</Select.Option>
      </Select>
    </div>
    <JSONInput locale={locale} placeholder={configurationObject} style={{ outerBox: { textAlign: 'left' } }}></JSONInput>
  </div>;
};

export default EhrConfigObject;
