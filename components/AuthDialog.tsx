import { Modal } from "@mantine/core";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface IAuthDialogProps {
  opened: boolean;
  onClose: () => void;
}

const AuthDialog = ({ opened, onClose }: IAuthDialogProps) => {
  const supabase = useSupabaseClient();

  return (
    <Modal
      opened={opened}
      withCloseButton
      onClose={onClose}
      size="xl"
      radius="md"
    >
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "facebook"]}
        magicLink
      />
    </Modal>
  );
};

export default AuthDialog;
