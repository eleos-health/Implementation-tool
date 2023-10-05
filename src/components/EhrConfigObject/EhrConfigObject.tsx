import React, { useState, useEffect } from 'react';
import { Button, message, Select } from 'antd';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { getFields, getNoteTypeName } from '../../context/Context';
import './EhrConfigObject.css';
import { getEhrBasicObject } from '../../utils';
import { getFieldIdentifier } from './utils';

const EhrConfigObject = () => {
  const [fields, setFields] = useState([]);
  const [noteTypeName, setNoteTypeName] = useState('');
  const [ehr, setEhr] = useState('');
  const [configurationObject, setConfigurationObject] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getFields().then((res) => setFields(res));
    getNoteTypeName().then((name) => setNoteTypeName(name));
  }, []);

  const onEhrSelect = (value: string) => {
    setEhr(value);
    const ehrConfigObj: any = getEhrBasicObject(value);
    const reportFields = {};
    fields.forEach((field) => {
      const { key, title } = field;
      reportFields[key] = getFieldIdentifier(value, title);
    });
    ehrConfigObj.progress_notes[0].report_fields = reportFields;
    ehrConfigObj.progress_notes[0].type = noteTypeName;
    setConfigurationObject(ehrConfigObj);
  };

  const getEhrIdentifierText = () => {
    switch (ehr) {
    case 'carelogic':
      return '$(\'head\', window.top.document).text().toLowerCase().match(\'_account =.*\')[0].match(/"([^\']+)"/)[1]';
    case 'crediblebh':
      return '$(\'input#partner_id\', window.top[0].document)[0].value';
    case 'welligent':
      return '$(\'html\', window.top.document)[0].innerHTML.match(\'orgid=[0-9]*\')[0].split(\'=\')[1]';
    default:
      return 'window.location.host.toLowerCase() + window.location.pathname.toLowerCase()';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(configurationObject, undefined, 4));
    messageApi.open({
      type: 'success',
      content: 'Configuration successfully copied to clipboard',
    });
  };

  const shouldDisplayTipMessage = () => ehr && !['carelogic', 'crediblebh', 'welligent'].includes(ehr);

  return <div className="ehr-config-ui-container">
    {contextHolder}
    <div className="ehr-config-ui-left-side">
      <div style={{ paddingBottom: '12px' }}>Select an EHR:</div>
      <Select onChange={onEhrSelect} style={{ width: '200px' }}>
        <Select.Option value="carelogic">Carelogic</Select.Option>
        <Select.Option value="myavatarnx">MyAvatarNX</Select.Option>
        <Select.Option value="kipu">Kipu</Select.Option>
        <Select.Option value="pce">PCE</Select.Option>
        <Select.Option value="crediblebh">Credible</Select.Option>
        <Select.Option value="myevolve">MyEvolve</Select.Option>
        <Select.Option value="ehana">Ehana</Select.Option>
        <Select.Option value="welligent">Welligent</Select.Option>
        <Select.Option value="echo">Echo</Select.Option>
        {/* <Select.Option value="smartcare">SmartCare</Select.Option> */}
        {/* <Select.Option value="advencedmd">AdvancedMd</Select.Option> */}
      </Select>
      {ehr && <div style={{ paddingTop: '12px' }}>
        <div style={{ paddingBottom: '12px' }}>Copy and paste the following script in the console inside the EHR page:
        </div>
        <code style={{ color: 'crimson' }}>{getEhrIdentifierText()}</code></div>}
      {shouldDisplayTipMessage()
          && <div style={{ paddingTop: '12px' }}>With this script you will need to look for a unique client identifier from
            the URL string</div>}
      {ehr && <Button type="primary" onClick={copyToClipboard} style={{ marginTop: '12px' }}>Copy to clipboard</Button>}
    </div>
    <JSONInput locale={locale} placeholder={configurationObject} style={{ outerBox: { textAlign: 'left' } }}></JSONInput>
  </div>;
};

export default EhrConfigObject;
