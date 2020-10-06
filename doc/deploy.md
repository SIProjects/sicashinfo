# How to Deploy sicashinfo

sicashinfo is splitted into 3 repos:
* [https://github.com/SIProjects/sicashinfo](https://github.com/SIProjects/sicashinfo)
* [https://github.com/SIProjects/sicashinfo-api](https://github.com/SIProjects/sicashinfo-api)
* [https://github.com/SIProjects/sicashinfo-ui](https://github.com/SIProjects/sicashinfo-ui)

## Prerequisites

* node.js v12.0+
* mysql v8.0+
* redis v5.0+

## Deploy sicash core
1. `git clone --recursive https://github.com/SIProjects/sicash.git --branch=sicashinfo`
2. Follow the instructions of [https://github.com/SIProjects/sicash/blob/master/README.md#building-sicash-core](https://github.com/SIProjects/sicash/blob/master/README.md#building-sicash-core) to build sicash
3. Run `sicashd` with `-logevents=1` enabled

## Deploy sicashinfo
1. `git clone https://github.com/SIProjects/sicashinfo.git`
2. `cd sicashinfo && npm install`
3. Create a mysql database and import [docs/structure.sql](structure.sql)
4. Edit file `sicashinfo-node.json` and change the configurations if needed.
5. `npm run dev`

It is strongly recommended to run `sicashinfo` under a process manager (like `pm2`), to restart the process when `sicashinfo` crashes.

## Deploy sicashinfo-api
1. `git clone https://github.com/SIProjects/sicashinfo-api.git`
2. `cd sicashinfo-api && npm install`
3. Create file `config/config.prod.js`, write your configurations into `config/config.prod.js` such as:
    ```javascript
    exports.security = {
        domainWhiteList: ['http://example.com']  // CORS whitelist sites
    }
    // or
    exports.cors = {
        origin: '*'  // Access-Control-Allow-Origin: *
    }

    exports.sequelize = {
        logging: false  // disable sql logging
    }
    ```
    This will override corresponding field in `config/config.default.js` while running.
4. `npm start`

## Deploy sicashinfo-ui
This repo is optional, you may not deploy it if you don't need UI.
1. `git clone https://github.com/SIProjects/sicashinfo-ui.git`
2. `cd sicashinfo-ui && npm install`
3. Edit `package.json` for example:
   * Edit `script.build` to `"build": "SICASHINFO_API_BASE_CLIENT=/api/ SICASHINFO_API_BASE_SERVER=http://localhost:3001/ SICASHINFO_API_BASE_WS=//example.com/ nuxt build"` in `package.json` to set the api URL base
   * Edit `script.start` to `"start": "PORT=3000 nuxt start"` to run `sicashinfo-ui` on port 3000
4. `npm run build`
5. `npm start`
