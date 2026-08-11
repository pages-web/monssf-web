import { gql } from "@apollo/client";

/**
 * erxes Forms (lead) widget API.
 * `widgetsLeadConnect` returns the integration + the form's field
 * definitions; `widgetsSaveLead` stores a submission. These are the same
 * operations the embeddable erxes form script uses.
 */
export const WIDGETS_LEAD_CONNECT = gql`
  mutation widgetsLeadConnect($brandId: String!, $formId: String!) {
    widgetsLeadConnect(brandId: $brandId, formId: $formId) {
      integration {
        _id
      }
      form {
        _id
        title
        description
        fields {
          _id
          text
          type
          description
          options
          isRequired
        }
      }
    }
  }
`;

export const WIDGETS_SAVE_LEAD = gql`
  mutation widgetsSaveLead(
    $integrationId: String!
    $formId: String!
    $submissions: [FieldValueInput]
    $browserInfo: JSON!
  ) {
    widgetsSaveLead(
      integrationId: $integrationId
      formId: $formId
      submissions: $submissions
      browserInfo: $browserInfo
    ) {
      status
    }
  }
`;

/**
 * Current erxes Forms API (the one `formBundle.js` from
 * `*.nextwidgets.erxes.io` uses). Connect with the form's CODE + the
 * channel id (from the embed snippet), then submit by the returned form
 * `_id`. Note the signatures differ from the legacy widgets API above:
 *   - connect takes `channelId` + `formCode` (not brandId + formId)
 *   - saveLead takes the form `_id` as `formId` and needs no integrationId
 */
export const FORM_CONNECT = gql`
  mutation widgetsLeadConnect($channelId: String!, $formCode: String!) {
    widgetsLeadConnect(channelId: $channelId, formCode: $formCode) {
      form {
        _id
        title
        description
        fields {
          _id
          text
          type
          description
          options
          isRequired
          order
        }
      }
    }
  }
`;

export const FORM_SAVE_LEAD = gql`
  mutation widgetsSaveLead(
    $formId: String!
    $submissions: [FieldValueInput]
    $browserInfo: JSON!
  ) {
    widgetsSaveLead(
      formId: $formId
      submissions: $submissions
      browserInfo: $browserInfo
    ) {
      status
    }
  }
`;
