import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { FaTiktok, FaFacebook } from "react-icons/fa";

export const socialLinks = [
    // --- Social / Audiencia ---
    {
        name: "Instagram",
        href: "https://instagram.com/michdmark/",
        icon: Instagram,
        group: "social",
    },
    {
        name: "TikTok",
        href: "https://tiktok.com/@michdmark",
        icon: FaTiktok,
        group: "social",
    },
    {
        name: "Facebook",
        href: "https://facebook.com/michdmark2",
        icon: FaFacebook,
        group: "social",
    },

    // --- Contacto / Profesional ---
    {
        name: "Email",
        href: "mailto:michdmark@gmail.com",
        icon: Mail,
        group: "contact",
    },
    {
        name: "GitHub",
        href: "https://github.com/MichDMark",
        icon: Github,
        group: "contact",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/michel-mujica-02b70462/",
        icon: Linkedin,
        group: "contact",
    },
];