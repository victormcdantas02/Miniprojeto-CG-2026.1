# 🕐 Relógio Analógico - Miniprojeto de Computação Gráfica

Um projeto didático para aprender **transformações 2D em Canvas HTML5** através da construção de um **relógio analógico funcional**. O relógio mostra a hora real e demonstra todos os requisitos obrigatórios de forma clara e visual.

---

## 📚 Estrutura de Aprendizado

O projeto é dividido em **etapas progressivas**, permitindo aprender gradualmente:

### **ETAPA 1: Estrutura Básica ✅**
- Desenhar o fundo do relógio (círculo)
- Marcadores de horas (12 marcas)
- Números 1-12
- Conceitos: Translação, Rotação, Save/Restore

### **ETAPA 2: Ponteiros (Implementado) ✅**
- Ponteiro das horas
- Ponteiro dos minutos
- Ponteiro dos segundos
- Conceitos: Rotação com ponto fixo, Composição

### **ETAPA 3: Animação (Implementado) ✅**
- Sincronizar com hora real
- Atualização contínua
- Conceitos: requestAnimationFrame

### **ETAPA 4: Decorações (Bônus - Implementado) ✅**
- Efeito de pulsação
- Hora digital
- Conceitos: Escala dinâmica, Composição

---

## 🎯 Requisitos Obrigatórios Implementados

### ✅ **1. Translação (`ctx.translate`)**

Centra o relógio no canvas:

```javascript
// De: drawClockFace() - Linha 27
ctx.translate(centerX, centerY);
```

**Por que?** O canvas começa em (0,0), mas queremos desenhar o relógio a partir do seu centro (250,250).

### ✅ **2. Rotação (`ctx.rotate`)**

Gira objetos em torno de um ponto:

```javascript
// De: drawHourMarkers() - Linha 62
for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;  // 30 graus
    ctx.rotate(angle);
    // ... desenha a marca
}
```

**Por que?** Cada marca de hora está em uma posição diferente (12, 1, 2... 11).

### ✅ **3. Escala (`ctx.scale`)**

Redimensiona objetos dinamicamente:

```javascript
// De: drawSecondTick() - Linha 201
const pulse = Math.sin((milliseconds / 1000) * Math.PI);
ctx.scale(1 + pulse * 0.05, 1 + pulse * 0.05);
```

**Por que?** Cria um efeito visual de "pulsação" do círculo a cada segundo.

### ✅ **4. Composição de Transformações**

Combina múltiplas operações:

```javascript
// De: drawHand() - Linhas 122-125
ctx.translate(centerX, centerY);  // Move para o centro
ctx.rotate(angle);                 // Gira pelo ângulo
// ... desenha o ponteiro
```

**Sequência:** T → R (Translação depois Rotação) = Girar em torno de um ponto fixo.

### ✅ **5. Rotação com Ponto Fixo (Padrão T → Op → T)**

Os ponteiros giram em torno do centro (ponto fixo):

```javascript
// Em drawHand():
ctx.translate(centerX, centerY);  // T: Mover para o ponto fixo
ctx.rotate(angle);                 // Op: Girar
// Implícito pelo ctx.restore()    // T: (volta ao estado anterior)
```

### ✅ **6. Animação com `requestAnimationFrame`**

Atualiza o relógio continuamente:

```javascript
// De: animate() - Linha 227
function animate() {
    // ... desenha o relógio ...
    requestAnimationFrame(animate);  // Próximo frame (~60 FPS)
}

// A hora real é obtida a cada frame:
const now = new Date();
const hours = now.getHours();
```

**Resultado:** O relógio se atualiza automaticamente a cada frame, sincronizado com a hora real do navegador.

### ✅ **7. Save/Restore - Gerenciamento de Matriz**

Isola transformações para não afetar outros desenhos:

```javascript
// Padrão em TODAS as funções:
ctx.save();
    // ... aplicar transformações ...
ctx.restore();
```

**Benefício:** Cada função é independente. A ação de `translate()` em uma função não afeta a próxima.

---

## 🎨 Como o Relógio Funciona

### Ordem de Desenho (Importante!)

```javascript
animate() {
    1. Limpa canvas
    2. Reseta matriz (setTransform)
    3. drawClockFace()      // Fundo branco
    4. drawHourMarkers()    // 12 marcas
    5. drawSecondTick()     // Efeito de pulsação
    6. drawNumbers()        // Números 1-12
    7. drawHourHand()       // Ponteiro das horas
    8. drawMinuteHand()     // Ponteiro dos minutos
    9. drawSecondHand()     // Ponteiro dos segundos
    10. drawCenterDot()     // Círculo central
    11. drawDigitalTime()   // Hora digital (HH:MM:SS)
}
```

**Regra de Ouro:** Objetos desenhados por último aparecem por cima!

### Cálculo dos Ângulos

Cada ponteiro tem um ângulo diferente baseado na hora:

```javascript
// Ponteiro das horas (12 horas = 360°)
const hours = new Date().getHours() % 12;
const angle = (hours * Math.PI / 6) + (minutes * Math.PI / 360);

// Ponteiro dos minutos (60 minutos = 360°)
const minutes = new Date().getMinutes();
const angle = (minutes * Math.PI / 30) + (seconds * Math.PI / 1800);

// Ponteiro dos segundos (60 segundos = 360°)
const seconds = new Date().getSeconds();
const angle = (seconds * Math.PI / 30) + (milliseconds * Math.PI / 30000);
```

---

## 🚀 Como Executar

```bash
# Opção 1: Abrir diretamente no navegador
open index.html

# Opção 2: Com servidor local (Python)
python -m http.server 8000
# Acesse: http://localhost:8000

# Opção 3: Com servidor local (Node.js)
npx http-server
```

**Resultado:** Um relógio que mostra a hora real, atualizado a cada frame (~60 FPS).

---

## 📐 Conceitos Matemáticos

### Conversão de Tempo em Ângulo

```
Radianos = (valor / máximo) * 2π

Exemplos:
- Hora 3 = (3 / 12) * 2π = π/2 radianos = 90°
- Minuto 15 = (15 / 60) * 2π = π/2 radianos = 90°
- Segundo 30 = (30 / 60) * 2π = π radianos = 180°
```

### Posicionamento Angular no Canvas

```
No Canvas 2D:
- Ângulo 0 = Direita (→)
- Ângulo π/2 = Baixo (↓)  [Note: Y cresce para baixo]
- Ângulo π = Esquerda (←)
- Ângulo 3π/2 = Cima (↑)

Para um relógio (donde 12 horas é cima):
- Subtraímos π/2 do ângulo
- Ou rotacionamos primeiro
```

---

## 🔍 Explorando o Código

### Localizar Cada Requisito

1. **Translação:** Procure por `ctx.translate(`
   - Linhas: 27, 52, 79, 122, 163, 201

2. **Rotação:** Procure por `ctx.rotate(`
   - Linhas: 62, 125, 195

3. **Escala:** Procure por `ctx.scale(`
   - Linha: 205

4. **Save/Restore:** Procure por `ctx.save()` e `ctx.restore()`
   - Em praticamente todas as funções!

### Testar Mudanças

Tente modificar no `script.js`:

```javascript
// Fazer a hora girar 2x mais rápido:
const angle = (hours * Math.PI / 3) + ...  // /6 → /3

// Mudar a cor do ponteiro dos segundos:
drawSecondHand();  // mude '#FF6B6B' para outra cor

// Aumentar o tamanho do relógio:
const radius = 200;  // era 150
```

---

## 📊 Estrutura de Arquivos

```
Miniprojeto-CG-2026.1/
├── index.html          # Interface HTML
├── script.js           # Código Canvas (280+ linhas documentadas)
├── README.md           # Este arquivo
└── REQUISITOS.md       # Mapeamento detalhado dos requisitos
```

---

## 🎓 O Que Você Aprendeu

✅ **Transformações 2D:**
- Como mover (`translate`)
- Como girar (`rotate`)
- Como redimensionar (`scale`)

✅ **Composição:**
- Combinar múltiplas transformações
- Aplicar transformações em sequência

✅ **Animação:**
- `requestAnimationFrame` para loops suaves
- Sincronizar com dados em tempo real

✅ **Gerenciamento de Estado:**
- `save()` e `restore()` para isolar mudanças
- `setTransform()` para resetar

✅ **Matemática:**
- Radianos e conversão de graus
- Trigonometria (sin, cos, atan2)
- Sistemas de coordenadas transformados

---

## 🎯 Próximas Ideias (Futuras Etapas)

- **ETAPA 5:** Interatividade (mudar hora com mouse)
- **ETAPA 6:** Múltiplos fusos horários
- **ETAPA 7:** Animação de inicialização
- **ETAPA 8:** Temas/skins diferentes
- **ETAPA 9:** Som de "tique-taque"
- **ETAPA 10:** Modo 24h / Calendário

---

## 📝 Notas Importantes

### Por que usar `ctx.save()` e `ctx.restore()`?

Sem eles, transformações se acumulam:

```javascript
// ❌ SEM save/restore:
ctx.translate(100, 100);
ctx.rotate(Math.PI/4);
drawHand(...);
// Próxima função também será transladada e rotacionada!

// ✅ COM save/restore:
ctx.save();
ctx.translate(100, 100);
ctx.rotate(Math.PI/4);
drawHand(...);
ctx.restore();
// Próxima função volta ao estado original!
```

### Por que usar `setTransform()` no início?

```javascript
// setTransform(1, 0, 0, 1, 0, 0) = Matriz Identidade
// Reset completo para não haver transformações acumuladas
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

---

## 🔗 Referências

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Canvas Transformations](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#transformations)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

---

**Projeto:** Miniprojeto CG 2026.1 - Relógio Analógico  
**Linguagem:** JavaScript + HTML5 Canvas API  
**Requisitos:** 7/7 ✅  
**Status:** Completo e Funcional
