# XOGame — Design Guidelines

## Philosophy
Clean, minimal, game-focused. Bold symbols. Clear grid. No clutter.

## Layout
- Centered single-column layout
- Game board prominently centered on screen
- Status message above board
- Reset button below board
- Responsive: works on mobile and desktop

## Typography
- Heading font: Space Grotesk — bold, modern
- Body font: Inter — clean, readable
- X symbol: large, bold, primary color (#1D4ED8)
- O symbol: large, bold, accent foreground (#1E40AF)

## Grid
- 3x3 grid with clear border lines using border color (#E2E8F0)
- Each cell: large, square, clickable, with hover state
- Cell size: responsive (minimum 80px, ideal 100-120px on desktop)
- Grid lines: 2-3px solid border

## Colors
- Background: white (#FFFFFF)
- Foreground text: dark (#0F172A)
- Primary: blue (#1D4ED8) for X marks and active states
- Accent: light blue (#DBEAFE) for hover states
- Card: white with subtle border for the game board container

## Components
- Game board: card container with grid inside
- Status badge/text: shows turn/winner/draw
- Reset button: primary style, prominent
- Winner highlight: highlight winning cells with accent background

## Elevation
- Board has subtle shadow to lift it off background
- Buttons have clear hover/active states

## Accessibility
- High contrast between symbols and background
- Clear focus states on interactive cells