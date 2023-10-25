import React, { useEffect, useState } from 'react';
import './NoteTypeConfigure.css';
import ReactJson from 'react-json-view';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, Popconfirm, Tooltip,
} from 'antd';
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
  index?: number;
}

const NoteTypeConfigure = (props) => {
  const { index, onRemove } = props;
  const [fields, setFields] = useState([]);
  const [noteTypeName, setNoteTypeName] = useState('');
  const [noteHeadline, setNoteHeadline] = useState('');

  const setFormFields = (formFields: any) => {
    setFields(formFields);
    updateFields(formFields, index);
  };

  useEffect(() => {
    getFields(index).then((res) => setFields(res));
    getNoteTypeName(index).then((name) => setNoteTypeName(name));
    getNoteHeadline(index).then((headline) => setNoteHeadline(headline));
  }, []);

  const fieldsObject = {};
  fieldsObject[noteTypeName] = fields;

  return <div className="big-form-container">
    <div className="fields-and-viewer">
      <div className="form-container">
        <Form.Item label="Note Type Name" style={{ fontWeight: 'bold', paddingLeft: '20px' }} className="note-cofig-header">
          <Input
            value={noteTypeName}
            className="note-inputs"
            onChange={(e) => {
              setStoreNoteTypeName(e.target.value, index);
              setNoteTypeName(e.target.value);
            }}>
          </Input>

          <Popconfirm
            description="Are you sure you want to delete this note type?"
            className="remove-note-type-button"
            title="Confirm"
            onConfirm={onRemove}
            okText="Yes"
            cancelText="No">
            <Button type="primary" danger>Remove this note type</Button>
          </Popconfirm>
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
              setStoreNoteTypeHeadline(e.target.value, index);
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
