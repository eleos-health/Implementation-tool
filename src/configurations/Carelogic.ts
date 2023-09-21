export const carelogicConfig = {
  consent: {
    learn_more_link: 'https://www.notion.so/eleos/Collecting-Consent-633acb24073f48b38a57fb6f37947739',
    eleos_consent_document_signed: 'tr:has(td:contains("Eleos Consent for Video / Audio Recording")) > td:contains("Fully Signed"):last',
    eleos_consent_document_unsigned: 'tr:has(td:contains("Eleos Consent for Video / Audio Recording")) > td:contains("Unsigned"):last',
  },
  outcomes: {
    page_id: 'caption:contains("Client Demographics")',
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
      report_fields: {
        overall_progress: 'tr[class*="container"]:has(td:contains("Overall Progress towards Goals and Objectives")):contains():last',
        location_of_service: 'tr[class*="container"]:has(td:contains("Location of Service")):contains():last',
        medication_adherence: 'tr[class*="container"]:has(td:contains("Medication Adherence")):contains():last',
        mental_status_comments: 'tr[class*="container"]:has(td:contains("comments on mental status")):contains():last',
        not_applicable_explain: 'tr[class*="container"]:has(td:contains("Explain Not Applicable answer from previous question")):contains():last',
        client_progress_recovery: 'tr[class*="container"]:has(td:contains("Please rate how you feel you have progressed in your recovery")):contains():last',
        current_living_situation: 'tr[class*="container"]:has(td:contains("Current Living Situation")):contains():last',
        todays_presenting_issues: 'tr[class*="container"]:has(td:contains("Today\'s presenting issues")):contains():last',
        hide_original_report_form: '#frmMain',
        response_to_interventions: 'tr[class*="container"]:has(td:contains("Response to Interventions")):contains():last',
        comments_medical_conditions: 'tr[class*="container"]:has(td:contains("Comments  (Medical Conditions)")):contains():last',
        service_recommendation_plan: 'tr[class*="container"]:has(td:contains("Service Recommendation / Plan")):contains():last',
        has_thoughts_of_causing_harm: 'tr[class*="container"]:has(td:contains("Has individual been having thoughts of causing harm to themselves or someone else?")):contains():last',
        medical_conditions_addressed: 'tr[class*="container"]:has(td:contains("Were any current or ongoing medical conditions addressed in this session?")):contains():last',
        medication_adherence_comments: 'tr[class*="container"]:has(td:contains("comments on medication adherence")):contains():last',
        problems_identified_addressed: 'tr[class*="container"]:has(td:contains("New problems identified are being addressed as part of treatment services")):contains():last',
        out_of_clinic_service_location: 'tr[class*="container"]:has(td:contains("Out-of-Clinic Service Location")):contains():last',
        reviewed_safety_plan_with_consumer: 'tr[class*="container"]:has(td:contains("Reviewed Safety Plan with consumer?")):contains():last',
        additional_information_and_comments: 'tr[class*="container"]:has(td:contains("Additional Information or Comments")):contains():last',
        interventions_during_todays_session: 'tr[class*="container"]:has(td:contains("Interventions during today\'s session")):contains():last',
        has_reason_admitted_since_last_visit: 'tr[class*="container"]:has(td:contains("Since last visit has client been admitted to any of the following for psychiatric reasons?")):contains():last',
        problems_identified_addressed_comments: 'tr[class*="container"]:has(td:contains("new problems will be addressed")):contains():last',
      },
      submit_button: '#sb_submit',
      is_note_signed: 'td td:has(input:disabled)',
      parent_selector: '#moduleContentBlock',
      with_absolute_position: true,
    },
  ],
};
