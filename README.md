# AesirX DAM

## About

AesirX DAM is our Open-Source PWA-powered enterprise-level Digital Asset Management as a Service (DAMaaS) Solution

Find out more in [https://dam.aesirx.io](https://dam.aesirx.io)

## Development

1. This project is using Monorepos with git submodule. You need to run `git submodule update --init --recursive` after cloned the project.
2. Run `yarn install` to install the dependencies.
3. Run `yarn prepare` to build the dependencies.
2. Rename the `.env.dist` file to `.env` on `packages/aesirx-dam-app` folder.
3. Replace license keys in the `.env` file with the one provided in your profile account.
   1. `REACT_APP_SSO_CLIENT_ID` replace this with the provided `REACT_APP_SSO_CLIENT_ID` from https://dapp.shield.aesirx.io/
   2. `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `REACT_APP_SSO_CLIENT_SECRET` from https://dapp.shield.aesirx.io/
   3. `PORT` change the port. Default is 3000

5. Run  `yarn dev`
6. Open [http://localhost:3000](http://localhost:3000) - 3000 is `PORT` to view it in the browser.

## Production
Run on a webserver:
1. Run `yarn build` after changed `.env` file.
2. Upload `packages/aesirx-dam-app/build` folder to webserver.

### Dockerize
1. Rename and copy the `.env.dist` file to `.env` on `packages/aesirx-dam-app` folder to `root` folder.
2. Run `docker compose -f "docker-compose.yml" up -d --build`
