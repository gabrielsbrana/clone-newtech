# Gestão da galeria Newtech

O painel fica em `/gestao-newtech`, sem link nos menus públicos. O acesso exige
senha; conhecer o endereço não permite editar. A senha nunca é enviada ao bundle
do navegador. A sessão usa cookie HttpOnly, Secure, SameSite=Strict e dura oito horas.

## Como usar

1. Abra o endereço do painel no domínio publicado e entre com a senha entregue ao responsável.
2. Selecione um veículo ou clique em **Adicionar veículo**.
3. Edite o nome e envie fotos JPG, PNG ou WebP. São aceitas até 30 fotos por veículo,
   com até 25 MB por arquivo original. O navegador e o servidor otimizam as fotos.
4. Use as setas para ordenar carros e fotos. A primeira foto é a capa. Cada foto
   permite alterar a descrição acessível, trocar o arquivo ou remover da galeria.
5. Use **Visível no site / Oculto no site** para controlar a exibição.
6. Clique em **Publicar alterações**. Os uploads, sozinhos, não alteram a galeria pública.
7. Abra **Ver site** e confira o resultado. Use **Sair** ao terminar.

As alterações podem levar até um minuto para aparecer por causa do cache do armazenamento.

As exclusões só são publicadas ao salvar. Ao fechar a página com alterações pendentes,
o navegador pede confirmação. Fotos removidas deixam de aparecer na galeria; os arquivos
no Blob são mantidos para recuperação. O Blob é público e destina-se somente a fotos de divulgação.
Não envie documentos ou imagens confidenciais. "Oculto" retira um veículo da vitrine,
mas não transforma suas imagens em arquivos privados.

Se duas pessoas editarem ao mesmo tempo, o painel recusa sobrescrever uma versão mais nova.
Recarregue a página e refaça as alterações nesse caso. Não há contas individuais ou recuperação
de senha por e-mail: a senha compartilhada é administrada pelo proprietário do projeto Vercel.

## Infraestrutura

- Frontend: React/Vite; `/api/session`, `/api/gallery` e `/api/upload`: Vercel Functions.
- Armazenamento: Vercel Blob público, `newtech/gallery.json` e `newtech/images/`.
- Sem galeria personalizada, o site exibe os seis veículos e as fotos originais do código.
- Segredos exigidos: `BLOB_READ_WRITE_TOKEN`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`.
- Gere os segredos com `node scripts/configure-admin.mjs`, depois configure os valores
  no ambiente Production da Vercel e faça um novo deploy. O script pode fazer isso
  automaticamente com `--vercel` para o projeto já vinculado nesta pasta.
- Os segredos e a senha gerados ficam em `.admin-credentials.local`, ignorado pelo Git.
- Para alterar a senha, gere novos segredos, atualize as variáveis e publique novamente.
- Para desenvolvimento com as APIs, use `vercel dev`; `npm run dev` executa apenas o frontend.
- A limitação de cinco tentativas de login por 15 minutos é por instância da função;
  por isso o script gera uma senha aleatória longa. Proteções globais adicionais podem
  ser configuradas no firewall da Vercel.

O `vercel.json` força `npm ci`, evitando que os arquivos de lock legados do Bun mudem
o gerenciador usado no deploy. O backend nunca grava arquivos no disco efêmero da função.
