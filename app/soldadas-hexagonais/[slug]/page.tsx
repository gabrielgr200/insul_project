import SoldadaHexagonalPage from "../../pages/SoldadaHexagonalPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SoldadaHexagonalPage slug={slug} />;
}
