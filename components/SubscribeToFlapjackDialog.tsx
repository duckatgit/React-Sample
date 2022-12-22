import { Button, Group, Modal, Text } from "@mantine/core";
import React from "react";
import { useUser } from "../hooks";

interface ISubscribeToFlapjackDialogProps {
  opened: boolean;
  onClose: () => void;
}

const SubscribeToFlapjackDialog: React.FC<ISubscribeToFlapjackDialogProps> = ({
  onClose,
  opened,
}) => {
  const user = useUser();

  const checkout = async () => {
    if (user) {
      fetch("api/checkout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          window.open(data.url, "_blank");
        });
    }
  };

  return (
    <Modal
      opened={opened}
      withCloseButton
      onClose={onClose}
      radius="md"
      centered
    >
      <Text fz="lg" align="center">
        {user
          ? "Purchase the flapjack subscription to access this feature"
          : "Login or SignUp to access this feature"}
      </Text>
      {user && (
        <Group position="center" mt="md">
          <Button onClick={checkout}>Buy</Button>
        </Group>
      )}
    </Modal>
  );
};

export default SubscribeToFlapjackDialog;
