import React, { useState, useEffect } from 'react';
import {
  Button, message, Select,
} from 'antd';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { getAllNoteTypes } from '../../context/Context';
import './EhrConfigObject.css';
import { getEhrBasicObject } from '../../utils';
import { getEhrNoteContextIdentifier, getFieldIdentifier, getParentSelector } from './utils';
import { Field } from '../NoteTypeConfigure/NoteTypeConfigure';

const EhrConfigObject = () => {
  const [noteTypes, setNoteTypes] = useState([]);
  const [ehr, setEhr] = useState('');
  const [configurationObject, setConfigurationObject] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getAllNoteTypes().then((res) => setNoteTypes(res));
  }, []);

  const onEhrSelect = (ehrValue: string) => {
    setEhr(ehrValue);
    const ehrConfigObj: any = getEhrBasicObject(ehrValue);
    const progressNoteItemCopy = ehrConfigObj.progress_notes[0];
    let reportFields = {};
    noteTypes.forEach((noteType, index: number) => {
      noteType.fields.forEach((field: Field) => {
        const { key, title, field_type } = field;
        reportFields[key] = getFieldIdentifier(ehrValue, title, field_type);
      });
      ehrConfigObj.progress_notes[index] = { ...progressNoteItemCopy };
      ehrConfigObj.progress_notes[index].report_fields = reportFields;
      ehrConfigObj.progress_notes[index].type = noteType.name;
      ehrConfigObj.progress_notes[index].context = getEhrNoteContextIdentifier(ehrValue, noteType.noteHeadline);
      ehrConfigObj.progress_notes[index].parent_selector = getParentSelector(ehrValue, noteType.fields[0].title) || ehrConfigObj.progress_notes[index].parent_selector;
      setConfigurationObject(ehrConfigObj);
      reportFields = {};
    });
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

  const handleObjectViewerChange = (event: {jsObject: any, error: any}) => {
    if (event.jsObject) {
      setConfigurationObject(event.jsObject);
    } else {
      messageApi.open({
        type: 'error',
        content: `Error parsing JSON object: ${event.error.reason}`,
      });
    }
  };

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
    <JSONInput locale={locale}
      placeholder={configurationObject}
      style={{ outerBox: { textAlign: 'left' } }}
      onBlur={handleObjectViewerChange}></JSONInput>
  </div>;
};

export default EhrConfigObject;
