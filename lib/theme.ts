import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  primaryShade: 6,
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily:
      '"Space Grotesk", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: "700",
  },
  defaultRadius: "md",
  colors: {
    brand: [
      "#fff1f3",
      "#ffe0e6",
      "#ffc0cc",
      "#ff9caf",
      "#ff7893",
      "#f84f73",
      "#e11d48",
      "#be123c",
      "#9f1239",
      "#881337",
    ],
  },
});
