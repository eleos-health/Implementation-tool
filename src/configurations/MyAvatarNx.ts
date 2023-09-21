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
  progress_note: {
    page_id: 'Individual Progress Note',
    report_fields: {
      plan: 'ngx-gridster-item:has(label:contains("Plan (Steps to Achieve by Next Session)")):contains()',
      assessment: 'ngx-gridster-item:has(span:contains("participation and emotional response")):contains()',
      treatment_plan_note: 'ngx-gridster-item:has(span:contains("Comments/Intervention")):contains()',
      progress_toward_goals: 'ngx-gridster-item:has(span:contains("Individual is making progress toward treatment goals and objectives")):contains()',
      participation_appropriate: 'ngx-gridster-item:has(span:contains("session was appropriate")):contains()',
      hide_original_assessment_form: 'div.rad-page:has(span:contains("Assessment")):contains()',
    },
    submit_button: 'input[value="File Note"]',
    parent_selector: 'div.rad-page:has(a:contains("Assessment")):contains()',
  },
  progress_notes: [
    {
      type: 'GaudenziaGroupReport',
      context: 'div.formactivebutton:contains("Group Default Notes")',
      category: 'group-notes',
      report_fields: {
        note: 'ngx-gridster-item:has(label:contains("Note")):contains():last',
      },
      submit_button: 'input[value="File Note"]',
      parent_selector: 'div.rad-page:has(ngx-gridster-item:has(label:contains("Note"))):contains():last',
      eleos_iframe_container_styles: {
        'padding-top': '60px',
      },
    },
    {
      type: 'GaudenziaIndividualGroupReport',
      context: 'div.formactivebutton:contains("Individualize Scratch Note")',
      category: 'group-individual-notes',
      report_fields: {
        data: 'ngx-gridster-item:has(label:contains("DATA")):contains():last',
        plan: 'ngx-gridster-item:has(label:contains("PLAN")):contains():last',
        assessment: 'ngx-gridster-item:has(label:contains("ASSESSMENT")):contains():last',
      },
      submit_button: 'input[value="File Note"]',
      parent_selector: 'ngx-gridster-item:has(label:contains("Note Type")):contains():visible:last',
      eleos_iframe_container_styles: {
        'padding-top': '300px',
      },
    },
    {
      type: '',
      context: 'app-radforms div.col:has(button:contains(Submit)):last  > div:contains(Individual Progress Note)',
      category: 'notes',
      report_fields: {
        plan: 'ngx-gridster-item:has(label:contains("Plan (Steps to Achieve by Next Session)")):contains()',
        assessment: 'ngx-gridster-item:has(span:contains("participation and emotional response")):contains()',
        treatment_plan_note: 'ngx-gridster-item:has(span:contains("Comments/Intervention")):contains()',
        progress_toward_goals: 'ngx-gridster-item:has(span:contains("Individual is making progress toward treatment goals and objectives")):contains()',
        participation_appropriate: 'ngx-gridster-item:has(span:contains("session was appropriate")):contains()',
        hide_original_assessment_form: 'div.rad-page:has(span:contains("Assessment")):contains()',
      },
      submit_button: 'input[value="File Note"]',
      parent_selector: 'div.rad-page:has(a:contains("Assessment")):contains()',
    },
  ],
  session_analytics: {
    parent_selector: 'div.rad-page:has(span:contains("Data")):contains()',
  },
};
