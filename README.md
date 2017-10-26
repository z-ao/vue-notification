# vue-notification
vue提示框插件

## 使用
将index.js引入项目的入口文件里

## 调用

```
this.$notify(arg);
this.$notify.clear();	关闭所有提示框
```

## 参数

| 参数      | 类型     | 描述               | 默认值|
|:--------:|:--------:|:-----------------:|:----:|
| message  | string   | 提示框说明          | null |
| title    | string   | 提示框标题          | null |
| content  | string   | 提示语             | null |
| duration | number	  | 延时关闭时间        | 4500 |
| autoClose| boolean  | 自动关闭           | true |
| onClick  | function | 点击提示框事件      | null |
| onClose  | function | 关闭提示框回调事件   | null |
