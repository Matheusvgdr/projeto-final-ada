# 🚀 Projeto Ada

Este é um projeto desenvolvido com Angular 19, utilizando TailwindCSS para estilização, PrimeNG para componentes visuais e NgRx para gerenciamento de estado. O objetivo é fornecer uma base moderna e escalável para aplicações web.

## 📦 Tecnologias Utilizadas

- **Angular 19** – Framework principal
- **NgRx Store** – Gerenciamento de estado reativo
- **PrimeNG** – Biblioteca de componentes UI
- **TailwindCSS** – Estilização utilitária
- **ScrollReveal** – Animações de entrada
- **Lucide Angular** – Ícones modernos
- **JSON Server** – API fake para desenvolvimento
- **Ngx-Mask** – Máscaras de input


## 📁 Estrutura Esperada

O projeto segue a estrutura padrão do Angular CLI, com separação clara de módulos, componentes, serviços e estados.

## 🧪 Testes

Os testes são escritos com Jasmine e executados via Karma. Para rodar os testes:

```bash
npm test
```

## Simulando o backend com JSON-Server

O projeto utiliza o **json-server** para simular a API de produtos e reviews.

### Executando

O `json-server` já está listado nas dependências do projeto. Então para executar basta rodar o comando

```bash
npx json-server db.json

```
