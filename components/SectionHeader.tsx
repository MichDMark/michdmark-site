import { Stack, Text, Title, type MantineSpacing } from "@mantine/core";

interface SectionHeaderProps {
    title: string;
    description?: string;
    eyebrow?: string;
    mb?: MantineSpacing;
}

export function SectionHeader({
    title,
    description,
    eyebrow,
    mb = "xl",
}: SectionHeaderProps) {
    return (
        <Stack component="header" gap="xs" mb={mb} className="section-heading">
            {eyebrow && <Text className="section-kicker">{eyebrow}</Text>}
            <Title order={1} className="section-title">
                {title}
            </Title>

            {description && (
                <Text className="section-description">
                    {description}
                </Text>
            )}
        </Stack>
    );
}
