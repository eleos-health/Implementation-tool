import { Field } from '../components/NoteTypeConfigure/NoteTypeConfigure';

const Context: {
  noteTypeName?: string;
  fields?: Array<Field>
} = { };

export const getFields = async () => {
  const data = await (chrome.storage.local.get('reportFields') as any) || [];
  Context.fields = data.reportFields;
  return Context.fields || [];
};

export const updateFields = (fields: Array<Field>) => {
  Context.fields = fields;
  chrome.storage.local.set({ reportFields: fields });
};

export const getNoteTypeName = async () => {
  const data = await (chrome.storage.local.get('reportName') as any) || [];
  Context.noteTypeName = data.reportName;
  return Context.noteTypeName || '';
};

export const setNoteTypeName = (name: string) => {
  Context.noteTypeName = name;
  chrome.storage.local.set({ reportName: name });
};
