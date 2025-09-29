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

## 📡 Dependência do Backend (Test API)

Este projeto depende da [API de produtos](https://github.com/Matheusvgdr/api-projeto-final-ada) para funcionar corretamente.  
Certifique-se de iniciar o backend antes de rodar o frontend.

### Executando o backend

Clone o repositório da API e inicie o servidor:

```bash
git clone https://github.com/Matheusvgdr/api-projeto-final-ada.git
cd api-projeto-final-ada
npm install
npm run dev
```