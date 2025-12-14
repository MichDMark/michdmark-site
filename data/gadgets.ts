export interface Gadget {
    name: string;
    description: string;
    link?: string;
}

export interface GadgetCategory {
    title: string;
    items: Gadget[];
}

export const gadgets: GadgetCategory[] = [
    {
        title: "Workstation",
        items: [
            {
                name: "MacBook Pro 16\"",
                description: "M3 Max, 64GB Unified Memory. The powerhouse.",
            },
            {
                name: "Apple Studio Display",
                description: "27-inch 5K Retina display. Crystal clear text.",
            },
            {
                name: "Keychron Q1 Pro",
                description: "Custom mechanical keyboard with Gateron Oil King switches.",
            },
        ],
    },
    {
        title: "Audio & Video",
        items: [
            {
                name: "Shure SM7B",
                description: "Legendary vocal microphone for streaming and recording.",
            },
            {
                name: "Sony A7IV",
                description: "Main camera for YouTube and photography.",
            },
        ],
    },
    {
        title: "Software",
        items: [
            {
                name: "VS Code",
                description: "My editor of choice with the GitHub Dark theme.",
            },
            {
                name: "Raycast",
                description: "Productivity booster on macOS.",
            },
        ],
    },
];
