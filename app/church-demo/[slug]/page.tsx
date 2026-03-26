
import ChurchDemoPresentation from "@/components/church-demo/ChurchDemoPresentation";

import { getChurchConfig } from "@/lib/church-demo";


export default async function ChurchDemoSlugPage({

  params,

  searchParams

}: {

  params: Promise<{ slug: string }>;

  searchParams: Promise<{ draft?: string }>;

}) {

  const { slug } = await params;

  const query = await searchParams;

  const presetConfig = getChurchConfig(slug);

  const useDraft = query?.draft === "1";


  return (

    <ChurchDemoPresentation

      presetConfig={presetConfig}

      slug={slug}

      useDraft={useDraft}

    />

  );

}

