# questionnaire

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

notice:

1. router.js 中的 getIsWxClient 是否打开
2. vue-scroll-bar 修改了源码，注意迁徙
3. 在.env.production 文件中的切换
   {
   https://gqjy.jinlingkeji.cn:/ ------> VUE_APP_httpHost=https://api.jinlingkeji.cn/api/v9/
   https://gqjydev.jinlingkeji.cn/ ------> VUE_APP_httpHost=https://develop.jinlingkeji.cn/api/v9
   }
