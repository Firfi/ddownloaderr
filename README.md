# What is that

A typescript console app for downloading web urls into file system. 

Together with the page, it takes all its static resources, downloads them and sets their urls on the page properly to point to the file system.

It features Docker build, Prisma ORM, console app arguments parse, work with filesystem and async networking / parallel fetch, as well as dom parsing/modifying.

# Dockerfile

To run with Docker,
- Build the image — no extra steps or args needed
- Run the container — a [local] volume could be mounted to container's /downloads dir
- Arguments go to the container as usual
- i.e. ` docker run -it -v ~/work/clients/autify/ddownloaderr/downloads:/downloads <container id> http://www.loskutoff.com http://google.com`
- or for metadata, i.e. ` docker run -it -v ~/work/clients/autify/ddownloaderr/downloads:/downloads <container id> --meta http://www.loskutoff.com`

# Development

db - prisma + sqlite

files folder - "downloads"

pnpm is used

before running the app for dev, do the following:

- install `pnpm`, then

- `pnpm install`

- `pnpx prisma migrate dev`

to run in dev, `ts-node ./src/index.ts --meta http://www.loskutoff.com https://google.com`

