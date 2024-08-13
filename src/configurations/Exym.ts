export const exymConfig = {
  feedback: {
    style: {
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
    },
  },
  supervision: {
    style_component: '#e-supervision-button {height: 25px; background-color: #BDCCFF; border: 1px solid #97A4CD}; #supervision-component {margin-top: 40px};',
    main_screen_selector: 'div.exym-secondary-nav',
    menu_element_selector: 'div#header span#mainMenu table.MenuGroup tbody > tr:first',
    button_to_clone_selector: 'table#mainMenu_i0 td.nowrap',
  },
  feature_flags: {
    use_report_service: true,
    use_note_discrepancy: true,
    use_bi_directional_note: true,
  },
  submit_button: 'input[name$=btnSubmitNote]',
  progress_notes: [
    {
      type: 'WellnestReport',
      context: 'table#ctl00_main_note_noteTable:contains(Other Details):contains(Purpose of):contains(Summary of Session):contains(Next Steps)',
      category: 'notes',
      report_fields: {},
      submit_button: 'input[name$=btnSubmitNote]',
      parent_selector: 'div.tabContent:has(div#noteContainer  table[id*=main_note_noteTable]:has(td:contains(Summary of Session))):last p',
      form_note_selector: 'table[id*=main_note_noteTable]',
      eleos_iframe_container_styles: {
        width: '80vw',
      },
    },
  ],
  session_analytics: {
    parent_selector: '',
  },
  alternate_submit_page: 'div#ctl00_main_pnlAddActivityUI',
};
