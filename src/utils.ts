import { carelogicConfig } from './configurations/Carelogic';

export const getEhrBasicObject = (ehr) => {
  switch (ehr) {
  case 'carelogic':
    return carelogicConfig;
  default:
    return {};
  }
};
export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export const convertArrayToObject = (arr: Array<object>) =>
// eslint-disable-next-line implicit-arrow-linebreak
  arr.reduce((obj, item: any) => Object.assign(obj, { [item.key]: item.value }), {});
