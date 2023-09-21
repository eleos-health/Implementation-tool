export const pceConfig = {
  supervision: {
    style_component: '#e-supervision-button {height: 35px}',
    main_screen_selector: 'body',
    menu_element_selector: 'div.headerNavigationBar',
    button_to_clone_selector: 'a[target="_top"]',
    main_screen_selector_context: 'frame[name="contentFrame"]',
    menu_element_selector_context: 'frame[name="TopFrame"]',
  },
  feature_flags: {
    use_note_discrepancy: true,
  },
  hide_launcher: true,
  progress_note: {
    page_id: 'Progress Note: Narrative',
    report_fields: {
      next_steps: 'tr:has(table:contains("Next Steps")):contains():last',
      wished_dead: 'tr:has(span:contains("In the past few weeks, have you wished you were dead?")):contains():last',
      thoughts_killing: 'tr:has(span:contains("In the past week, have you been having thoughts about killing yourself?")):contains():last',
      risk_factors_radio: 'tr:has(span:contains("Are there any changes in risk factors including self, others, and property?")):contains():last',
      risk_factors_explain: 'tr:has(table:contains("Risk Factors")):contains():last',
      interventions_progress: 'tr:has(table:contains("Interventions and Progress")):contains():last',
    },
    submit_button: 'input[id="saveChanges"]:contains()',
    parent_selector: 'tr:has(span:contains("In the past few weeks, have you wished you were dead?")):contains():last',
    alternate_submit_page: 'frame[name=\'contentFrame\']',
  },
  progress_notes: [
    {
      type: '',
      context: 'div.vScrn_PageContentWIndex:contains(Progress Note: Narrative)',
      category: 'notes',
      content_doc: 'frame[name=\'contentFrame\']',
      top_document: 'frame[name=\'TopFrame\']',
      report_fields: {
        next_steps: 'tr:has(table:contains("Next Steps")):contains():last',
        wished_dead: 'tr:has(span:contains("In the past few weeks, have you wished you were dead?")):contains():last',
        thoughts_killing: 'tr:has(span:contains("In the past week, have you been having thoughts about killing yourself?")):contains():last',
        risk_factors_radio: 'tr:has(span:contains("Are there any changes in risk factors including self, others, and property?")):contains():last',
        risk_factors_explain: 'tr:has(table:contains("Risk Factors")):contains():last',
        interventions_progress: 'tr:has(table:contains("Interventions and Progress")):contains():last',
      },
      submit_button: 'input[id="saveChanges"]:contains()',
      parent_selector: 'tr:has(span:contains("In the past few weeks, have you wished you were dead?")):contains():last',
      alternate_submit_page: 'frame[name=\'contentFrame\']',
    },
  ],
  show_companion: true,
  session_analytics: {
    parent_selector: 'tr:has(table:contains("Goal")):contains():last',
  },
};
