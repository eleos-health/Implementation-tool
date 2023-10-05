export const carelogicConfig = {
  consent: {
    learn_more_link: 'https://www.notion.so/eleos/Collecting-Consent-633acb24073f48b38a57fb6f37947739',
    eleos_consent_document_signed: 'tr:has(td:contains(\'Eleos Consent for Video / Audio Recording\')) > td:contains(\'Fully Signed\'):last',
    eleos_consent_document_unsigned: 'tr:has(td:contains(\'Eleos Consent for Video / Audio Recording\')) > td:contains(\'Unsigned\'):last',
  },
  outcomes: {
    page_id: 'caption:contains(\'Client Demographics\')',
    parent_selector: 'iFrame#main_form',
  },
  supervision: {
    style_component: '#e-supervision-button {display: flex; align-items: center}',
    main_screen_selector: '#main_form',
    menu_element_selector: '.navbar ul#main-menu',
    button_to_clone_selector: '#module_501',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  progress_notes: [
    {
      type: '',
      context: 'caption:contains(General Progress Note)',
      page_id: 'General Progress Note',
      category: 'notes',
      report_fields: {},
      submit_button: '#sb_submit',
      is_note_signed: 'td td:has(input:disabled)',
      parent_selector: '#moduleContentBlock',
      with_absolute_position: true,
    },
  ],
};
