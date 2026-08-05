<h1 align="center">
  <img src="/public/Logo.svg" width="300px" />
</h1>

<h3 align="center">
  <a href="https://alura-geek-mocha.vercel.app/">Access the preview</a>
</h3>

<div style="height: 1px; width: 100%; background-color: #484b55; margin: 25px 0"></div>

## :clipboard: About

_Psst: tem em [português](/README-pt.md) também!_ :raising_hand_man:

This project is being developed during the third Alura's Front-End Challenge. The main goal is to build a website based on a [Figma](https://www.figma.com) model, within four weeks.

Top secret :shushing_face: : the admin login is

- User: peypey
- Password: negoney

### :computer: Technologies

- [Next.js](https://nextjs.org/)
- [Stitches](https://stitches.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PrismaORM](https://www.prisma.io/orm)

## :rocket: Running locally

### Prerequisites

- **Node.js** 16.8+ (required by Next.js 12)
- **pnpm** — the project uses `pnpm` (pinned to v7 in `mise.toml`)
- **PostgreSQL** — a running database (local, Docker, or a cloud service such as [Neon](https://neon.tech/) / [Supabase](https://supabase.com/))

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure the environment variables

Copy the template and fill it in:

```bash
cp .env.template .env
```

| Variable                      | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `BASE_URL`                    | Public URL of the app, e.g. `http://localhost:3000`    |
| `DATABASE_URL`                | PostgreSQL connection string                           |
| `GITHUB_ID` / `GITHUB_SECRET` | GitHub OAuth app credentials (optional — GitHub login) |
| `NEXTAUTH_SECRET`             | Secret used to sign NextAuth sessions                  |
| `NEXTAUTH_URL`                | Public URL of the app (used by NextAuth)               |
| `IMGUR_CLIENT_ID`             | Imgur client ID used to upload product images          |
| `PRODUCTS_PASSWORD`           | Password required to create/edit/delete products       |

### 3. Set up the database

```bash
pnpm prisma migrate dev   # applies migrations and generates the Prisma client
pnpm prisma db seed       # inserts the initial products
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### :key: Admin access

- To create, edit or delete products, the page will ask for the `PRODUCTS_PASSWORD` you set in `.env`.
