import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleAiChatRequest } from './server/aiChat.js';

function gymUpAiPlugin(config) {
  const middleware = (request, response, next) => {
    handleAiChatRequest(request, response, config)
      .then((handled) => { if (!handled) next(); })
      .catch(next);
  };

  return {
    name: 'gymup-ai-chat',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      gymUpAiPlugin({
        baseUrl: (env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, ''),
        model: env.OLLAMA_MODEL || 'qwen3:4b-instruct',
      }),
    ],
  };
});
