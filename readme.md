# GymUp React

Versão migrada do projeto original para React + Vite, sem PHP e sem banco de dados.

## Requisitos

- Node.js e npm.
- (Opcional) Ollama, caso queira baixar e testar modelos de linguagem localmente.

## Como rodar o GymUp

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador o endereço informado pelo Vite (normalmente `http://localhost:5173`).

Para gerar e visualizar a build de produção:

```bash
npm run build
npm run preview
```

## Ollama (opcional)

O [Ollama](https://ollama.com/download) permite baixar e executar modelos de linguagem localmente. Instale-o pelo site oficial para seu sistema operacional. No Windows, também é possível instalar pelo PowerShell:

```powershell
irm https://ollama.com/install.ps1 | iex
```

Depois da instalação, abra um terminal e execute um modelo. Este exemplo baixa o Llama 3.2 (3B) na primeira execução e abre uma conversa no terminal:

```bash
ollama run llama3.2
```

Para uma variante menor, use:

```bash
ollama run llama3.2:1b
```

Para sair da conversa, digite `/bye`. O Ollama mantém a API local disponível em `http://localhost:11434` enquanto estiver em execução. Para verificar a instalação, consulte os modelos disponíveis com:

```bash
ollama list
```

### Integração com o GymUp

O assistente de metas que está no GymUp ainda **não usa o Ollama**: ele gera recomendações com regras locais no próprio navegador. Portanto, instalar e iniciar um modelo permite testá-lo pelo terminal ou pela API, mas não altera as respostas do assistente no site. A integração entre a interface e a API do Ollama ainda precisa ser implementada.

## Observações

- Os dados da aplicação são persistidos em `localStorage`.
- As imagens e os vídeos utilizados pela aplicação ficam em `src/assets/`.
- O projeto ainda não possui backend conectado.
