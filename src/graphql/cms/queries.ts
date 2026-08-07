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
  query CpCategories($clientPortalId: String) {
    cpCategories(clientPortalId: $clientPortalId) {
      totalCount
      list {
        _id
        name
        slug
        parentId
        status
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

export const cmsMenuList = gql`
  query cmsMenuList($kind: String) {
    cmsMenuList(kind: $kind) {
      _id
      label
      url
      target
      linkType
      kind
      parentId
    }
  }
`;

const queries = {
  cmsPostList,
  cmsPostDetails,
  cmsCategoryList,
  GET_CMS_PARTNERS,
  cmsMenuList,
};

export default queries;
