import GradilModelPage from "../../pages/GradilModelPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <GradilModelPage slug={slug} />;
}
