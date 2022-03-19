[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# Калькулятор сложного процента (VK Mini App)

Запуск:
```
yarn start
```

Туннель для открытия приложения через интернет:
```
env NODE_TLS_REJECT_UNAUTHORIZED=0 PROXY_HTTP_PROTO=https PROXY_WS_PROTO=wss PROXY_HOST=localhost PROXY_PORT=10888 vk-tunnel
```
(полученный адрес нужно прописать в настройках приложения на vk.com/dev)

Приложение DEV: https://vk.com/app7948254


# Развертывание

```
npm run deploy
```

For your CI, you can use 
 > $ env MINI_APPS_ACCESS_TOKEN=[deploy token] yarn deploy


## How to start work with app

Go to created folder and run:  
`yarn start` or  `npm start` to start dev server with hot reload on `localhost:10888`.

`yarn run build` or `npm run build` to build production bundle, with tree-shaking, uglify and all this modern fancy stuff.

[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app

[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app
