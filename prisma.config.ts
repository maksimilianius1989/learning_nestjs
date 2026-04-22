import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const url = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}?schema=public`;

export default defineConfig({
  datasource: {
    url: url,
  },
})