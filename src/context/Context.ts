import { Field } from '../components/NoteTypeConfigure/NoteTypeConfigure';

const Context: {
  noteTypeName?: string;
  fields?: Array<Field>
} = { };

export const getFields = () => Context.fields || [];

export const updateFields = (fields: Array<Field>) => {
  Context.fields = fields;
};

export const getNoteTypeName = () => Context.noteTypeName || '';

export const setNoteTypeName = (name: string) => Context.noteTypeName = name;
