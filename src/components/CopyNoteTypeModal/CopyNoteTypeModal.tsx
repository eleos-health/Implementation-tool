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
      JSON.parse(value || '{}');
      setIsValid(true);
      setText(JSON.stringify(JSON.parse(value || '{}'), undefined, 4));
    } catch (err) {
      setIsValid(false);
      setError(err);
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
      <div>Invalid JSON Text</div>
      <div>{error}</div>
    </>);

  return <div style={{ height: '470px' }}>
    <h2>Please enter your Note Type text:</h2>
    <div className="note-status">{isValidJsonIndication()}</div>
    <TextArea rows={16} onChange={(e) => onTextChange(e.target.value)} value={jsonText}></TextArea>
    <Button type="primary" onClick={() => onSubmit()} style={{ marginTop: '12px' }}>OK</Button>
  </div>;
};

export default CopyNoteTypeModal;
