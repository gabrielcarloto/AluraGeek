<h1 align="center">
  <img src="/public/Logo.svg" width="300px" />
</h1>

<h3 align="center">
  <a href="https://alura-geek-mocha.vercel.app/">Acessar a demonstração</a>
</h3>

<div style="height: 1px; width: 100%; background-color: #484b55; margin: 25px 0"></div>

## :clipboard: Sobre

Esse projeto está sendo desenvolvido durante o terceiro Challenge Front-End da Alura. O objetivo é criar um site baseando-se num modelo do [Figma](https://www.figma.com), em um período de quatro semanas.

Segredo ultra secreto :shushing_face: : o login de admin é

- Usuário: peypey
- Senha: negoney

### :computer: Tecnologias

- [Next.js](https://nextjs.org/)
- [Stitches](https://stitches.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PrismaORM](https://www.prisma.io/orm)

## :rocket: Como rodar

### Pré-requisitos

- **Node.js** 16.8+ (exigido pelo Next.js 12)
- **pnpm** — o projeto usa `pnpm` (fixado na v7 em `mise.toml`)
- **PostgreSQL** — um banco em execução (local, Docker ou serviço em nuvem como [Neon](https://neon.tech/) / [Supabase](https://supabase.com/))

### 1. Instalar as dependências

```bash
pnpm install
```

### 2. Configurar as variáveis de ambiente

Copie o template e preencha:

```bash
cp .env.template .env
```

| Variável                      | Descrição                                                        |
| ----------------------------- | ---------------------------------------------------------------- |
| `BASE_URL`                    | URL pública do app, ex.: `http://localhost:3000`                 |
| `DATABASE_URL`                | String de conexão do PostgreSQL                                  |
| `GITHUB_ID` / `GITHUB_SECRET` | Credenciais do app OAuth do GitHub (opcional — login com GitHub) |
| `NEXTAUTH_SECRET`             | Segredo usado para assinar as sessões do NextAuth                |
| `NEXTAUTH_URL`                | URL pública do app (usada pelo NextAuth)                         |
| `IMGUR_CLIENT_ID`             | Client ID do Imgur usado no upload de imagens dos produtos       |
| `PRODUCTS_PASSWORD`           | Senha exigida para criar/editar/excluir produtos                 |

### 3. Preparar o banco de dados

```bash
pnpm prisma migrate dev   # aplica as migrations e gera o client do Prisma
pnpm prisma db seed       # insere os produtos iniciais
```

### 4. Rodar o servidor de desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### :key: Acesso de admin

- Para criar, editar ou excluir produtos, a página solicitará o `PRODUCTS_PASSWORD` configurado no `.env`.
