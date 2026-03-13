# Design System Reference Index

Guia rápido de referências para melhorias em projetos Next.js/Tailwind.

---

## Bibliotecas de UI Premium

### Aceternity UI
- **Foco**: Backgrounds dinâmicos e efeitos neon
- **Repo**: https://github.com/mannupaaji/aceternity-ui
- **Site**: https://ui.aceternity.com
- **Instalação**: Templates prontos em https://ui.aceternity.com/templates
- **Componentes essenciais**: Aurora Background, Background Beams, 3D Card, Text Generate Effect
- **Uso**: Copiar do site ou instalar templates completos

### Magic UI
- **Foco**: Componentes interativos e efeitos de brilho (glow)
- **Repo**: https://github.com/magicuidesign/magicui
- **Site**: https://magicui.design
- **Instalação**: `pnpm dlx shadcn@latest add @magicui/[component-name]`
- **Componentes essenciais**: Magic Card, Shine Border, Neon Gradient Card, Particles
- **Compatibilidade**: Shadcn CLI 3.0

### Cult UI
- **Foco**: Animações de vanguarda e micro-interações
- **Repo**: https://github.com/nolly-studio/cult-ui
- **Site**: https://cult-ui.com
- **Instalação**: `npx cult-ui@latest add [component-name]`
- **Componentes essenciais**: Dynamic Island, Animated Number, Dock (macOS-style)
- **Stack**: Motion (Framer Motion v12+), Tailwind v4

---

## Dashboards & Dados

### Tremor
- **Foco**: Gráficos técnicos e dashboards (trading/financeiro)
- **Repo**: https://github.com/tremorlabs/tremor
- **Site**: https://tremor.so
- **Instalação**: `npm install tailwind-variants clsx tailwind-merge @remixicon/react`
- **Componentes essenciais**: AreaChart, BarChart, SparkAreaChart, DonutChart
- **Demo**: https://dashboard.tremor.so/

---

## Templates & Estrutura

### Cruip
- **Foco**: Estrutura SaaS e organização de pastas
- **Org**: https://github.com/cruip
- **Templates principais**:
  - Open React Template (landing pages)
  - Simple Light Landing (SaaS minimalista)
  - Mosaic Dashboard (admin dashboard)
- **Instalação**: `pnpm install && pnpm dev`
- **Stack**: Next.js + Tailwind v4
- **Documentação**: https://cruip.com/docs/

### AstroWind
- **Foco**: Performance e SEO (Lighthouse otimizado)
- **Repo**: https://github.com/onwidget/astrowind
- **Stack**: Astro 5 + Tailwind 3.4
- **Instalação**: `npm create astro@latest -- --template arthelokyo/astrowind`
- **Uso em Next.js**: Adaptar padrões de widgets e SEO

### Shadcn Taxonomy
- **Foco**: Padrões Next.js App Router
- **Repo**: https://github.com/shadcn-ui/taxonomy
- **Demo**: https://tx.shadcn.com
- **Features**: Auth (NextAuth), Database (Prisma), Subscriptions (Stripe)
- **Uso**: Referência para estrutura de projetos completos

---

## Sistema Base

### Shadcn UI
- **Repo**: https://github.com/shadcn-ui/ui
- **Filosofia**: Open Code - componentes no seu projeto
- **CLI**: `pnpm dlx shadcn@latest init`
- **Adicionar componente**: `pnpm dlx shadcn@latest add [component]`
- **Documentação**: https://ui.shadcn.com/docs

---

## Stack Principal

```
Framework: Next.js 15 (App Router)
Styling: Tailwind CSS v4
Language: TypeScript
Animation: Framer Motion (Motion)
Primitives: Radix UI
Package Manager: pnpm (recomendado)
```

---

## Padrões Comuns

### Landing Page Sections
1. Hero Section (valor + visual)
2. Features Grid (ícones + descrição)
3. Social Proof (logos/testimonials)
4. Pricing Table (monthly/yearly toggle)
5. FAQ Accordion
6. CTA Final
7. Footer

### Estrutura de Pastas Recomendada
```
app/
├── (marketing)/          # Route group
├── (auth)/
├── (dashboard)/
├── api/
components/
├── ui/                   # shadcn components
├── widgets/              # landing sections
├── layout/
lib/
├── utils.ts              # cn() helper
├── constants.ts
public/
├── images/
content/                  # MDX (se usar blog)
```

---

## Comandos Rápidos

```bash
# Iniciar projeto com shadcn
pnpm dlx shadcn@latest init

# Adicionar componentes shadcn
pnpm dlx shadcn@latest add button card dialog

# Adicionar Magic UI
pnpm dlx shadcn@latest add @magicui/magic-card

# Adicionar Cult UI
npx cult-ui@latest add [component]

# Instalar Tremor
npm install tailwind-variants clsx tailwind-merge @remixicon/react

# Desenvolvimento
pnpm dev
```

---

## Como Usar Este Índice

Em futuras sessões, mencione este arquivo e peça:
- "Aplique o padrão do Cruip para hero section"
- "Use o Magic Card do Magic UI"
- "Implemente gráficos do Tremor"
- "Siga a estrutura do Shadcn Taxonomy"

Ou peça: "Leia DESIGN_INDEX.md e sugira melhorias para [feature específica]"

---

## Atualização

Para atualizar este índice com novos componentes:
1. Adicione à seção correspondente
2. Inclua comando de instalação
3. Liste componentes essenciais

Última atualização: 2025-03-13
