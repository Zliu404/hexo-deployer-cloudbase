# hexo-deployer-cloudbase


## 安装
```shell
$ npm install hexo-deployer-cloudbase --save
```

## 配置
在 _config.yml 中添加 deploy 配置。

``` yml
deploy:
  type: cloudbase
  secretId: < # your envId >
  secretKey: < # your secretKey >
  envId: < # your envId >
  region: < # your region >


# 示例:
  type: cloudbase
  secretId: AKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxHt
  secretKey: MTxxxxxxxxxxxxxxxxxxxxxxxxxxxxHq
  envId: my-blog-1gxxxxxxxxxxxx6d
  region: ap-guangzhou
```

- region 为 CloudBase 开通的环境所在区域。通常为 **广州** 或者 **上海**。
- envId 为 CloudBase 开通的环境 ID。在"云开发CloudBase -> 环境总览" 中可以查看此信息。
- secretId 和 secretKey 是腾讯云 API 请求的凭证，可以在"访问管理 -> 访问密钥 -> API 秘钥管理"中新建或查看。

## 部署

```shell
$ hexo d
```