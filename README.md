# 🕐 Relógio Analógico com Canvas 2D

Projeto desenvolvido para a disciplina de **Computação Gráfica**, com o objetivo de aplicar na prática os conceitos de **transformações geométricas 2D** utilizando **HTML5 Canvas e JavaScript**.

---

## 🎯 Sobre o projeto

Este projeto consiste na criação de um **relógio analógico interativo**, com animação em tempo real e aplicação de diversas transformações geométricas.

A ideia foi simular o funcionamento de um relógio real, onde cada elemento (ponteiros, números e estrutura) é desenhado e transformado dinamicamente no canvas.

---

## ⚙️ Tecnologias utilizadas

* HTML5
* JavaScript
* Canvas 2D API

---

## 🧠 Conceitos aplicados

Durante o desenvolvimento, foram utilizados os seguintes conceitos de computação gráfica:

### ✔ Transformações geométricas

* **Translação (`translate`)**
  Utilizada para mover a origem do canvas para o centro do relógio.

* **Rotação (`rotate`)**
  Aplicada nos ponteiros para representar o tempo real.

* **Escala (`scale`)**
  Implementada com interação do usuário (zoom com scroll do mouse).

---

### ✔ Composição de transformações

As transformações são combinadas (ex: `translate + rotate`) para posicionar corretamente os elementos na cena.

---

### ✔ Ponto fixo (pivot)

Os ponteiros giram ao redor do centro do relógio, garantindo uma rotação realista.

---

### ✔ Animação

Utilização de `requestAnimationFrame` para atualização contínua da cena, com reset da matriz a cada frame.

---

### ✔ Gerenciamento de estado

Uso de:

* `ctx.save()`
* `ctx.restore()`
* `ctx.setTransform()`

para evitar interferência entre as transformações.

---

## 🎮 Interatividade

* 🖱️ Scroll do mouse: controla o zoom do relógio

---

## ▶️ Como executar

### 🔹 Opção 1 (simples)

Abra o arquivo `index.html` diretamente no navegador.

---

### 🔹 Opção 2 (recomendado - servidor local)

No terminal:

```bash
npx serve
```

Depois acesse o link exibido (ex: `http://localhost:3000`)

---

## 📁 Estrutura do projeto

```
📦 relogio-canvas
 ┣ 📄 index.html
 ┗ 📄 script.js
```

---

## 💡 Aprendizados

Esse projeto ajudou a entender na prática:

* Como funcionam transformações no Canvas
* A importância da ordem das transformações
* Como animar elementos em tempo real
* Como controlar o estado do contexto gráfico

---

## 🚀 Possíveis melhorias

* Tema escuro/claro
* Efeito de vidro e sombra
* Movimento suave com milissegundos
* Estilização avançada dos ponteiros

---

## 👨‍💻 Autor

Projeto desenvolvido por **Pedro Ayres** como parte de atividade acadêmica.

---

## 📌 Observação

Este projeto foi desenvolvido com fins educacionais, focando na aplicação prática dos conceitos de transformações geométricas em ambientes 2D.
