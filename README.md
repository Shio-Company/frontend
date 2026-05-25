# Frontend

Este projeto utiliza React com Vite e foi estruturado seguindo uma arquitetura baseada em **Features (Módulos)**.

## Estrutura de Pastas

- `src/features/`: Contém os domínios de negócio isolados (cada feature tem seus componentes, hooks e chamadas de API).
- `src/pages/`: Contém as páginas da aplicação. Cada página é um diretório que contém um arquivo `index.jsx` (o componente da página) e um arquivo `index.test.jsx` (o teste da página). As páginas são organizadas em subdiretórios `admin`, `public` e `user`.
- `src/components/`: Componentes genéricos e reaproveitáveis de UI (ex: Botões, Modais).
- `src/lib/`: Configurações de bibliotecas externas (ex: Axios, formatadores).
- `src/routes/`: As configurações de rotas da aplicação ainda não foram definidas.
- `src/tests/`: Contém a configuração dos testes. O projeto utiliza `vitest` para testes unitários e de componentes.
- `src/utils/`: Funções utilitárias e globais.

## Como Executar

1. **Instale as dependências:**
   ```sh
   npm install
   ```

2. **Execute o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:5173`.
