export const EchoConfig = {
  supervision: {
    style_component: '#e-supervision-button {font-weight: bold;border: 0;color: white;cursor: pointer !important; display: flex; padding: 10px; } #supervision-component {height: 100%; margin-top: 40px}',
    main_screen_selector: 'div[class*=\'Layout__content___\']',
    menu_element_selector: 'div[class*=\'NavItemList__navItemList\']',
    button_to_clone_selector: 'div[class*=\'NavItemContent__navItem\']:not(div[class*=\'NavItemContent__navItemActive\'])',
  },
  feature_flags: {
    use_note_discrepancy: true,
    use_bi_directional_note: true,
  },
  submit_button: '[role=\'button\']:has(span:contains(Save))',
  progress_notes: [
    {
      type: '',
      context: 'button[class*=\'v-nativebutton-echotabsheet-tabitem-selected\']:has(span:contains(Progress Note))',
      category: 'notes',
      report_fields: {},
      is_note_signed: 'section[class*=\'SignableModalContent__\'], span[class*=\'ContextBar__chip___\']:contains(Signed)',
      parent_selector: 'div.v-slot.v-slot-echotabsheet-tabbar',
    },
  ],
  session_analytics: {
    parent_selector: 'div.v-slot.v-slot-echotabsheet-tabbar',
  },
};
