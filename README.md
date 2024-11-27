# SV-Money

Moneybook Project

# Prepare

* postgresql 16

# Environment values

.env.example
```
DATABASE_URL=postgresql://<your database url>
SECRET=<HS256 secret string>
SYSTEM_USERNAME=<username>
SYSTEM_PASSWORD=<password>
```

# Deploy

```shell
pnpm install
pnpm run build
pnpm run db:push
node build
```