import { carelogicConfig } from './configurations/Carelogic';
import { kipuConfig } from './configurations/Kipu';
import { myAvatarConfig } from './configurations/MyAvatarNx';
import { pceConfig } from './configurations/PCE';
import { credibleConfig } from './configurations/Credible';
import { myevolveConfig } from './configurations/Myevolve';
import { ehanaConfig } from './configurations/Ehana';
import { welligentConfig } from './configurations/Welligent';
import { smartcareConfig } from './configurations/Smartcare';
import { advancedmd } from './configurations/Advancedmd';

export const getEhrBasicObject = (ehr: string) => {
  switch (ehr) {
  case 'carelogic':
    return carelogicConfig;
  case 'kipu':
    return kipuConfig;
  case 'myavatarnx':
    return myAvatarConfig;
  case 'pce':
    return pceConfig;
  case 'crediblebh':
    return credibleConfig;
  case 'myevolve':
    return myevolveConfig;
  case 'ehana':
    return ehanaConfig;
  case 'welligent':
    return welligentConfig;
  case 'echo':
    return ehanaConfig;
  case 'smartcare':
    return smartcareConfig;
  case 'advencedmd':
    return advancedmd;
  default:
    return {};
  }
};
export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export const convertArrayToObject = (arr: Array<object>) =>
// eslint-disable-next-line implicit-arrow-linebreak
  arr.reduce((obj, item: any) => Object.assign(obj, { [item.key]: item.value }), {});
