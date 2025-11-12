# Meu Site

Um site pessoal com integração de status do Discord em tempo real usando Lanyard API.

## 🚀 Como Rodar

### Desenvolvimento (com hot reload)

```bash
npm run dev
```

Ou duplo-clique em `start-dev.bat`

Acesse: `http://localhost:3000`

### Produção

```bash
npm run build
npm run server
```

Ou duplo-clique em `start.bat`

Acesse: `http://localhost:3001`

## ⚠️ Importante

**NÃO abra o arquivo `index.html` diretamente no navegador** (file://). Isso causará erros CORS.

Você **DEVE** rodar um dos scripts acima para que o site funcione corretamente.

## 📦 Features

- ✨ Status Discord em tempo real (via Lanyard API)
- 🎵 Mostra música tocando no Spotify
- 🎮 Mostra jogo sendo jogado
- 💬 Status personalizado
- 🎨 Design responsivo com Tailwind CSS
- ⚡ Animações com Framer Motion

## 🛠️ Tecnologias

- React
- Vite
- Tailwind CSS
- Framer Motion
- Discord.js
- Express.js
- Lanyard API

## 📝 Estrutura

```
├── src/
│   ├── components/     # Componentes React
│   ├── App.jsx        # Componente principal
│   ├── main.jsx       # Entry point
│   └── index.css      # Estilos globais
├── dist/              # Build gerado
├── assets/            # Imagens e arquivos estáticos
├── server.js          # Servidor Express
├── vite.config.js     # Configuração Vite
└── tailwind.config.js # Configuração Tailwind
```

## 🔗 Links

- GitHub: https://github.com/rreis-nt/meu-site
- Discord Status: Powered by Lanyard API
