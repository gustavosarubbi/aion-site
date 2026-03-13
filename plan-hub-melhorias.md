# Plano de Modificações no Hub

## 1. HubInnerCore.tsx - Hexágono Gigante + Neon Intensificado

### Alterações:
- **Hexágono Central**: Substituir o ícone de diamantes empilhados por um hexágono SVG grande (80x80px, 100x100px em md)
- **Camadas do Hexágono**: 3 camadas concêntricas de hexágonos com opacidades decrescentes (90%, 70%, 50%)
- **Linhas Radiais**: Adicionar linhas conectando o centro aos 6 vértices do hexágono
- **Ponto Central**: Círculo pulsante no centro
- **Neon Intensificado**:
  - Borda principal: `rgba(34, 211, 238, 0.8)` (era 0.6)
  - Box-shadow: Aumentar para `0 0 20px/40px/60px` com opacidades 0.4/0.2/0.1
  - Anéis decorativos: Aumentar opacidade de 0.25/0.15 para 0.6/0.4
  - Text-shadow do "HUB": Aumentar para `0 0 8px, 0 0 16px`

## 2. HubGeometricRings.tsx - Anéis Adicionais + Neon

### Alterações:
- **Anéis Rotativos Adicionais**: Adicionar 2-3 anéis extras com diferentes velocidades e direções
- **Intensificar Cores**:
  - Ticks principais: `rgba(34, 211, 238, 0.8)` → `0.95`
  - Ticks secundários: `rgba(34, 211, 238, 0.3)` → `0.6`
  - Círculos externos: Aumentar opacidades em 50-100%
- **Novos Anéis**:
  - Anel tracejado rápido (sentido horário, 12s)
  - Anel pontilhado médio (sentido anti-horário, 18s)
  - Anel sólido lento (sentido horário, 30s)

## 3. HubOrbitals.tsx - Anéis Orbitais Extras

### Alterações:
- **Anéis Adicionais**:
  - Quarto anel: raio 28, cor cyan/blue, velocidade 18s
  - Quinto anel: raio 22, cor cyan claro, velocidade 12s (sentido oposto)
- **Intensificar Neon**:
  - Aumentar opacidades dos strokes de 0.24/0.2 para 0.6/0.5
  - Adicionar glow suave nos anéis

## 4. CentralHub.tsx - Camadas Neon Intensificadas

### Alterações:
- **Torus Effect**:
  - Camada 1: Aumentar opacidade da borda de 0.5 para 0.8, glow de 0.2 para 0.4
  - Camada 2: Aumentar opacidade de 0.3 para 0.6
  - Camada 3: Aumentar opacidade de 0.4 para 0.7
  - Camada 4: Aumentar opacidade de 0.25 para 0.5
  - Camada 5: Aumentar opacidade de 0.15 para 0.35
- **Anéis Volumétricos**: Aumentar opacidades base em todas as camadas em ~50%

## Performance Considerações:
- Usar `willChange: "transform"` em elementos animados
- Animações via CSS `transform` e `opacity` (GPU accelerated)
- Manter uso de `translateZ(0)` para forçar layerização
- Não usar blur effects pesados nos anéis rotativos
- Limitar a 8-10 anéis totais para não sobrecarregar

## Arquivos a Modificar:
1. `src/components/hub/HubInnerCore.tsx`
2. `src/components/hub/HubGeometricRings.tsx`
3. `src/components/hub/HubOrbitals.tsx`
4. `src/components/hub/CentralHub.tsx`
