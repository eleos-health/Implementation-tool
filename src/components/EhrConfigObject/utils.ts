export const getFieldIdentifier = (ehr: string, title: string) => {
  switch (ehr) {
  case 'carelogic':
    return `tr[class*=container]:has(td:contains(${title || ''}:)):contains():last`;
  case 'myavatarnx':
    return `ngx-gridster-item:has(label:contains(${title || ''})):contains():last`;
  case 'kipu':
    return `.patient_evaluation_item:has(div:contains(${title || ''})):has(textarea):contains()`;
  case 'pce':
    return `tr:has(span:contains(${title || ''})):contains():last`;
  case 'crediblebh':
    return `tr:has(table:has(td:contains(${title || ''})):last) + tr`;
  case 'myevolve':
    return `div.clearfix:has(label[class*='testQuestionLabel']:contains(${title || ''})):contains()`;
  case 'ehana':
    return `tr:has(td:contains(${title || ''})):contains():last`;
  case 'welligent':
    return `tr:has(td:contains(${title || ''})):last()`;
  case 'echo':
    return `[id*='${title || ''}']`;
  case 'smartcare':
    return;
  case 'advencedmd':
    return;
  default:
    return '';
  }
};
