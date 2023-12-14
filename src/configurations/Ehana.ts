export const ehanaConfig = {
  supervision: {
    style_component: '.e-supervision-header-tab {padding-right: 4px!important} #e-supervision-button {font-weight: bold;border: 0;color: white;cursor: pointer !important; background: #5A798C;} #supervision-component {height: 1200px; margin-top: 40px}',
    main_screen_selector: 'form#aspnetForm',
    menu_element_selector: 'table.Tab_Horizontal_Tray tbody tr:first',
    button_to_clone_selector: 'td#mainTabReports.tab_horizontal_unselected',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  submit_button: 'a#eHanaFrame_LCtl_WFctl_NextButton',
  progress_notes: [
    {
      type: 'BrooklineReport',
      context: 'td[class=\'Workflow_TOC_NameCell\'] span:contains(Document):contains()',
      category: 'notes',
      report_fields: {},
      parent_selector: 'table:has(div:contains(Case Notes) > span):contains():last',
      service_dropdown: 'select[id=\'eHanaFrame_LCtl_WFctl_WSctl_STStbl_317__STb__STrow0_0_SubTable_Billing Information__STb_PaperContainer-0_Procedure Code\']',
      form_note_selector: '#eHanaFrame_LCtl_WFctl_WSctl_ST_UpdatePanel',
      alternate_submit_page: 'td[class=\'Workflow_TOC_NameCell\'] span:contains(Signoff):contains()',
    },
  ],
  session_analytics: {
    parent_selector: 'tr:has(td:contains(Case Notes)):contains():last',
  },
};
