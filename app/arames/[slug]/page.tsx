import WireProductPage from "../../pages/WireProductPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WireProductPage slug={slug} />;
}
