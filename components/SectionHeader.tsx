import { Stack, Text, Title, type MantineSpacing } from "@mantine/core";

interface SectionHeaderProps {
    title: string;
    description?: string;
    eyebrow?: string;
    mb?: MantineSpacing;
    connectionSource?: boolean;
}

export function SectionHeader({
    title,
    description,
    eyebrow,
    mb = "xl",
    connectionSource = false,
}: SectionHeaderProps) {
    return (
        <Stack component="header" gap="xs" mb={mb} className="section-heading">
            {eyebrow && <Text className="section-kicker">{eyebrow}</Text>}
            <div className={connectionSource ? "section-title-source" : undefined}>
                <Title order={1} className="section-title">
                    {title}
                </Title>
                {connectionSource && (
                    <span className="connection-origin-port" data-connection-origin-port aria-hidden="true" />
                )}
            </div>

            {description && (
                <Text className="section-description">
                    {description}
                </Text>
            )}
        </Stack>
    );
}
