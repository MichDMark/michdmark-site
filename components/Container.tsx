import { Container as MantineContainer, type ContainerProps as MantineContainerProps } from "@mantine/core";
import { ReactNode } from "react";

interface ContainerProps extends MantineContainerProps {
    children: ReactNode;
}

export function Container({ children, size = "lg", px = "md", ...props }: ContainerProps) {
    return (
        <MantineContainer size={size} px={px} {...props}>
            {children}
        </MantineContainer>
    );
}
