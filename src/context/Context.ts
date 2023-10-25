import { Field } from '../components/NoteTypeConfigure/NoteTypeConfigure';

const Context: {
  noteTypes?: {name: string, noteHeadline: string, fields: Array<Field>}[] | []
  noteTypeName?: string;
  fields?: Array<Field>
  noteHeadline? :string
} = { };

export const getAllNoteTypes = async () => {
  const data = await (chrome.storage.local.get('noteTypes') as any) || [];
  Context.noteTypes = data.noteTypes;
  return Context.noteTypes || [];
};

export const setNewNoteType = () => {
  const noteTypesCopy = Context.noteTypes;
  if (!noteTypesCopy) {
    Context.noteTypes = [{ name: '', noteHeadline: '', fields: [] }];
  } else {
    // @ts-ignore
    noteTypesCopy.push({ name: '', noteHeadline: '', fields: [] });
    Context.noteTypes = noteTypesCopy;
    chrome.storage.local.set({ noteTypes: noteTypesCopy });
  }
};

export const removeNoteType = (index: number) => {
  const noteTypesCopy = Context.noteTypes;
  Context.noteTypes = noteTypesCopy.splice(index, 1);
  chrome.storage.local.set({ noteTypes: noteTypesCopy });
};

export const getFields = async (index: number) => {
  const data = await (chrome.storage.local.get('noteTypes') as any) || [];
  if (!data.noteTypes) return [];
  Context.fields = data.noteTypes[index] ? data.noteTypes[index].fields : [];
  return Context.fields;
};

export const updateFields = (fields: Array<Field>, index: number) => {
  const noteTypesCopy = Context.noteTypes;
  noteTypesCopy[index].fields = fields;
  Context.fields = fields;
  chrome.storage.local.set({ noteTypes: noteTypesCopy });
};

export const getNoteTypeName = async (index: number) => {
  const data = await (chrome.storage.local.get('noteTypes') as any) || [];
  if (!data.noteTypes) return '';
  Context.noteTypeName = data.noteTypes[index] ? data.noteTypes[index].name : '';
  return Context.noteTypeName;
};

export const setNoteTypeName = (name: string, index: number) => {
  const noteTypesCopy = Context.noteTypes;
  noteTypesCopy[index].name = name;
  Context.noteTypeName = name;
  chrome.storage.local.set({ noteTypes: noteTypesCopy });
};

export const getNoteHeadline = async (index: number) => {
  const data = await (chrome.storage.local.get('noteTypes') as any) || [];
  if (!data.noteTypes) return '';
  Context.noteHeadline = data.noteTypes[index] ? data.noteTypes[index].noteHeadline : '';
  return Context.noteHeadline || '';
};

export const setNoteHeadline = (headline: string, index: number) => {
  const noteTypesCopy = Context.noteTypes;
  noteTypesCopy[index].noteHeadline = headline;
  Context.noteHeadline = headline;
  chrome.storage.local.set({ noteTypes: noteTypesCopy });
};
