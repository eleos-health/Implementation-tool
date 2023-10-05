import React, { useEffect, useState } from 'react';
import './NoteTypeConfigure.css';
import ReactJson from 'react-json-view';
import { Form, Input } from 'antd';
import FieldCreatorForm from '../FieldCreatorForm/FieldCreatorForm';
import {
  getFields, updateFields, setNoteTypeName as setStoreNoteTypeName, getNoteTypeName,
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

const NoteTypeConfigure = () => {
  const [fields, setFields] = useState([]);
  const [noteTypeName, setNoteTypeName] = useState('');

  const setFormFields = (formFields) => {
    setFields(formFields);
    updateFields(formFields);
  };

  useEffect(() => {
    getFields().then((res) => setFields(res));
    getNoteTypeName().then((name) => setNoteTypeName(name));
  }, []);

  const fieldsObject = {};
  fieldsObject[noteTypeName] = fields;

  return <div className="big-form-container">
    <div className="fields-and-viewer">
      <div className="form-container">
        <Form.Item label="Note Type Name" style={{ fontWeight: 'bold', paddingLeft: '20px' }}>
          <Input
            value={noteTypeName}
            className="note-type-name-input"
            onChange={(e) => {
              setStoreNoteTypeName(e.target.value);
              setNoteTypeName(e.target.value);
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
