import React, { useState } from 'react';
import { Button, Checkbox, Modal } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Field } from '../NoteTypeConfigure/NoteTypeConfigure';

interface ConditionalFieldsModal {
    fields: Array<Field>;
    updateFormField: (key: string, value: string | Array<{key: string; values: Array<string>}>) => void;
}
const ConditionalFieldsModal = (props: ConditionalFieldsModal) => {
  const {
    fields, updateFormField,
  } = props;
  const [conditionalField, setConditionalField] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

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

  return <>
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
  </>;
};

export default ConditionalFieldsModal;
