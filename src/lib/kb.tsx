import { cache } from "react";
import { getClient } from "./client";
import { queries } from "@/graphql/cms";
import {
  gql,
  OperationVariables,
  useQuery,
  type QueryOptions,
} from "@apollo/client";
import { ICategory, IPost } from "./types/cms.types";

const token = process.env.NEXT_PUBLIC_ERXES_APP_TOKEN;

export interface CommonParams {
  variables?: QueryOptions["variables"];
}
export type GetCmsPosts = (params?: CommonParams) => Promise<{
  error_msg: string | undefined;
  postList: any;
  totalPages: number;
  currentPage: number;
}>;

export const getCmsPostList: GetCmsPosts = cache(async (params) => {
  try {
    const client = getClient();

    const { data, error } = (await client.query({
      query: queries.cmsPostList,
      variables: {
        // page: 1,
        // perPage: 20,

        ...params?.variables,
        // clientPortalId: "XavxCsmdYCm0Y48tM-Vxl",
      },
    })) as any;
    return {
      // NB: the gql operation is named `cmsPostList` but its root field is
      // `cpPostList` — read the data from there.
      postList: data?.cpPostList,
      totalPages: Math.ceil((data?.cpPostList?.totalCount || 0) / 20),
      currentPage: data?.cpPostList?.currentPage || 1,

      error_msg: undefined,
    };
  } catch (error: any) {
    console.error("Error fetching CMS posts:", error);
    return {
      postList: null,
      error_msg: error.message,
      totalPages: 0,
      currentPage: 1,
    };
  }
});

export const postDetail = cache(async (id: any) => {
  const CmsPost = await getClient().query({
    query: queries.cmsPostDetails,
    variables: { id },
    context: {
      headers: {
        "x-app-token": token,
      },
    },
  });
  const postDetails = CmsPost?.data?.cmsPost;
  const error_msg = CmsPost?.error?.message;
  return { postDetails, error_msg };
});
export type GetKbPosts = (
  clientPortalId: string,
  params: CommonParams,
) => Promise<{
  currentPage: number;
  totalPages: number;
  totalCount: number;
  error_msg?: string;
  posts: IPost[];
}>;

export type GetKbCategories = (clientPortalId: string) => Promise<{
  error_msg: string | undefined;
  categories: ICategory[];
}>;

export type IAttachment = { url?: string } | null;
