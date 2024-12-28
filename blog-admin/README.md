# Blog Admin Dashboard

Um painel administrativo completo para gerenciar um blog, com área de admin e usuário.

## Tecnologias Utilizadas

- React com TypeScript
- Firebase (Autenticação e Banco de Dados)
- Chakra UI para interface
- React Router para navegação
- React Query para gerenciamento de estado
- React Hook Form para formulários

## Configuração do Projeto

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Crie um projeto no Firebase Console e obtenha as credenciais

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-auth-domain
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── config/        # Configurações (Firebase, etc)
  ├── hooks/         # Custom hooks
  ├── pages/         # Páginas da aplicação
  │   ├── admin/     # Páginas administrativas
  │   └── auth/      # Páginas de autenticação
  ├── services/      # Serviços e APIs
  └── utils/         # Funções utilitárias
```

## Funcionalidades

- ✅ Autenticação de admin e usuário
- ✅ Dashboard administrativa
- ✅ Gerenciamento de artigos
- ✅ Gerenciamento de categorias
- ✅ Gerenciamento de tags
- ✅ Biblioteca de mídia
- ✅ Interface responsiva

## Deploy

O projeto está configurado para deploy na Netlify. Configure as variáveis de ambiente no painel da Netlify antes do deploy.

## Licença

MIT
