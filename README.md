# Anime2Potplayer使用说明

Anime2Potplayer一开始其实是看番需要下载，再使用Potplayer补帧观看，然后就会变得很麻烦，于是就写了这个脚本。代码很简单，当然支持的站点也很少，我没有多少时间去研究，也没有那么多精力去调试。如果有大佬愿意加入，可以到博客留言或者提交pr。

## 1. 安装

浏览器安装了油猴或者脚本猫之后，选择你安装的扩展对应链接：

1. 油猴（Tampermonkey）用户：[油猴脚本](https://greasyfork.org/zh-CN/scripts/534597-a2p)
2. 脚本猫（Script Cat）用户：[脚本猫脚本](https://scriptcat.org/zh-CN/script-show-page/3331)

## 2. 使用

 1. 脚本UI为视频播放区域右键菜单，等待视频加载完毕后右键即可。 
 2. 等待页面加载完毕后，按下快捷键Alt+X唤起Potplayer播放，Alt+Z开启/关闭自动跳转（部分站点不显示右键菜单时适用）。

> 注意：只有视频加载完毕才有右键菜单（包括快捷键）

## 3. 支持的网站

仅支持列表中列出的网站进行跳转播放，其他站点均未测试

|网站|状态|大陆直连|支持的资源|
| :---: | :---: | :---: | :---: |
|[MuteFun动漫网站](https://www.mutedm.com/)|✅支持|✅|全部|
|[AniCh](https://anich.emmmm.eu.org/)|✅支持|✅|全部|
|[五弹幕](https://www.5dm.link/)|✅支持|✅|全部|
|[动漫岛](https://www.dmd77.com/)|✅支持|✅|全部|
|[樱花动漫](http://www.iyinghua.com/)|❓部分支持|✅|除合集、电影外都支持|

|M3U8站点|状态|大陆直连|支持的资源|
| :---: | :---: | :---: | :---: |
|[TinaACG](https://tinaacg.net/)|✅支持|✅|全部|
|[速速电影院](http://susudyy.com/)|✅支持|✅|全部|
|[AGE动漫](https://www.agefans.la/)|❓部分支持|✅|支持西瓜/非凡/暴风/无尽|
|[蘑菇影视](https://www.5o5k.com/)|❓部分支持|✅|除合集、电影外都支持|
|[去看吧](https://www.k6dm.com/)|❓部分支持|✅|除剧场、电影外都支持|
|[233动漫](https://cn.233dm.com/)|❓部分支持|✅|支持土豆/天堂/风车/优质|

## 4. 支持的功能

- ✅手动跳转Potplayer
- ✅自动跳转Potplayer
- ✅自动暂停网页播放
- ✅快捷键支持
- ✅M3U8嗅探通知
- ❌自动播放下一集

## 5. 鸣谢

- [Potplayer](https://potplayer.daum.net/)
- [FontAwesome](https://fontawesome.com/)
- [油猴](https://greasyfork.org/)
- [脚本猫](https://scriptcat.org/)

## 6. 已知的BUG

1. 某些网站视频首次加载无法自动暂停播放，刷新页面即可
2. 某些网站不会弹出提醒，但是你依旧可以右键

## 联系作者

直接在[Github](https://github.com/MakotoArai-CN/A2P)提交[issue](https://github.com/MakotoArai-CN/A2P/issues)或者在脚本页提交issue，也欢迎到我的[blog](https://blog.ciy.cool/)留言。

## 协议

本项目遵循GPL-3.0协议。