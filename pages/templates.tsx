import React, { useState } from "react";
import TemplateHeader from "../components/TemplateHeader";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import TemplateCard from "../components/TemplateGallery/TemplateCard";
import Link from "next/link";
import { Container, SimpleGrid, Text } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { ITemplateDetails } from "../interfaces/ITemplate";

const Templates = ({
  data: templates,
  thumbnails,
}: {
  data: ITemplateDetails[];
  thumbnails: string[];
}) => {
  const [navMenu, setNavMenu] = useState("templates");
  return (
    <>
      <TemplateHeader setNavMenu={setNavMenu} navMenu={navMenu} />
      <Container p="xs">
        <Text size={32} weight={200} sx={{ marginBottom: "1rem" }}>
          {navMenu === "templates" ? "Templates" : "My Menu"}
        </Text>
        <SimpleGrid cols={3}>
          {templates.map((template: any, i: number) => (
            <TemplateCard
              key={i}
              template={template}
              thumbnail={thumbnails[template.id]}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);
  const { data } = await supabase.from("templates").select("*");

  let { data: folders } = await supabase.storage.from("renderings").list();
  let thumbnails: any = {};
  const images = folders?.forEach(async (folder) => {
    const { data: images } = await supabase.storage
      .from("renderings")
      .getPublicUrl(`${folder.name}/1.jpg`);
    thumbnails[folder.name] = images.publicUrl;
  });
  return {
    props: { data, thumbnails }, // will be passed to the page component as props
  };
}
// NEED TO GET THIS WORKING WITH GETSTATICPROPS
// export async function getStaticProps(context: any) {
//   const supabase = createServerSupabaseClient(context)
//   const { data } = await supabase
//   .from('templates')
//   .select('*')

//   console.log(data)
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default Templates;
