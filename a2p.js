// ==UserScript==
// @name         A2P
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Anime2Potplayer，用Potplayer打开浏览器播放的动漫，这样就可以使用SVP4补帧啦！
// @author       MakotoArai(https://github.com/MakotoArai-CN)
// @supportURL   https://blog.ciy.cool
// @license      GPL-v3
// @icon          https://cravatar.cn/avatar/1e84fce3269537e4aa7473602516bf6d?s=256
// @match        *anich.emmmm.eu.org/*
// @match        *.mutedm.com/*
// @match        *.iyinghua.com/*
// @match        *.5dm.link/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function () {
        console.info("%cA2P%c%s", "color:red;font-size:40px;font-weight:bold;", "color:black;font-size:16px;font-weight:normal", GM_info.script.version);

        // 定时器用于动态嗅探视频链接
        const videoTimer = setInterval(findVideoUrl, 1000);
        function findVideoUrl() {
            const videoElement = document.querySelector("video");
            if (videoElement && videoElement.src) {
                clearInterval(videoTimer);
                preparePotplayerInteraction(videoElement, GM_getValue("check") ?? false);
            }
        }

        function preparePotplayerInteraction(videoElement, check = true) {
            const videoUrl = videoElement.src;
            const flag = 0;
            console.log(`检测到视频链接: ${videoUrl}`);

            creatBtn(videoElement);
            if (check) {
                window.location.href = `potplayer://${videoUrl}`;
                // 检测是否播放，如果正在播放则暂停网页的播放
                const checkTimer = setInterval(() => {
                    if (!videoElement.paused) {
                        videoElement.pause();
                        clearInterval(checkTimer);
                    }
                    flag++;
                    if (flag > 30) clearInterval(checkTimer);
                }, 1000);
            };

        }

        function creatBtn(videoElement) {
            // 插入自定义CDN
            document.head.insertAdjacentHTML("beforeend", `
            <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.7.2/css/all.min.css" rel="stylesheet">
        `);
            // 右键菜单
            var menu = document.createElement("div");
            // 插入自定义css
            document.head.insertAdjacentHTML("beforeend", `
            <style>
                 a {text-decoration: none;}
                div.usercm{background-repeat:no-repeat;background-position:center center;background-size:cover;background-color:#fff;font-size:13px!important;width:160px;-moz-box-shadow:1px 1px 3px rgba
                (0,0,0,.3);box-shadow:0px 0px 15px #333;position:absolute;display:none;z-index:10000;opacity:0.9; border-radius: 8px;}
                div.usercm ul{list-style-type:none;list-style-position:outside;margin:0px;padding:0px;display:block}
                div.usercm ul li{margin:0px;padding:0px;line-height:35px;}
                div.usercm ul li a{color:#666;padding:0 15px;display:block}
                /* div.usercm ul li a:hover{color:#fff;background:rgba(170,222,18,0.88)} */
                div.usercm ul li a:hover{color:#fff;background:rgba(15, 120, 233, 0.88)} /* 蓝色 */
                div.usercm ul li a i{margin-right:10px}
                a.disabled{color:#c8c8c8!important;cursor:not-allowed}
                a.disabled:hover{background-color:rgba(255,11,11,0)!important}
                div.usercm{background:#fff !important;}
            </style>
        )`);

        /* 右键菜单 */
        menu.innerHTML = `
            <div class="usercm" style="left: 199px; top: 5px; display: none;">
                <ul>
                    <li><a href="/"><i class="fa fa-home fa-fw"></i><span>首页</span></a></li>
                    <li><a href="javascript:void(0);" onclick="'' == (window.getSelection ? window.getSelection() : document.selection.createRange().text) ? console.log() : document.execCommand('Copy')"><i class="fa fa-copy fa-fw"></i><span>复制</span></a></li>
                    <li><a href="javascript:history.go(1);"><i class="fa fa-arrow-right fa-fw"></i><span>前进</span></a></li>
                    <li><a href="javascript:history.go(-1);"><i class="fa fa-arrow-left fa-fw"></i><span>后退</span></a></li>
                    <li style="border-bottom:1px solid gray"><a href="javascript:window.location.reload();"><i class="fa fa-refresh fa-fw"></i><span>重载网页</span></a></li>
                    <li><a href="javascript:void(0);" class="potplayer"><i class="fa fa-arrow-right fa-fw"></i><span>Potplayer</span></a></li>
                    <li><a href="javascript:void(0);" class="aa2p"><i class="fa fa-arrow-right fa-fw"></i><span>自动跳转</span></a></li>
                    <li><a href="https://blog.ciy.cool"><i class="fa fa-pencil-square-o fa-fw"></i><span>关于我</span></a></li>
                </ul>
            </div>
            `;
        document.body.appendChild(menu);
        // 自定义鼠标右键
        // 自定义鼠标右键菜单行为
        (function () {
            let mouseX = 0;
            let mouseY = 0;
            let windowWidth = 0;
            let windowHeight = 0;

            // 获取元素
            const menu = document.querySelector('.usercm');

            // 鼠标移动事件
            window.addEventListener('mousemove', function (e) {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;
                mouseX = e.clientX;
                mouseY = e.clientY;

                // 设置菜单位置
                let left = e.pageX;
                let top = e.pageY;

                if (mouseX + menu.offsetWidth >= windowWidth) {
                    left = left - menu.offsetWidth - 5;
                }
                if (mouseY + menu.offsetHeight >= windowHeight) {
                    top = top - menu.offsetHeight - 5;
                }

                // 绑定右键点击事件
                document.documentElement.addEventListener('contextmenu', function (event) {
                    if (event.button === 2) { // 右键点击
                        event.preventDefault();
                        menu.style.left = `${left}px`;
                        menu.style.top = `${top}px`;
                        menu.style.display = 'block';
                    }
                });

                // 点击隐藏菜单
                document.documentElement.addEventListener('click', function () {
                    menu.style.display = 'none';
                });
            });

            // 禁用默认右键菜单
            window.oncontextmenu = function (e) {
                e.preventDefault();
                return false;
            };

            // 判断是否是移动端
            const userAgent = navigator.userAgent;
            const mobileKeywords = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
            let isMobile = false;

            for (let keyword of mobileKeywords) {
                if (userAgent.indexOf(keyword) > -1) {
                    isMobile = true;
                    break;
                }
            }

            // 非移动端才启用自定义右键菜单
            if (!isMobile) {
                // 上面已经实现了 mouseMoveShow 和 disabledContextMenu
                console.log('已启用自定义右键菜单');
            }
        })();
        const potplayer = document.querySelector(".potplayer");
        const aa2p = document.querySelector(".aa2p");
        const videoUrl = videoElement.src;
        potplayer.addEventListener("click", function () {
            window.location.href = `potplayer://${videoUrl}`;
            // 暂停播放
            videoElement.pause();
        })

        aa2p.innerHTML = `<i class="fa fa-arrow-right fa-fw"></i><span>${GM_getValue("check") ? "关闭自动跳转" : "开启自动跳转"}</span>`;
        aa2p.addEventListener("click", function () {
            const check = GM_getValue("check") ?? false;
            if (check) {
                GM_setValue("check", false);
                aa2p.innerHTML = `<i class="fa fa-arrow-right fa-fw"></i><span>开启自动跳转</span>`;
            } else {
                GM_setValue("check", true);
                aa2p.innerHTML = `<i class="fa fa-arrow-right fa-fw"></i><span>关闭自动跳转</span>`;
            }
        })
    }
    }
})();