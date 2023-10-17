import { Input, Tag } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const OptionsInput = (props: any) => {
  const { optionsHandler } = props;
  const [options, setOptions] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleRemove = (removedOption: string) => {
    const newTags = options.filter((option) => option !== removedOption);
    setOptions(newTags);
    optionsHandler('options', newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && options.indexOf(inputValue) === -1) {
      setOptions([...options, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
    optionsHandler('options', options);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const tagPlusStyle: React.CSSProperties = {
    background: 'rgb(255, 255, 255)',
    borderStyle: 'dashed',
  };

  return <div>
    {options.map((option) => <span key={option} style={{ display: 'inline-block' }}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleRemove(option);
        }}>
        {option}
      </Tag>
    </span>)}
    {inputVisible ? (
      <Input
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    ) : (
      <Tag onClick={showInput} style={tagPlusStyle}>
        <PlusOutlined /> New Tag
      </Tag>
    )}
  </div>;
};

export default OptionsInput;
