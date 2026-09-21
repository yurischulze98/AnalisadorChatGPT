# Analisador de Chamado - CRM e SLA

Projeto simples para transformar uma anotacao bruta do analista em dois textos:

1. Atualizacao para CRM: texto mais completo, entre 3 e 10 linhas.
2. Justificativa para SLA: texto mais resumido, ate 4 linhas, sem copiar o texto original.

O backend utiliza a OpenAI Responses API com saida estruturada. Nao ha dependencia da API do Gemini. O projeto esta organizado para deploy pelo GitHub na Vercel.

## Estrutura

```text
analisador-chamado/
├── public/
    ├── index.html
    ├── styles.css
    └── app.js
├── package.json
├── package-lock.json
├── server.js
├── .gitignore
└── .env.example
```

## Como rodar

Entre na pasta do projeto:

```bash
cd analisador-chamado
```

Instale as dependencias:

```bash
npm install
```

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell, pode usar:

```powershell
copy .env.example .env
```

Abra o arquivo `.env` e coloque sua chave:

```env
OPENAI_API_KEY=sua_chave_aqui
OPENAI_MODEL=gpt-4o-mini
PORT=3000
```

Inicie o projeto:

```bash
npm run dev
```

Depois acesse no navegador:

```text
http://localhost:3000
```

## Publicar com GitHub e Vercel

1. Envie o conteudo da pasta `analisador-chamado` para a raiz do repositorio no GitHub.
2. Importe esse repositorio na Vercel.
3. Em `Settings > Environment Variables`, cadastre `OPENAI_API_KEY` como Secret.
4. Cadastre `OPENAI_MODEL` com o valor `gpt-4o-mini`.
5. Aplique as variaveis aos ambientes Production e Preview e faca um novo deploy.

Nao defina um Root Directory adicional se esta pasta ja for a raiz do repositorio. Caso ela esteja dentro de outra pasta no GitHub, selecione `analisador-chamado` como Root Directory na Vercel.

## Observacao importante

A chave da OpenAI fica somente no backend. 
Nao coloque a chave no HTML, CSS ou JavaScript do frontend.

Crie a chave em https://platform.openai.com/api-keys e configure o faturamento da API separadamente da assinatura do ChatGPT.
