import React, { useState } from 'react';
import './NoteTypeConfigure.css';
import ReactJson from 'react-json-view';
import { Form, Input } from 'antd';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import FieldCreatorForm from '../FieldCreatorForm/FieldCreatorForm';
import { getFields, updateFields, setNoteTypeName as setStoreNoteTypeName } from '../../context/Context';

export interface Field {
  subtitle?: string;
  key?: string;
  title?: string;
  field_type?: string;
  section?: string;
  options?: Array<string>;
}

const NoteTypeConfigure = () => {
  const [fields, setFields] = useState(getFields());
  const [noteTypeName, setNoteTypeName] = useState('');

  const removeLastField = () => {
    if (!fields.length) return;
    const copy = { ...fields };
    copy.pop();
    setFields(copy);
    updateFields(copy);
  };

  const setFormFields = (formFields) => {
    setFields(formFields);
    updateFields(formFields);
  };

  const fieldsObject = {};
  fieldsObject[noteTypeName] = fields;

  return <div className="big-form-container">
    <div className="fields-and-viewer">
      <div className="form-container">
        <Form.Item label="Note Type Name">
          <Input
            className="note-type-name-input"
            onChange={(e) => {
              setStoreNoteTypeName(e.target.value);
              setNoteTypeName(e.target.value);
            }}>
          </Input>
        </Form.Item>
        <FieldCreatorForm fields={fields} setFields={setFormFields}></FieldCreatorForm>
      </div>
      <ReactJson src={fields} name={noteTypeName || 'root'}></ReactJson>
    </div>
  </div>;
};
export default NoteTypeConfigure;
