import {
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandTiktok,
    IconMail,
    type Icon,
} from "@tabler/icons-react";

export interface SocialLink {
    name: string;
    href: string;
    group: "social" | "contact";
    icon: Icon;
}

export const socialLinks: SocialLink[] = [
    // --- Social / Audiencia ---
    {
        name: "Instagram",
        href: "https://instagram.com/michdmark/",
        group: "social",
        icon: IconBrandInstagram,
    },
    {
        name: "TikTok",
        href: "https://tiktok.com/@michdmark",
        group: "social",
        icon: IconBrandTiktok,
    },
    {
        name: "Facebook",
        href: "https://facebook.com/michdmark2",
        group: "social",
        icon: IconBrandFacebook,
    },

    // --- Contacto / Profesional ---
    {
        name: "Email",
        href: "mailto:michdmark@gmail.com",
        group: "contact",
        icon: IconMail,
    },
    {
        name: "GitHub",
        href: "https://github.com/MichDMark",
        group: "contact",
        icon: IconBrandGithub,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/michel-mujica-02b70462/",
        group: "contact",
        icon: IconBrandLinkedin,
    },
];
