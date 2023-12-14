export const myAvatarConfig = {
  consent: {
    learn_more_link: 'https://www.notion.so/eleos/Collecting-Client-Consent-24fb987d85af4bb99dc6f6de4f1428c2',
  },
  supervision: {
    style_component: '#supervision-component {padding-top: 40px}',
    main_screen_selector: '.app-body.app-body-scrollbar',
    menu_element_selector: '.nav.navbar-nav.ng-star-inserted',
    button_to_clone_selector: '.app-header .nav-item',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  submit_button: 'input[value=\'File Note\']',
  progress_notes: [
    {
      type: 'GaudenziaGroupReport',
      context: 'div.formactivebutton:contains(\'Group Default Notes\')',
      category: 'notes',
      report_fields: {},
      parent_selector: 'div.rad-page:has(ngx-gridster-item:has(label:contains(\'Note\'))):contains():last',
      eleos_iframe_container_styles: {
        'padding-top': '60px',
      },
    },
  ],
  session_analytics: {
    parent_selector: 'div.rad-page:has(span:contains(\'Data\')):contains()',
  },
};
