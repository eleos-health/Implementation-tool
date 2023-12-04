export const getFieldIdentifier = (ehr: string, title: string, type: string) => {
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
    return type === 'textarea' ? `tr:has(table:has(td:contains(${title || ''})):last) + tr` : `tr:has(table:has(td:contains(${title || ''})):last)`;
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

export const getEhrNoteContextIdentifier = (ehr: string, value: string) => {
  switch (ehr) {
  case 'carelogic':
    return `caption:contains(${value || ''})`;
  case 'myavatarnx':
    return `div.formactivebutton:contains(${value || ''})`;
  case 'kipu':
    return `div#sub_nav_content div#evaluation:contains(Progress Note-), div#sub_nav_content div#evaluation:contains(${value || ''})`;
  case 'pce':
    return `div.vScrn_PageContentWIndex:contains(${value || ''})`;
  case 'crediblebh':
    return `div.toolHead:has(h1:contains(${value || ''}))`;
  case 'myevolve':
    return `div div:contains(${value || ''}) iframe[src*=\\'Form.aspx\\'],iframe[name*=\\'Psychotherapy\\']:visible`;
  case 'ehana':
    return `td[class='Workflow_TOC_NameCell'] span:contains(${value || ''}):contains()`;
  case 'welligent':
    return `title:contains(${value || ''})`;
  case 'echo':
    return `button[class*='v-nativebutton-echotabsheet-tabitem-selected']:has(span:contains(${value || ''}))`;
  case 'smartcare':
    return;
  case 'advencedmd':
    return;
  default:
    return '';
  }
};

export const getParentSelector = (ehr: string, value: string) => {
  switch (ehr) {
  case 'pce':
    return `tr:has(span:contains(${value})):contains():last`;
  default:
    return null;
  }
};
