# Newtech Blindagens

Site institucional em React, TypeScript, Vite, Tailwind e shadcn/ui.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Para executar tamb?m as APIs de autentica??o, galeria e upload, configure o projeto
Vercel e execute `vercel dev`.

## Publica??o

```sh
vercel link --project newtech
vercel --prod
```

A publica??o usa `npm ci`, `npm run build` e o diret?rio `dist`.
O reposit?rio de trabalho ? https://github.com/gabrielsbrana/clone-newtech.

## Painel administrativo

Leia [docs/ADMIN.md](docs/ADMIN.md) para configurar o acesso, armazenamento e editar
os ve?culos. A rota ? `/gestao-newtech` e exige autentica??o no servidor.
Os segredos s?o configurados na Vercel e nunca devem entrar no Git.
