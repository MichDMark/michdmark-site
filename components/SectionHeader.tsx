import { Stack, Text, Title, type MantineSpacing } from "@mantine/core";

interface SectionHeaderProps {
    title: string;
    description?: string;
    mb?: MantineSpacing;
}

export function SectionHeader({
    title,
    description,
    mb = "xl",
}: SectionHeaderProps) {
    return (
        <Stack component="header" gap="xs" mb={mb}>
            <Title order={2} c="gray.0">
                {title}
            </Title>

            {description && (
                <Text c="gray.5" maw={720} lh={1.7}>
                    {description}
                </Text>
            )}
        </Stack>
    );
}
