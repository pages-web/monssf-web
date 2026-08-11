import { gql } from "@apollo/client";

/**
 * erxes client-portal field/property queries, reachable with the website's
 * `x-app-token`. Used to render forms whose inputs match what's configured in
 * the admin (Settings → Properties).
 *
 * - `cpFieldGroups` returns the field *groups* for a content type (e.g. the
 *   "Register" group under `core:customer`). Pass
 *   `{ params: { contentType: "core:customer" } }`.
 * - `cpFields` returns the actual input fields that belong to those groups.
 *   `name` = label, `code` = value key. (No `isRequired`/`validation` exposed.)
 */
export const CP_FIELD_GROUPS = gql`
  query CpFieldGroups($params: CpFieldGroupParams) {
    cpFieldGroups(params: $params) {
      _id
      name
      code
      description
      contentType
      order
      logics
      configs
    }
  }
`;

export const CP_FIELDS = gql`
  query CpFields($params: CpFieldsParams) {
    cpFields(params: $params) {
      _id
      type
      order
      name
      code
      groupId
      options {
        label
        value
      }
    }
  }
`;
