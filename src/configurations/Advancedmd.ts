export const advancedmd = {
  feedback: {
    style: {
      top: '50%',
      left: '50%',
      position: 'fixed',
      transform: 'translate(-50%, -50%)',
    },
  },
  supervision: {
    style_component: '',
    main_screen_selector: 'section.amds-tab-content',
    menu_element_selector: 'div.amds-top-menu-items',
    button_to_clone_selector: 'amds-topmenu-item.ng-star-inserted',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  progress_notes: [
    {
      type: 'LifestancetherapyfollowupadultReport',
      context: '[name=\'Session Summary\']:visible span:contains(Location:)',
      category: 'notes',
      report_fields: {},
      iframe_style: {
        height: '1100px',
      },
      submit_button: 'a[title=\'Sign Off on Item\']',
      is_note_signed: '',
      parent_selector: 'span:contains(If visit was performed using Telehealth, informed consent obtained and patient location verified):last',
      form_note_selector: '',
      eleos_iframe_container_styles: {
        'z-index': '1000',
        position: 'relative',
      },
    },
  ],
  session_analytics: {
    parent_selector: '',
  },
};
