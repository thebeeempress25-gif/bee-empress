# The Bee Empress - Style Guide

## Color Palette

### Primary Colors
- **Honey (Primary Accent)**: `#D69C4A` - Used for CTAs, highlights, and interactive elements
- **Deep Charcoal (Text)**: `#1F2124` - Primary text and important headings
- **Off-White (Background)**: `#FFF9F2` - Main background color

### Secondary Colors
- **Soft Beige (Cards)**: `#F4EDE6` - Card backgrounds and subtle sections
- **Eco Accent**: `#8A9A5B` - Sustainability-related elements

### Usage Guidelines
- Use Honey sparingly for maximum impact on CTAs and important actions
- Deep Charcoal ensures excellent readability
- Off-White creates a warm, premium feel
- Maintain 4.5:1 contrast ratio minimum for accessibility

## Typography

### Font Families
- **Headings**: Playfair Display (Serif)
  - H1: 4-5rem (64-80px) desktop, 3rem (48px) mobile
  - H2: 2.5-3rem (40-48px)
  - H3: 1.5-2rem (24-32px)
  - Weight: 400-700

- **Body**: Inter (Sans-serif)
  - Base size: 16px (1rem)
  - Line height: 1.5 (150%) for body text
  - Line height: 1.2 (120%) for headings
  - Weight: 300-700

- **Labels/Tags**: Inter Condensed or uppercase
  - Size: 0.75-0.875rem (12-14px)
  - Letter spacing: 0.05-0.1em (tracking-wider)
  - Transform: uppercase

## Spacing System

Based on 8px scale:
- **xs**: 8px (0.5rem)
- **sm**: 16px (1rem)
- **md**: 24px (1.5rem)
- **lg**: 32px (2rem)
- **xl**: 48px (3rem)
- **2xl**: 64px (4rem)

### Component Spacing
- Card padding: 24px (1.5rem)
- Section padding: 96px (6rem) top/bottom
- Max content width: 1400px
- Grid gaps: 32px (2rem) desktop, 16px (1rem) mobile

## Buttons

### Primary Button
```css
Background: #D69C4A
Text: #1F2124
Padding: 12-16px vertical, 20-24px horizontal
Border-radius: 10-14px
Hover: Darken to #c28a3a
Shadow: Subtle (0 2px 8px rgba(0,0,0,0.1))
```

### Secondary Button
```css
Background: Transparent
Border: 2px solid #1F2124
Text: #1F2124
Hover: Background #1F2124, Text white
```

### Disabled State
```css
Background: #F4EDE6
Text: #9CA3AF
Opacity: 0.5
Cursor: not-allowed
```

## Cards & Containers

- Border radius: 12-16px for cards, 20-24px for sections
- Shadow (hover): 0 4px 20px rgba(0,0,0,0.08)
- Shadow (default): 0 2px 8px rgba(0,0,0,0.04)
- Background: White or #F4EDE6

## Icons

- Style: Thin-line stroke (1.5-2px)
- Size: 20-24px for UI icons, 28-32px for features
- Color: Inherit from parent or use #D69C4A for accents
- Library: Lucide React

## Responsive Breakpoints

- **Mobile**: 320-480px (1 column)
- **Tablet**: 481-768px (2 columns)
- **Small Desktop**: 769-1024px (3 columns)
- **Desktop**: 1025px+ (4 columns)

### Mobile Rules
- Minimum touch target: 44x44px
- Collapse navigation to hamburger
- Stack layouts vertically
- Increase font sizes for readability

## Animations

### Transitions
- Duration: 200-300ms for UI, 500-700ms for images
- Easing: ease-out or cubic-bezier(0.4, 0, 0.2, 1)

### Hover Effects
- Image zoom: `scale(1.1)` over 500-700ms
- Button: Background color change over 300ms
- Links: Color change over 200ms

### Page Transitions
- Smooth scroll: `scroll-behavior: smooth`
- Fade in: Opacity 0 to 1, translateY(-10px) to 0
- Respect `prefers-reduced-motion`

## Accessibility

- All images have descriptive alt text
- Semantic HTML (nav, header, main, section, footer)
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Focus states visible (2px ring, #D69C4A)
- Contrast ratio: 4.5:1 minimum

## Image Guidelines

### Sources
- Use Pexels stock photos
- Sizes: 2000px minimum width for hero images
- Format: WebP for modern browsers, JPEG fallback
- Lazy loading for offscreen images

### Product Images
- Aspect ratio: 1:1 (square)
- Background: White or #F4EDE6
- Minimum 4-6 images per product
- Include macro/texture shots

## Content Voice

- Tone: Warm, sophisticated, confident
- Style: Sensory language, natural metaphors
- Avoid: Corporate jargon, over-technical terms
- Focus: Benefits over features, storytelling over specs
