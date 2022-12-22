import { useRouter } from "next/router";
import Template from "../template";
import { useState } from "react";
import { Drawer, Button, Group, Text, Stack, ScrollArea } from "@mantine/core";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next";
import { ITemplateDetails } from "../../interfaces";
import DrawerHeader from "../../components/TemplateDetail/DrawerHeader";
import DrawerBody from "../../components/TemplateDetail/DrawerBody";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

function TemplateDrawer({
  data: template,
  images,
  drawerOpened,
  setDrawerOpened,
}: {
  data: ITemplateDetails;
  images: string[];
  drawerOpened: boolean;
  setDrawerOpened: (open: boolean) => void;
}) {
  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        lockScroll={false}
        padding="xl"
        position="right"
        size="xl"
        title={<DrawerHeader templateData={template} />}
        withOverlay={false}
        styles={{ drawer: { top: "63px" } }}
      >
        <Stack
          justify={"space-between"}
          style={{ height: "calc(100% - 48px)" }}
          spacing="lg"
        >
          <ScrollArea
            style={{ height: "100%" }}
            type="auto"
            offsetScrollbars
            scrollbarSize={20}
          >
            <DrawerBody images={images} />
          </ScrollArea>
          <Button>Something</Button>
        </Stack>
      </Drawer>
      <Group
        position="center"
        style={{ position: "absolute", top: "17%", zIndex: 9, right: 0 }}
      >
        <Button
          onClick={() => setDrawerOpened(true)}
          color="gray"
          compact
          variant="white"
        >
          <IconChevronLeft />
        </Button>
      </Group>
    </>
  );
}

const Menu = ({
  data,
  images,
}: {
  data: ITemplateDetails[];
  images: string[];
}) => {
  const [drawerOpened, setDrawerOpened] = useState(true);
  return (
    <>
      <Template drawerOpened={drawerOpened} />
      <TemplateDrawer
        data={data[0]}
        images={images}
        drawerOpened={drawerOpened}
        setDrawerOpened={setDrawerOpened}
      />
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);
  const { data } = await supabase
    .from("templates")
    .select("name, description, tags")
    .eq("id", context?.params?.id);

  const { data: images, error } = await supabase.storage
    .from("renderings")
    .list(`${context?.params?.id}`, {
      limit: 6,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  let imageUrls: string[] = [];
  if (images?.length) {
    images.forEach(async (image, i) => {
      const {
        data: { publicUrl: imageUrl },
      } = await supabase.storage
        .from("renderings")
        .getPublicUrl(`${context?.params?.id}/${image.name}`);
      imageUrls.push(imageUrl);
    });
  }
  return {
    props: { data, images: imageUrls }, // will be passed to the page component as props
  };
}

// Need to get this working with getStaticProps

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
// export async function getStaticProps(ctx: GetStaticPropsContext) {
//   console.log(ctx)
//   const supabase = createServerSupabaseClient(ctx)
//   const {data}  = await supabase
//   .from('templates')
//   .select('*')
//   .eq('id', ctx.params.id)

//   return {
//     props: {
//       data,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 10, // In seconds
//   }
// }

// export async function getStaticPaths(ctx: GetStaticPathsContext) {
//   const supabase = createServerSupabaseClient(ctx)
//   const {data}  = await supabase
//   .from('templates')
//   .select('*')
//   console.log(data)

//   // Get the paths we want to pre-render based on posts
//   const paths = data?.map((template) => ({
//     params: { id: template.id },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: 'blocking' }
// }

export default Menu;
