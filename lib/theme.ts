import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  primaryShade: 6,
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
    cyan: [
      "#e8fbff",
      "#c9f5ff",
      "#a0eaff",
      "#79ddf7",
      "#54cce9",
      "#43d9ff",
      "#20a9ce",
      "#1684a3",
      "#10657e",
      "#0b4658",
    ],
  },
});
