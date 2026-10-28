# GymUp React

Versao migrada do projeto original para React + Vite, sem PHP e sem banco de dados.

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Gere a build de producao:

```bash
npm run build
```

## Observacoes

- Os dados da aplicacao sao persistidos em `localStorage`.
- As imagens e videos utilizados pela aplicacao ficam em `src/assets/`.
- O projeto esta pronto para receber um backend futuro em qualquer linguagem.

## Assistente com IA local

O chat usa um modelo local pelo Ollama. Depois de baixar o modelo, as mensagens sao processadas no proprio computador e nao precisam de uma chave de API.

1. Instale o Ollama para Windows em [ollama.com/download](https://ollama.com/download/windows).
2. Abra o PowerShell e baixe o modelo padrao, de aproximadamente 2,5 GB:

```powershell
ollama pull qwen3:4b-instruct
```

3. Inicie o GymUp com `npm run dev`. Para a versao de producao, execute `npm run build` e depois `npm start`.

O Ollama deve estar aberto enquanto voce usa o chat. A primeira resposta pode demorar mais enquanto o modelo carrega. Para escolher outro modelo ja instalado, defina `OLLAMA_MODEL` no arquivo `.env`. Para alterar o endereco local do Ollama, use `OLLAMA_BASE_URL`.
