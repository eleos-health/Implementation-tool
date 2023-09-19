import React, { useState } from 'react';
import {
  Form, Input, Select, message, Button, Popconfirm, InputNumber,
} from 'antd';
import { Field } from '../NoteTypeConfigure/NoteTypeConfigure';
import './FieldCreatorForm.css';
import { updateFields, getNoteTypeName } from '../../context/Context';

interface FormProps {
    fields: Array<Field>;
    setFields: any;
}
const FieldCreatorForm = (props: FormProps) => {
  const { setFields, fields } = props;
  const [formField, setFormField] = useState<Field>({});
  const [textFieldIndex, setTextFieldIndex] = useState(1);
  const [listFieldIndex, setListFieldIndex] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValueIndex, setEditValueIndex] = useState(1);
  const [switchValueIndex1, setSwitchValueIndex1] = useState(1);
  const [switchValueIndex2, setSwitchValueIndex2] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const error = (textMsg: string) => {
    messageApi.open({
      type: 'error',
      content: textMsg,
    });
  };

  const success = (editMode: boolean, text?: string) => {
    messageApi.open({
      type: 'success',
      content: `Field ${editMode ? 'edited' : 'added'} successfully`,
    });
  };

  const validateKeyDup = (value: string, index?: number) => {
    const keys = index ? fields.splice(index, 1).map((field) => field.key) : fields.map((field) => field.key);
    return !keys.includes(value);
  };

  const updateFormField = (key: string, value: string) => {
    if (!value) return;
    if (key === 'key') {
      if (!validateKeyDup(value)) {
        form.setFieldValue('key', '');
        error('Can\'t have duplicate string "key" on the same note type, please choose another value');
        return;
      }
    }
    const newField = formField;
    newField[key] = value;
    setFormField({ ...newField });
  };

  const handleOptions = (key: string, value: string) => {
    if (!value) return;
    const values = value.split(',').map((val: string) => val.trim());
    const newField = formField;
    newField[key] = values;
    setFormField(newField);
  };

  const getDbFieldType = (type: string) => {
    switch (type) {
    case 'checkbox':
      return 'list_field';
    case 'dropdown':
      return 'list_field';
    default:
      return 'text_field';
    }
  };

  const getFieldTypeIndex = (type: string) => {
    switch (type) {
    case 'checkbox':
      setListFieldIndex(listFieldIndex + 1);
      return listFieldIndex;
    case 'dropdown':
      setListFieldIndex(listFieldIndex + 1);
      return listFieldIndex;
    default:
      setTextFieldIndex(textFieldIndex + 1);
      return textFieldIndex;
    }
  };

  const onSaveNewField = (newFields: Field[]) => {
    setFields(newFields);
    updateFields(newFields);
    success(isEditMode);
    setFormField({});
    form.resetFields();
    form.setFieldsValue('');
  };

  const handleEdit = () => {
    const newFields = fields;
    newFields[editValueIndex - 1] = formField;
    if (!validateKeyDup(formField.key, editValueIndex)) {
      form.setFieldValue('key', '');
      error('Can\'t have duplicate string "key" on the same note type, please choose another value');
      return;
    }
    onSaveNewField(newFields);
    setIsEditMode(false);
  };

  const addNewField = () => {
    if (isEditMode) {
      handleEdit();
      return;
    }
    if (!formField.key) return error('Can\'t add new field: field must include a key');
    const newFields = fields;
    const { field_type } = formField;
    const copyField = {
      ...formField,
      hidden: false,
      editable: true,
      required: false,
      db_field_type: `${getDbFieldType(field_type)}${getFieldTypeIndex(field_type)}`,
    };
    newFields.push(copyField);
    onSaveNewField(newFields);
  };

  const clearFormAndFields = () => {
    setFields([]);
    updateFields([]);
    setFormField({});
    form.resetFields();
    form.setFieldsValue('');
  };

  const onEditButtonClick = () => {
    const field = fields[editValueIndex - 1];
    setIsEditMode(true);
    setFormField(field);
    form.setFieldValue('key', field.key);
    form.setFieldValue('title', field.title);
    form.setFieldValue('subtitle', field.subtitle);
    form.setFieldValue('type', field.field_type);
    form.setFieldValue('options', field.options);
  };

  const onSwitchButtonClick = () => {
    if (switchValueIndex1 === switchValueIndex2) return;
    const realValueIndex1 = switchValueIndex1 - 1;
    const realValueIndex2 = switchValueIndex2 - 1;
    const newFields = fields;
    const temp = newFields[realValueIndex1];
    newFields[realValueIndex1] = newFields[realValueIndex2];
    newFields[realValueIndex2] = temp;
    setFields(newFields);
    updateFields(newFields);
    messageApi.open({
      type: 'success',
      content: 'Switched fields successfully',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(fields));
    messageApi.open({
      type: 'success',
      content: 'Fields successfully copied to clipboard',
    });
  };

  const editInputElement = <InputNumber value={editValueIndex} min={1} max={fields.length} placeholder="#" style={{ width: '50px' }} onChange={(e) => setEditValueIndex(e)}></InputNumber>;
  const switchInputElement1 = <InputNumber value={switchValueIndex1} min={1} max={fields.length} placeholder="#" style={{ width: '50px' }} onChange={(e) => setSwitchValueIndex1(e)}></InputNumber>;
  const switchInputElement2 = <InputNumber value={switchValueIndex2} min={1} max={fields.length} placeholder="#" style={{ width: '50px' }} onChange={(e) => setSwitchValueIndex2(e)}></InputNumber>;

  return (<div className="field-form">
    {contextHolder}
    <Form labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
      onFinish={addNewField}
      style={{ maxWidth: 600 }}>
      <Form.Item label="Key" name="key" required>
        <Input onBlur={(e) => updateFormField('key', e.target.value)}></Input>
      </Form.Item>
      <Form.Item label="Title" name="title">
        <Input onBlur={(e) => updateFormField('title', e.target.value)}></Input>
      </Form.Item>
      <Form.Item label="Subtitle" name="subtitle">
        <Input onBlur={(e) => updateFormField('subtitle', e.target.value)}></Input>
      </Form.Item>
      <Form.Item noStyle
        shouldUpdate={((prevValues, currentValues) => prevValues.type !== currentValues.type)}>
        {({ getFieldValue }) => ((getFieldValue('type') && getFieldValue('type') !== 'textarea')
          ? <Form.Item label="Options" name="options">
            <TextArea
              style={{ height: 120, resize: 'none' }}
              onBlur={(e) => handleOptions('options', e.target.value)}
              placeholder="Please enter values separated by comma">
            </TextArea>
          </Form.Item>
          : null)}
      </Form.Item>
      <Form.Item label="Type" name="type">
        <Select onChange={(value) => {
          updateFormField('field_type', value);
        }}>
          <Select.Option value="textarea">Textarea</Select.Option>
          <Select.Option value="radio">Radio</Select.Option>
          <Select.Option value="checkbox">Checkbox</Select.Option>
          <Select.Option value="dropdown">Dropdown</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit" className="add-field-button">
          {isEditMode ? 'Edit Field' : 'Add Field'}
        </Button>
        <Popconfirm
          description="Are you sure you want to delete all data?"
          title="Confirm"
          onConfirm={clearFormAndFields}
          okText="Yes"
          cancelText="No"
          style={{ paddingTop: '12px' }}>
          <Button danger>Clear form and fields</Button>
        </Popconfirm>
      </Form.Item>
      <Button type="primary" onClick={copyToClipboard}>Copy to clipboard</Button>
    </Form>
    {fields.length ? <div style={{ width: '500px', paddingBottom: '12px' }}>Actions:</div> : null}
    {fields.length ? <div className="form-actions-container">
      <div className="actions-control-container" style={{ display: 'flex' }}>
            Edit field  {editInputElement} <Button type="primary" onClick={onEditButtonClick}>Go</Button>
      </div>
      <div className="actions-control-container" style={{ display: 'flex' }}>
            Switch b/w fields {switchInputElement1} and {switchInputElement2} <Button type="primary" onClick={onSwitchButtonClick}>Go</Button>
      </div>
    </div> : null}
    <div style={{ color: 'red', fontSize: '20px' }}>*Please note that the fields order is important: it has to be the same order the fields are shown in the EHR*</div>
  </div>
  );
};
export default FieldCreatorForm;
