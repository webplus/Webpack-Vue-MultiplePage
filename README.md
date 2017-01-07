# vue-multi-page

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 多页面规范
1、页面创建使用template下page结构，只需要复制page改成需要的页面名称，template/page下面的文件不可以修改文件名  
2、page下面的app.vue 是vue的容器，index.html是页面的容器，也可以理解为最终生成的页面的模板，main.js是业务逻辑的入口，也是打包的入口  
3、快速创建一个页面结构，可以使用:npm run page pageName,会自动复制temaple下page结构，pagename写的时候要注意，如果已经存在可能会盖掉  
