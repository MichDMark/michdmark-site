import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { FaTiktok, FaFacebook } from "react-icons/fa";

export const socialLinks = [
    // --- Social / Audiencia ---
    {
        name: "Instagram",
        href: "https://instagram.com",
        icon: Instagram,
        group: "social",
    },
    {
        name: "TikTok",
        href: "https://tiktok.com/@tuusuario",
        icon: FaTiktok,
        group: "social",
    },
    {
        name: "Facebook",
        href: "https://facebook.com",
        icon: FaFacebook,
        group: "social",
    },

    // --- Contacto / Profesional ---
    {
        name: "Email",
        href: "mailto:hello@example.com",
        icon: Mail,
        group: "contact",
    },
    {
        name: "GitHub",
        href: "https://github.com",
        icon: Github,
        group: "contact",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        icon: Linkedin,
        group: "contact",
    },
];