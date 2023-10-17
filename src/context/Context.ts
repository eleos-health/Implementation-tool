import { Field } from '../components/NoteTypeConfigure/NoteTypeConfigure';

const Context: {
  noteTypeName?: string;
  fields?: Array<Field>
  noteHeadline? :string
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

export const getNoteHeadline = async () => {
  const data = await (chrome.storage.local.get('noteHeadline') as any) || [];
  Context.noteHeadline = data.noteHeadline;
  return Context.noteHeadline || '';
};

export const setNoteHeadline = (headline: string) => {
  Context.noteHeadline = headline;
  chrome.storage.local.set({ noteHeadline: headline });
};
