import CercaProntaPage from "../../pages/CercaProntaPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CercaProntaPage slug={slug} />;
}
