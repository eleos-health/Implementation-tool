export const myevolveConfig = {
  consent: {
    learn_more_link: 'https://www.notion.so/eleos/Telehealth-In-Person-Sessions-be43f59c55734b0298899c954698cf4e',
  },
  supervision: {
    style_component: '#e-supervision-button {height: 35px}',
    main_screen_selector: '#MainContent_rmpModules',
    menu_element_selector: '#product-header-button-bar-id',
    button_to_clone_selector: '.list-group-item.product-header-button.product-header-button-callback',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  progress_notes: [
    {
      type: '',
      styles: {
        'margin-top': '10px',
        'margin-bottom': '60px',
      },
      context: 'div div:contains(Psychotherapy Contact Note) iframe[src*=\'Form.aspx\'],iframe[name*=\'Psychotherapy\']:visible',
      category: 'notes',
      report_fields: {},
      note_title: 'Psychotherapy',
      submit_button: 'a[button-id=\'saveform\'\'][title=\'Save\']',
      parent_selector: 'div:contains(\'Summary of Service(s) provided\'):last()',
    },
  ],
  session_analytics: {
    parent_selector: 'div.row:has(div:contains(\'Goal(s)/Objective(s) Addressed\')):contains():last()',
  },
};
