#!/bin/bash

# Run prisma db push
npx prisma migrate deploy

# Run prisma generate
npx prisma generate

# Start the Node.js application
npm run start