export interface IPost {
  _id: string;
  authorKind: string;
  author: {
    _id: string;
    username: string;
    email: string;
    details: {
      fullName: string;
      shortName: string;
      avatar: string;
      firstName: string;
      lastName: string;
      middleName: string;
      __typename: string;
    };
    __typename: string;
  };
  categoryIds: string[];
  categories: {
    _id: string;
    name: string;
    __typename: string;
  };
  featured: boolean;
  status: string;
  tagIds: string[];
  tags: {
    _id: string;
    name: string;
    __typename: string;
  };
  authorId: string;
  createdAt: string;
  excerpt: string;
  content?: any;
  autoArchiveDate: string;
  scheduledDate: string;
  thumbnail: {
    url: string;
    __typename: string;
  };
  title: string;
  updatedAt: string;
  __typename: string;
}
export interface ICategory {
  _id: string;
  clientPortalId: string;
  createdAt: string;
  description: string;
  name: string;
  slug: string;
  status: string;
  parent: {
    _id: string;
    name: string;
    slug: string;
    status: string;
    __typename: string;
  };
  parentId: string;
  __typename: string;
}
