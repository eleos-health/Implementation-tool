import React, { useEffect, useState } from 'react';
import { Button, Collapse } from 'antd';
import NoteTypeConfigure from '../NoteTypeConfigure/NoteTypeConfigure';
import { getAllNoteTypes, setNewNoteType, removeNoteType as removeStoreNoteType } from '../../context/Context';
import './CollapsedNoteTypes.css';

const CollapsedNoteTypes = () => {
  const [items, setItems] = useState([]);

  const removeNoteType = (index: number) => {
    getAllNoteTypes().then((res) => {
      const noteTypes = res.filter((note, i) => i !== index)
        .map((noteType, newIndex: number) => ({
          key: newIndex,
          label: `Click to view note type: ${noteType.name}`,
          children: <NoteTypeConfigure index={newIndex} onRemove={() => removeNoteType(newIndex)}></NoteTypeConfigure>,
        }));
      setItems(noteTypes);
      removeStoreNoteType(index);
    });
  };

  const addNoteType = () => {
    const item = {
      key: items.length,
      label: 'Click to view note type',
      children: <NoteTypeConfigure index={items.length} onRemove={() => removeNoteType(items.length)}></NoteTypeConfigure>,
    };
    const itemsCopy = [...items];
    itemsCopy.push(item);
    setItems(itemsCopy);
    setNewNoteType();
  };

  useEffect(() => {
    getAllNoteTypes().then((res) => {
      const noteTypes = res.map((noteType, index: number) => ({
        key: index,
        label: `Click to view note type: ${noteType.name}`,
        children: <NoteTypeConfigure index={index} onRemove={() => removeNoteType(index)}></NoteTypeConfigure>,
      }));
      setItems(noteTypes.length ? noteTypes : items);
    });
  }, []);

  return <div>
    <Button className='add-note-type-button' type="primary" onClick={addNoteType}>Add a note type</Button>
    <Collapse items={items} defaultActiveKey={['0']} className={'note-types-collapsed'}></Collapse>
  </div>;
};

export default CollapsedNoteTypes;
