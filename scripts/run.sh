#!/usr/bin/env bash
npx prisma migrate deploy > /dev/null 2>&1
node ./dist/index.js "$@"