export const welligentConfig = {
  supervision: {
    style_component: '#e-supervision-button {color: #fff; background-color: #0063ba; border-color: #0055a1; padding-left: 15px;display: inline-flex;padding-top: 3px;}',
    main_screen_selector: '#main-body-content',
    menu_element_selector: '.list-unstyled.list-inline.text-right.text-white',
    button_to_clone_selector: '.list-unstyled.list-inline.text-right.text-white > li',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  hide_launcher: true,
  progress_notes: [
    {
      type: '',
      context: 'title:contains(Session Notes)',
      category: 'notes',
      note_tab: 'a.active:has(span:contains(Enter Notes))',
      report_fields: {},
      submit_button: 'input[name=\'btn_Save\']:contains()',
      is_note_signed: 'td:contains(This note was approved on):last',
      parent_selector: 'table:has(b:contains(\'Progress Note\')):contains():last',
    },
  ],
  session_analytics: {
    with_button: true,
    parent_selector: 'table:has(table:has(a#session-analytics-button)):contains():last()',
  },
};
