import { Avatar, type AvatarProps } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

type AvatarPlaceholderProps = AvatarProps;

export function AvatarPlaceholder(props: AvatarPlaceholderProps) {
    return (
        <Avatar
            size={160}
            radius={999}
            color="brand"
            variant="light"
            {...props}
        >
            <IconUserCircle size={72} stroke={1.4} />
        </Avatar>
    );
}
