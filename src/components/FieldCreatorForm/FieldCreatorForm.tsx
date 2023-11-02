import React, { useState } from 'react';
import {
  Button, Form, Input, InputNumber, message, Modal, Popconfirm, Select, Checkbox,
} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Field } from '../NoteTypeConfigure/NoteTypeConfigure';
import './FieldCreatorForm.css';
import CopyNoteTypeModal from '../CopyNoteTypeModal/CopyNoteTypeModal';
import OptionsInput from '../common/OptionsInput';

interface FormProps {
    fields: Array<Field>;
    setFields: any;
}
const FieldCreatorForm = (props: FormProps) => {
  const { setFields, fields } = props;
  const [formField, setFormField] = useState<Field>({ field_type: 'textarea' });
  const [conditionalField, setConditionalField] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [textFieldIndex, setTextFieldIndex] = useState(1);
  const [listFieldIndex, setListFieldIndex] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValueIndex, setEditValueIndex] = useState(1);
  const [switchValueIndex1, setSwitchValueIndex1] = useState(1);
  const [switchValueIndex2, setSwitchValueIndex2] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [jsonText, setJsonText] = useState('');
  const [form] = Form.useForm();

  const error = (textMsg: string) => {
    messageApi.open({
      type: 'error',
      content: textMsg,
    });
  };

  const success = (editMode: boolean) => {
    messageApi.open({
      type: 'success',
      content: `Field ${editMode ? 'edited' : 'added'} successfully`,
    });
  };

  const validateKeyDup = (value: string, index?: number) => {
    const keys = index
      ? fields.splice(index, 1).map((field) => field.key.toLowerCase().trim().replace(/[ \n\r]/g, ''))
      : fields.map((field) => field.key.toLowerCase().trim().replace(/[ \n\r]/g, ''));
    return !keys.includes(value.toLowerCase().trim().replace(/[ \n\r]/g, ''));
  };

  const updateFormField = (key: string, value: string | Array<{key: string; values: Array<string>}>) => {
    if (!value) return;
    if (key === 'key') {
      if (!validateKeyDup(value as string)) {
        form.setFieldValue('key', '');
        error('Can\'t have duplicate string "key" on the same note type, please choose another value');
        return;
      }
    }
    const newField = formField;
    newField[key] = value;
    setFormField({ ...newField });
  };

  const handleOptions = (key: string, values: Array<string>) => {
    if (!values) return;
    const newValues = values.map((val: string, index: number) => [(index + 1).toString(), val.trim()]);
    const newField = formField;
    newField[key] = newValues;
    setFormField(newField);
  };

  const getDbFieldType = (type: string) => (type === 'checkbox' ? 'list_field' : 'text_field');

  const getFieldTypeIndex = (type: string) => {
    switch (type) {
    case 'checkbox':
      setListFieldIndex(listFieldIndex + 1);
      return listFieldIndex;
    default:
      setTextFieldIndex(textFieldIndex + 1);
      return textFieldIndex;
    }
  };

  const onSaveNewField = (newFields: Field[]) => {
    setFields(newFields);
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

  const addNewField = (values: any) => {
    if (isEditMode) {
      handleEdit();
    } else {
      if (!values.key) return error('Can\'t add new field: field must include a key');
      if (!values.title) return error('Can\'t add new field: field must include a title');
      const newFields = fields;
      const { type } = values;
      const copyField = {
        ...formField,
        field_type: formField.field_type || 'textarea',
        hidden: false,
        editable: true,
        required: false,
        db_field_type: `${getDbFieldType(type)}_${getFieldTypeIndex(type)}`,
        row_index: fields.length + 1,
      };
      newFields.push(copyField);
      onSaveNewField(newFields);
    }
  };

  const clearFormAndFields = () => {
    setFields([]);
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
    form.setFieldValue('options', field.options.map((option) => option[1]));
    form.setFieldValue('conditions', field.conditions);
  };

  const onSwitchButtonClick = () => {
    if (switchValueIndex1 === switchValueIndex2) return;
    const realValueIndex1 = switchValueIndex1 - 1;
    const realValueIndex2 = switchValueIndex2 - 1;
    const newFields = fields;
    const temp = newFields[realValueIndex1];
    newFields[realValueIndex1] = newFields[realValueIndex2];
    newFields[realValueIndex1].index = switchValueIndex1;
    newFields[realValueIndex2] = temp;
    newFields[realValueIndex2].index = switchValueIndex2;
    setFields(newFields);
    messageApi.open({
      type: 'success',
      content: 'Switched fields successfully',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(fields.map((field) => {
      const { index, ...newField } = field;
      return newField;
    }), undefined, 4));
    messageApi.open({
      type: 'success',
      content: 'Fields successfully copied to clipboard',
    });
  };

  const onJsonModalSubmit = () => {
    setCopyModalOpen(false);
    const copiedFields = JSON.parse(jsonText);
    setFields(copiedFields);
    setJsonText('');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClear = () => {
    setSelectedField(null);
    setDisabled(false);
  };

  const handleOk = () => {
    updateFormField('conditions', conditionalField);
    handleClear();
    setConditionalField([]);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    handleClear();
    setIsModalOpen(false);
  };

  const handleFieldSelect = (field) => {
    setDisabled(true);
    setSelectedField(field);
  };

  const onCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    const conditionalObjects = [];
    const newField = {
      key: selectedField[0],
      values: checkedValues,
    };
    conditionalObjects.push(newField);
    setConditionalField(conditionalObjects);
  };

  const editInputElement = <InputNumber value={editValueIndex} min={1} max={fields.length} placeholder="#" style={{ width: '50px' }} onChange={(e) => setEditValueIndex(e)}></InputNumber>;
  const switchInputElement1 = <InputNumber value={switchValueIndex1} min={1} max={fields.length} placeholder="#" style={{ width: '50px' }} onChange={(e) => setSwitchValueIndex1(e)}></InputNumber>;
  const switchInputElement2 = <InputNumber value={switchValueIndex2} min={1} max={fields.length} placeholder="#" style={{ width: '50px' }} onChange={(e) => setSwitchValueIndex2(e)}></InputNumber>;

  return (<div className="field-form">
    {contextHolder}
    <div className="form-fields-container">
      <Form labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        onFinish={addNewField}
        style={{ maxWidth: 600 }}>
        <Form.Item label="Key" name="key" required>
          <Input onBlur={(e) => updateFormField('key', e.target.value)}></Input>
        </Form.Item>
        <Form.Item label="Title" name="title" required>
          <Input onBlur={(e) => updateFormField('title', e.target.value)}></Input>
        </Form.Item>
        <Form.Item label="Subtitle" name="subtitle">
          <Input onBlur={(e) => updateFormField('subtitle', e.target.value)}></Input>
        </Form.Item>
        <Form.Item noStyle
          shouldUpdate={((prevValues, currentValues) => prevValues.type !== currentValues.type)}>
          {({ getFieldValue }) => ((getFieldValue('type') && getFieldValue('type') !== 'textarea')
            ? <Form.Item label="Options" name="options">
              <OptionsInput optionsHandler={handleOptions}></OptionsInput>
            </Form.Item>
            : null)}
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select defaultValue="textarea" onChange={(value) => {
            updateFormField('field_type', value);
          }}>
            <Select.Option value="textarea">Text area</Select.Option>
            <Select.Option value="radio">Radio</Select.Option>
            <Select.Option value="checkbox">Checkbox</Select.Option>
            <Select.Option value="dropdown">Dropdown</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={((prevValues, currentValues) => prevValues.type !== currentValues.type)}>
          {({ getFieldValue }) => (getFieldValue('type') === 'textarea' || !(getFieldValue('type'))
            ? <Form.Item label="Conditions" name="conditions">
              <Button type="primary" onClick={showModal}>Add Conditions</Button>
              <Modal title="Add Conditions" open={isModalOpen} okText={'Add'} onOk={handleOk} okButtonProps={!selectedField && { disabled: true }} onCancel={handleCancel}>
                <div>
                  <h3>Please select which field you would like to add conditions:</h3>
                  <Checkbox.Group
                    options={fields.filter((field) => field.field_type !== 'textarea').map((field) => field.key)}
                    value={selectedField || []}
                    disabled={disabled}
                    onChange={handleFieldSelect}
                  />
                </div>
                {selectedField && (
                  <div>
                    <h3>Please select to which options you want to add condition:</h3>
                    <Checkbox.Group
                      options={fields.filter((field) => field.key === selectedField[0])[0]?.options.map(([index, value]) => ({
                        label: value,
                        value: index,
                      }))}
                      onChange={onCheckboxChange}
                    />
                  </div>
                )}
              </Modal>
            </Form.Item> : null)}
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
        <Button type="primary" onClick={copyToClipboard} style={{ marginRight: '12px' }}>Copy to clipboard</Button>
        <Button type="primary"
          style={{ paddingBottom: '12px' }}
          onClick={() => setCopyModalOpen(true)}>
          Copy from existing note type
        </Button>
        <Modal open={copyModalOpen}
          footer={null}
          onCancel={() => setCopyModalOpen(false)}>
          <CopyNoteTypeModal setText={setJsonText} onSubmit={onJsonModalSubmit} jsonText={jsonText}></CopyNoteTypeModal>
        </Modal>
      </Form>
    </div>
    {fields.length ? <div className="actions-container">
      <div style={{
        width: '500px', paddingBottom: '12px', paddingTop: '12px', fontWeight: 'bold',
      }}>Actions:</div>
      <div className="form-actions-container">
        <div className="actions-control-container" style={{ display: 'flex' }}>
            Edit field  {editInputElement} <Button type="primary" onClick={onEditButtonClick}>Go</Button>
        </div>
        <div className="actions-control-container" style={{ display: 'flex' }}>
            Switch b/w fields {switchInputElement1} and {switchInputElement2} <Button type="primary" onClick={onSwitchButtonClick}>Go</Button>
        </div>
      </div>
    </div> : null}

    <div style={{ color: 'red', fontSize: '20px', paddingTop: '20px' }}>*Please note that the fields order is important: it has to be the same order the fields are shown in the EHR*</div>
  </div>
  );
};
export default FieldCreatorForm;
