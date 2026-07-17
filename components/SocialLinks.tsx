import { Button, Group, type GroupProps } from "@mantine/core";
import { socialLinks } from "@/data/social";

interface SocialLinksProps extends Omit<GroupProps, "children"> {
    group?: "social" | "contact";
}

export function SocialLinks({
    group,
    gap = "sm",
    ...props
}: SocialLinksProps) {
    const links = group
        ? socialLinks.filter((link) => link.group === group)
        : socialLinks;

    return (
        <Group gap={gap} {...props}>
            {links.map((link) => (
                <Button
                    key={link.name}
                    component="a"
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    variant="light"
                    color={group === "contact" ? "gray" : "brand"}
                    size="xs"
                    radius="md"
                    leftSection={<link.icon size={16} stroke={1.8} />}
                >
                    {link.name}
                </Button>
            ))}
        </Group>
    );
}
