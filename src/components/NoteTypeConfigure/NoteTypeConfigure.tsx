import React, { useEffect, useState } from 'react';
import './NoteTypeConfigure.css';
import ReactJson from 'react-json-view';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip } from 'antd';
import FieldCreatorForm from '../FieldCreatorForm/FieldCreatorForm';
import {
  getFields, updateFields, setNoteTypeName as setStoreNoteTypeName, getNoteTypeName, getNoteHeadline, setNoteHeadline as setStoreNoteTypeHeadline,
} from '../../context/Context';

export interface Field {
  subtitle?: string;
  key?: string;
  title?: string;
  field_type?: string;
  section?: string;
  options?: Array<string>;
  conditions?: Array<{key: string; values: Array<string>}>;
  index?: number;
}

const NoteTypeConfigure = () => {
  const [fields, setFields] = useState([]);
  const [noteTypeName, setNoteTypeName] = useState('');
  const [noteHeadline, setNoteHeadline] = useState('');

  const setFormFields = (formFields) => {
    setFields(formFields);
    updateFields(formFields);
  };

  useEffect(() => {
    getFields().then((res) => setFields(res));
    getNoteTypeName().then((name) => setNoteTypeName(name));
    getNoteHeadline().then((headline) => setNoteHeadline(headline));
  }, []);

  const fieldsObject = {};
  fieldsObject[noteTypeName] = fields;

  return <div className="big-form-container">
    <div className="fields-and-viewer">
      <div className="form-container">
        <Form.Item label="Note Type Name" style={{ fontWeight: 'bold', paddingLeft: '20px' }}>
          <Input
            value={noteTypeName}
            className="note-inputs"
            onChange={(e) => {
              setStoreNoteTypeName(e.target.value);
              setNoteTypeName(e.target.value);
            }}
          >
          </Input>
        </Form.Item>

        <Form.Item label={
          <div>EHR Note Headline
            <Tooltip title="Go to the EHR note and copy and past the exact note headline" >
              <InfoCircleOutlined className="ehr-session-info-tooltip" style={{ padding: '6px' }} />
            </Tooltip></div>}
        style={{ fontWeight: 'bold', paddingLeft: '20px' }}>
          <Input
            value={noteHeadline}
            className="note-inputs"
            onChange={(e) => {
              setStoreNoteTypeHeadline(e.target.value);
              setNoteHeadline(e.target.value);
            }}
          >
          </Input>
        </Form.Item>
        <FieldCreatorForm fields={fields} setFields={setFormFields}></FieldCreatorForm>
      </div>
      <ReactJson src={fields} name={noteTypeName || ''} enableClipboard={false}></ReactJson>
    </div>
  </div>;
};
export default NoteTypeConfigure;
