import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, AppShell } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import theme from "../config/theme";
import Header from "../components/Header";
import "../styles/globals.css";
import { NotificationsProvider } from "@mantine/notifications";
import { hotjar } from "react-hotjar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import UserContextProvider from "../context/UserContext";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    hotjar.initialize(3291123, 6);
  }, []);

  return (
    <>
      <Head>
        <title>Flapjack</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <UserContextProvider>
              <AppShell
                padding={0}
                header={<Header />}
                styles={(theme) => ({
                  main: {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <GoogleAnalytics trackPageViews />
                <Component {...pageProps} />
              </AppShell>
            </UserContextProvider>
          </SessionContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
