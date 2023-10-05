export const kipuConfig = {
  feedback: {
    style: {
      top: '50%',
      left: '50%',
      position: 'fixed',
      transform: 'translate(-50%, -50%)',
    },
  },
  supervision: {
    style_component: '#e-supervision-button {color: black;}',
    main_screen_selector: 'div#container div#main-area',
    menu_element_selector: 'div#container #navigation ul',
    button_to_clone_selector: 'div#container #navigation ul li:not(.active)',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  progress_notes: [
    {
      type: '',
      context: 'div#sub_nav_content div#evaluation:contains(Progress Note-), div#sub_nav_content div#evaluation:contains(DAP Note for Secondary Therapy)',
      category: 'notes',
      report_fields: {},
      submit_button: '.btn.btn-primary:has(span:contains(\'Sign & Submit\')):contains()',
      is_note_signed: 'div.wrap:has(img[alt=\'signature\'])',
      parent_selector: '.patient_evaluation_item:has(div:contains(\'Golden Thread\')):contains()',
      form_note_selector: 'form[action*=patient_evaluations]',
    },
  ],
  session_analytics: {
    parent_selector: 'div.flash-messages',
  },
};
