import React, { Dispatch, SetStateAction, useState } from 'react';
import './CopyNoteTypeModal.css';
import { Button, Input } from 'antd';
import {
  CheckOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

interface CopyModalProps {
  onSubmit: () => void;
  setText: Dispatch<SetStateAction<string>>;
  jsonText: string;
}
const CopyNoteTypeModal = (props: CopyModalProps) => {
  const { onSubmit, setText, jsonText } = props;
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  const onTextChange = (value: string) => {
    try {
      let fields = JSON.parse(value || '{}');
      if (fields.isArray) {
        fields = JSON.parse(value || '{}').map((field, i: number) => {
          field.row_index = i + 1;
          return field;
        });
      }
      setIsValid(true);
      setText(JSON.stringify(fields, undefined, 4));
    } catch (err) {
      setIsValid(false);
      setError(err.message);
      setText(value);
    }
  };

  const isValidJsonIndication = () => (isValid
    ? <>
      <CheckOutlined style={{ color: '#52c41a' }} />
      <div>Valid JSON Text</div>
    </>
    : <>
      <ExclamationCircleOutlined style={{ color: '#F24822' }} />
      <div>Invalid JSON Text:</div>
      <div>{error}</div>
    </>);

  return <div style={{ height: '500px' }}>
    <h2>Please enter your Note Type text:</h2>
    {jsonText && <div className="note-status">{isValidJsonIndication()}</div>}
    <TextArea rows={16} onChange={(e) => onTextChange(e.target.value)} value={jsonText}></TextArea>
    <Button type={isValid ? 'primary' : null} disabled={!isValid} onClick={() => onSubmit()} style={{ marginTop: '12px', cursor: isValid ? 'pointer' : 'not-allowed' }}>OK</Button>
  </div>;
};

export default CopyNoteTypeModal;
