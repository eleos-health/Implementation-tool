export const credibleConfig = {
  supervision: {
    style_component: '#supervision-component {padding-top: 40px} #e-supervision-button {background: #bbbbbb ; border: 1px solid black; border-radius: 4px; color: white; cursor: pointer}',
    main_screen_selector: 'body',
    menu_element_selector: 'ul.header__nav-menu',
    button_to_clone_selector: 'li.tabs',
    main_screen_selector_context: 'frame[name=\'main\']',
    menu_element_selector_context: 'frame[name=\'banner\']',
  },
  feature_flags: {
    use_note_discrepancy: true,
    use_bi_directional_note: true,
  },
  hide_launcher: true,
  submit_button: 'input[name=\'Complete\']',
  progress_notes: [
    {
      type: 'OpenheartsReport',
      context: 'div.toolHead:has(h1:contains(\'Counseling/Therapy Note\'))',
      category: 'notes',
      report_fields: {},
      parent_selector: 'div.toolHead:has(h1:contains(\'Counseling/Therapy Note\'))',
    },
  ],
  note_types_regex: '.*',
  session_analytics: {
    parent_selector: 'div.toolHead:has(h1)',
  },
};
