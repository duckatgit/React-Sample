import { Card, Image, Text, Badge, Group } from "@mantine/core";
import { ITemplate, ITemplateDetails } from "../../interfaces";

const TemplateCard = ({
  template,
  thumbnail,
}: {
  template: ITemplateDetails;
  thumbnail?: string;
}) => {
  return (
    <a href={`/menu/${template.id}`}>
      <Card shadow="sm" p="lg" radius="md" withBorder sx={{height:'100%'}}>
        <Card.Section pos="relative">
          <Image src={thumbnail} height={160} alt="Norway" />
          <Badge
            color="orange"
            variant="filled"
            pos="absolute"
            bottom={15}
            left={15}
          >
            Dinner
          </Badge>
        </Card.Section>
        <Text weight={500}>{template.name}</Text>
        <Text size="sm" color="dimmed">
          {template.description}
        </Text>
        Open Template
      </Card>
    </a>
  );
};

export default TemplateCard;
