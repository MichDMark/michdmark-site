import { Anchor } from "@mantine/core";
import Link from "next/link";

export function Logo() {
    return (
        <Anchor
            component={Link}
            href="/"
            aria-label="Ir al inicio"
            title="Ir al inicio"
            underline="never"
            className="brand-link"
        >
            <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark-label">MD</span>
                <span className="brand-mark-contact brand-mark-contact-top" />
                <span className="brand-mark-contact brand-mark-contact-bottom" />
                <span className="brand-mark-trace" />
            </span>
            <span className="brand-name">Mich <span>DMark</span></span>
        </Anchor>
    );
}
