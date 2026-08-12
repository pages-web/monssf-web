import { gql } from "@apollo/client";

export const cmsPostList = gql`
  query PostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus = published
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
    # The API defaults to 20 rows and silently truncates the rest, which
    # hid most of the CMS behind every list on the site. 100 is the max
    # the gateway accepts. Callers can still pass a smaller $limit.
    $limit: Int = 100
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
      limit: $limit
    ) {
      totalCount
      posts {
        _id
        title
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        customFieldsData
        categoryIds
        thumbnail {
          url
        }
        categories {
          _id
          name
        }
        images {
          url
          type
          name
        }
        attachments {
          url
          type
          name
        }
      }
    }
  }
`;

export const cmsPostDetails = gql`
  query Post($id: String, $clientPortalId: String) {
    cpPost(_id: $id, clientPortalId: $clientPortalId) {
      _id
      type
      clientPortalId
      title
      slug
      content
      excerpt
      categoryIds
      status
      tagIds
      authorId
      featured
      featuredDate
      scheduledDate
      autoArchiveDate
      reactions

      reactionCounts
      thumbnail {
        url
        type
        name
        __typename
      }
      images {
        url
        type
        name
        __typename
      }
      video {
        url
        type
        name
        __typename
      }
      audio {
        url
        type
        name
        __typename
      }
      documents {
        url
        type
        name
        __typename
      }
      attachments {
        url
        type
        name
        __typename
      }
      pdfAttachment {
        pages {
          url
          name
          type
          size
          duration
          __typename
        }
        __typename
      }
      videoUrl
      createdAt
      updatedAt
      authorKind
      author {
        ... on User {
          _id
          username
          email
          details {
            fullName
            shortName
            avatar
            firstName
            lastName
            middleName
            __typename
          }
          __typename
        }
        __typename
      }
      categories {
        _id
        name
        slug
        __typename
      }
      tags {
        _id
        name
        __typename
      }
      customFieldsData
      __typename
    }
  }
`;

export const cmsCategoryList = gql`
  query CpCategories($clientPortalId: String, $limit: Int = 100) {
    cpCategories(clientPortalId: $clientPortalId, limit: $limit) {
      totalCount
      list {
        _id
        name
        slug
        parentId
        status
        # Shown as the card body on a parent menu's sub-category cards.
        description
      }
    }
  }
`;

export const GET_CMS_PARTNERS = gql`
  query CmsPosts(
    $clientPortalId: String!
    $categoryId: String!
    $language: String
  ) {
    cmsPosts(
      clientPortalId: $clientPortalId
      categoryId: $categoryId
      language: $language
    ) {
      _id
      title
      thumbnail
      slug
      content
    }
  }
`;

// Navigation menus (Content → Menus in the erxes admin).
//
// NOTE: use `cpMenus`, not `cmsMenuList`. The latter is the admin-side
// query and answers "Login required" when called with the app token,
// which is why the header silently fell back to a hardcoded nav for so
// long. `cpMenus` is the client-portal query and works publicly.
//
// `kind` is "header" or "footer"; `language` mirrors the MN/EN switch
// in the admin.
export const cpMenus = gql`
  query CpMenus($kind: String, $language: String) {
    cpMenus(kind: $kind, language: $language) {
      _id
      label
      url
      target
      kind
      parentId
      order
    }
  }
`;

const queries = {
  cmsPostList,
  cmsPostDetails,
  cmsCategoryList,
  GET_CMS_PARTNERS,
  cpMenus,
};

export default queries;
