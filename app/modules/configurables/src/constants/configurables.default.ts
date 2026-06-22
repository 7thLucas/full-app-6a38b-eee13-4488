/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  gameTitle: string;
  gameSubtitle: string;
  playerXLabel: string;
  playerOLabel: string;
  resetButtonLabel: string;
  showScoreboard: boolean;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "XOGame",
  logoUrl: "",
  brandColor: {
    // Base
    background:        "#FFFFFF",
    foreground:        "#0F172A",
    // Card
    card:              "#FFFFFF",
    cardForeground:    "#0F172A",
    // Popover
    popover:           "#FFFFFF",
    popoverForeground: "#0F172A",
    // Primary
    primary:           "#1D4ED8",
    primaryForeground: "#FFFFFF",
    // Secondary
    secondary:           "#F1F5F9",
    secondaryForeground: "#0F172A",
    // Muted
    muted:           "#F8FAFC",
    mutedForeground: "#64748B",
    // Accent
    accent:           "#DBEAFE",
    accentForeground: "#1E40AF",
    // Destructive
    destructive:           "#EF4444",
    destructiveForeground: "#FFFFFF",
    // Border / Input / Ring
    border: "#E2E8F0",
    input:  "#E2E8F0",
    ring:   "#1D4ED8",
    // Charts
    chart1: "#1D4ED8",
    chart2: "#DBEAFE",
    chart3: "#1E40AF",
    chart4: "#64748B",
    chart5: "#EF4444",
    // Navbar
    navbarBackground: "#FFFFFF",
    // Sidebar
    sidebarBackground:        "#F8FAFC",
    sidebarForeground:        "#0F172A",
    sidebarPrimary:           "#1D4ED8",
    sidebarPrimaryForeground: "#FFFFFF",
    sidebarAccent:            "#DBEAFE",
    sidebarAccentForeground:  "#1E40AF",
    sidebarBorder:            "#E2E8F0",
    sidebarRing:              "#1D4ED8",
  },
  font: {
    headingFont: "Space Grotesk",
    textFont: "Inter",
  },
  // ── XOGame ──────────────────────────────────────────────────────────
  gameTitle: "XOGame",
  gameSubtitle: "Classic 5x5 Tic Tac Toe",
  playerXLabel: "Player X",
  playerOLabel: "Player O",
  resetButtonLabel: "New Game",
  showScoreboard: true,
};
