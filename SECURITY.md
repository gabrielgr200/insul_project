# Segurança e publicação

As rotas de chat e newsletter validam o tipo, o tamanho real do corpo JSON e os campos antes de chamar serviços externos. Pedidos de outras origens são recusados. O chat aceita até 1000 caracteres e 12 mensagens de histórico; a newsletter limita nome, e-mail e telefone e recusa caracteres de controle.

## Limites de requisições

- Chat: 30 pedidos por minuto por identidade de cliente.
- Newsletter: 5 pedidos a cada 10 minutos por identidade de cliente.
- O limite é local ao processo Node e possui armazenamento limitado. Em produção com várias réplicas, configurar também um limite compartilhado no WAF/proxy ou em um serviço como Redis. Reiniciar o processo reinicia os contadores.
- Na Vercel, usa-se `x-vercel-forwarded-for`. Em outra hospedagem, definir `TRUSTED_CLIENT_IP_HEADER` somente para um cabeçalho que o proxy confiável **sobrescreve**, removendo o valor enviado pelo visitante. Sem essa configuração, visitantes compartilham uma identidade e os limites são coletivos. Nunca confiar diretamente em um `X-Forwarded-For` fornecido pelo cliente.
- O padrão permite a origem da própria requisição. `ALLOWED_APP_ORIGINS` aceita origens adicionais separadas por vírgula, se necessárias; pedidos marcados pelo navegador como `cross-site` continuam bloqueados.
- Essas verificações reduzem abuso, mas não autenticam visitantes nem impedem bots de enviar pedidos diretamente.

## Navegador e dados

`next.config.ts` configura CSP, bloqueio de incorporação em frames, proteção contra interpretação incorreta de MIME, política de referência e permissões. HTTPS é exigido pela CSP e HSTS na compilação de produção. O microfone na própria página e popups de autenticação do Puter são preservados.

A CSP mantém scripts e estilos inline para compatibilidade com a renderização estática do Next.js e as animações existentes. Ela restringe origens externas, mas não equivale a uma CSP estrita com nonces. Validar a integração do Puter e Analytics no navegador após publicar.

O SDK do Puter carrega ao abrir o assistente. Mensagens, imagens e áudios enviados ao assistente são processados por esse fornecedor; o chat informa esse tratamento. Credenciais de OpenAI e Resend devem ficar apenas nas variáveis de ambiente do servidor, sem prefixo `NEXT_PUBLIC_`. Arquivos `.env*` estão ignorados pelo Git. Revogar qualquer credencial real que tenha sido compartilhada publicamente.

## Verificações

Executar `node --test tests/*.test.cjs`, `npx tsc --noEmit`, `npm run build` e `npm audit --omit=dev` após atualizações. A auditoria de dependências não substitui testes de segurança do ambiente publicado.

Em 18/11/2026, a auditoria de produção retornou zero vulnerabilidades conhecidas após atualizar Next.js e dependências. A auditoria completa ainda reportou quatro alertas moderados na cadeia de desenvolvimento `shadcn → ts-morph → @ts-morph/common → minimatch`; a correção automática sugeria um downgrade incompatível e não foi aplicada. Essa ferramenta foi movida para `devDependencies`.

Antes de publicar, verificar HTTPS e os cabeçalhos efetivamente entregues pelo provedor, configurar o limite compartilhado e restringir o acesso aos segredos do ambiente. A infraestrutura publicada não foi auditada nesta revisão local.
