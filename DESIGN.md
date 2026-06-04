# Harmony — Design System

Anchored on **wa.gov.au** so the platform reads as a genuine WA Government service.
Implemented in `src/styles/gov.css` (design tokens + components). Keep new UI consistent with this.

## Palette
| Token | Value | Use |
|---|---|---|
| `--charcoal` | `#2d2d2d` | header + footer bars |
| `--accent` | `#C8451E` | WA terracotta — emphasis words, primary CTAs, active nav |
| `--ink` | `#1a1a1a` | bold headings |
| `--body` | `#444` | body text |
| `--divider` | `#e0e0e0` | hairline borders |
| `--surface-alt` | `#f4f4f4` | value-stream + table headers |
| `--green` / `--amber` / `--red` | status | certified / conditions / remediate |

## Type
Heavy humanist sans for headings (system stack: `-apple-system, "Segoe UI", system-ui …`), regular body.
Monospace (`--mono`) only for the MCP terminal and policy text.

## Layout
- **Header** (`.gv-top`): charcoal bar, crest + "Harmony / Office of Digital Government" wordmark (left), utility links + search (right).
- **Primary nav** (`.gv-nav`): white bar, dark links, terracotta underline on the active item.
- **Body** (`.gv-body` + `.gv-wrap`): max-width 1080px, generous whitespace.
- **Footer** (`.gv-foot`): charcoal, **Acknowledgement of Country** + the **data-sovereignty disclaimer** (`.sov`) + Terms/Privacy/About + "Concept prototype" mark.

## Principles
- Crisp, clean, data-rich but uncluttered. No boxed-border AI slop. Whitespace first.
- The data-sovereignty disclaimer appears in the footer on **every** surface.
- Marked a **hackathon concept prototype** — never impersonate a live government service.
