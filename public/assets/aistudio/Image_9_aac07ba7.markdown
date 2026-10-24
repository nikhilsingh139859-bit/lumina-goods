---
name: Lumina Goods
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#bdc2ff'
  on-tertiary: '#131e8c'
  tertiary-container: '#7c87f3'
  on-tertiary-container: '#081486'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e0e0ff'
  tertiary-fixed-dim: '#bdc2ff'
  on-tertiary-fixed: '#000767'
  on-tertiary-fixed-variant: '#2f3aa3'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: 0em
  title-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.12em
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an experimental, neo-brutalist tech-lifestyle boutique. It departs from conventional warm commercial templates by placing curated physical objects into an ultra-technical, pitch-dark digital sanctuary. The aesthetic fuses surgical laboratory instrumentation with high-fashion hardware curation.

The visual style is characterized by pure right angles (0px radius), razor-sharp monochromatic structural dividers, high-density monoline framing, and an electric indigo glow (`#6366F1`) cutting across deep obsidian fields. The experience evokes the feeling of configuring next-generation hardware through an advanced digital terminal—austere, calculated, and uncompromisingly modern.

## Colors

The palette operates in strict dark mode, anchored by deep slate-carbon foundations and illuminated by radiant electric indigo:

- **Primary (`#6366F1`)**: A technical electric indigo used for focal action triggers, high-priority status indicators, active selections, and interactive terminal highlights.
- **Secondary (`#10B981`)**: An industrial laser emerald utilized strictly for inventory availability confirmation, purchase completion, telemetry verification, and cart badge states.
- **Tertiary (`#818CF8`)**: A desaturated violet-indigo utilized for subtle technical metadata tags, secondary hover states, and monoline wireframe overlays.
- **Neutral Foundation (`#09090B`)**: An obsidian black substrate layered with stepped neutral tiers (`#121216`, `#18181B`, `#27272A`) to define sharp panels without relying on ambient lighting.
- **Text & Accents**: High-contrast cold zinc (`#FAFAFA`) for critical titles, muted technical grey (`#A1A1AA`) for descriptive specs, and dark structural strokes (`#27272A`).

## Typography

The typographic hierarchy pairs the brutalist, architectural geometry of `Space Grotesk` with the hyper-precise, digital legibility of `Geist`. 

- **Display & Headlines (`Space Grotesk`)**: Rendered with tight tracking and condensed vertical rhythm. Headlines project mechanical confidence, turning product specifications and category headers into structural graphic elements.
- **Body & Utility (`Geist`)**: Used for product descriptions, telemetry data, pricing matrices, and control interfaces. Its rational, neutral rhythm ensures effortless reading on high-density data sheets.
- **Labels & Micro-copy**: Styled in uppercase with wide tracking (`0.08em` to `0.12em`) to mirror technical serial numbers and precision calibration stamps.

## Layout & Spacing

Layouts follow an uncompromising modular grid with visible structural boundaries. Screen boundaries align to a 12-column dynamic framework:

- **Desktop (1024px+)**: 12 columns, `gutter-lg` (2rem), `margin-lg` (3.5rem). Modules lock together with shared borders rather than floating margins.
- **Tablet (768px - 1023px)**: 8 columns, `gutter-md` (1.5rem), `margin-md` (2rem). Secondary product telemetry collapses into switchable horizontal panels.
- **Mobile (< 768px)**: 4 columns, `gutter` (1rem), `margin` (1rem). Grid items stack vertically into high-density full-bleed edge rows.

Spacing is calculated strictly along a base-4 metric, prioritizing compact density over sprawling whitespace to maintain an engineered, tactical posture.

## Elevation & Depth

This design system rejects conventional diffused drop shadows and faux blur effects in favor of raw architectural layering and sharp linear boundaries:

- **Surface Tiers**: Base depth is established via strict solid fills: Canvas (`#09090B`), Inset Surface (`#121216`), Base Container (`#18181B`), and Elevated Inspector Card (`#222226`).
- **High-Contrast Monoline Borders**: Every card, module, and table is encased in a 1px solid stroke of `#27272A`. Focused or active components shift their border to `#6366F1` or `#10B981`.
- **Hard Technical Cast Shadows**: When elevation is demanded for interactive dropdowns or modals, offset hard shadows are utilized: `4px 4px 0px 0px #000000` or an electric neon offset `2px 2px 0px 0px #6366F1`. No ambient blur is permitted.

## Shapes

The shape hierarchy is completely orthogonal. The radius is fixed at `0px` across every component in the interface:

- Buttons, cards, modals, avatar containers, tags, and inputs are manufactured with strictly sharp 90-degree corners.
- Micro-elements such as checkboxes, pills, indicators, and image frames must not soften edges or apply curvature.
- Visual interest is generated through chamfered cut-outs, grid intersections, crosshair notches, and alternating hairline borders rather than rounded bevels.

## Components

### Buttons
- **Primary CTA**: Solid `#6366F1` background, `#FFFFFF` Space Grotesk uppercase text, 0px border radius, 1px solid `#818CF8` highlight border. Hover triggers a negative inversion or a 2px hard black drop shadow.
- **Secondary CTA**: Transparent background, 1px solid `#27272A`, `#FAFAFA` text. Hover transitions border to `#6366F1` with an internal tint of `rgba(99, 102, 241, 0.08)`.
- **Technical Action (Cart/Buy)**: Emerald `#10B981` accents indicating inventory readiness, coupled with mono-spaced numeric pricing.

### Cards & Product Frames
- Containers feature pure `#18181B` fill, wrapped in a 1px stroke of `#27272A`.
- Product images are treated with cool, neutral dark backgrounds, surrounded by hair-thin inner framing with technical corner registration marks (`+` or `L` markers in the upper and lower corners).

### Chips & Badges
- Sharp rectangular enclosures. In-stock indicators pair an emerald square dot (`#10B981`, 6px x 6px) with Geist mono-style uppercase text.
- Spec labels utilize `#121216` background with `#A1A1AA` text and a 1px solid border.

### Inputs & Selectors
- Text fields utilize a sunken background (`#09090B`), 1px solid border (`#27272A`), and sharp zero-radius geometry.
- Active states feature a 1px solid `#6366F1` outline with zero blur. Placeholder text is rendered in `#52525B`.

### Lists & Tables
- Inventory and specifications are rendered as dense technical specification sheets. Rows are separated by 1px solid `#27272A` dividers with alternating row tinting on hover.