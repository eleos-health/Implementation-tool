export const smartcareConfig = {
  feedback: {
    style: {
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
    },
  },
  supervision: {
    style_component: '#e-supervision-inner {font-size: 1.5rem; margin-left: 5px;} #e-supervision-button {color: var(--shs-clr-8)}; #supervision-component {margin-top: 40px};',
    main_screen_selector: '#DivHTMLWholePage',
    menu_element_selector: 'div.shs-head-right',
    button_to_clone_selector: 'div.shs-ddl-container.shs-head-more-icon',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  submit_button: '#Button_DocumentInformation_Sign',
  progress_notes: [
    {
      type: 'AuroraReport',
      context: '#DivMainPageContent:has(tr:has(span:contains(Individual Service Note))):last',
      category: 'notes',
      report_fields: {},
      parent_selector: 'div.DocumentScreen tr:has(td.height1) + tr:has(span:contains(Safety Plan))',
      form_note_selector: 'div.DocumentScreen table tbody:first',
      eleos_iframe_container_styles: {
        width: '80vw',
      },
    },
  ],
  session_analytics: {
    parent_selector: '',
  },
};
