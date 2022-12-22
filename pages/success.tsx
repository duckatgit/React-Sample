import { Box, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ICurrentUser } from "../interfaces/ICurrentUser";
import { IProfiles } from "../interfaces/IProfiles";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { loadStripe } from "@stripe/stripe-js";

// @ts-ignore
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const Success = () => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>();
  const [profiles, setProfiles] = useState<IProfiles[] | null>();
  const [isSubscribe, setSubscribe] = useState<boolean>(false);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { success, canceled, session_id } = router.query;

  // GET_CURRENT_PROFILE
  const getUser = async () => {
    const user: any = await supabase.auth.getUser();
    setCurrentUser(user.data.user);
  };
  // ADD_SUBSCRIBER
  const insertSubscriber = async () => {
    try {
      const { error } = await supabase.from("profiles").upsert({
        email: currentUser?.email,
        user_id: currentUser?.id,
        created_at: new Date(),
        subscription: "active",
      });
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };

  // GET_PROFILE
  const getprofiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email, user_id");
      setProfiles(data);
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if ((success !== undefined || canceled !== undefined) && !isSubscribe) {
      if (
        profiles &&
        currentUser &&
        !profiles.some(
          (element: IProfiles) => element.user_id === currentUser?.id
        )
      ) {
        setSubscribe(true);
        insertSubscriber();
      }
      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready.   "
        );
      }
    }
  }, [success, canceled, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      getUser();
    }
    getprofiles();
    setTimeout(function onClose() {
      window.opener = null;
      window.open("", "_self");
      window.close();
    }, 3000);
  }, [currentUser]);

  return (
    <Box
      sx={{
        textAlign: "center",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Title order={2}>Thanks for Subscribe Flapjack</Title>
      <Title order={3}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="#24b663"
          className="bi bi-check"
          viewBox="0 0 16 16"
        >
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </Title>
    </Box>
  );
};

export default Success;
