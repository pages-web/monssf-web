const NewsDetailPage = async ({ params }: { params: { id: string } }) => {
  const { articleDetail } = await getArticleDetail();

  return <div className="">DetailaPage {params.id}</div>;
};

export default NewsDetailPage;

const getArticleDetail = async () => {
  return { articleDetail: {} };
};
