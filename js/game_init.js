var Game = Game || {};
;(function(){
    'use strict';
    /**
     * 启动
     * **/
    console.log(wx);
     $(function(){
         Game.WecahtShare = function(){
             wx.onMenuShareTimeline({
                 title: 'Bee-Do~我在游戏中获得了' + Game.Init.xiaohuangren.get("currentScore") + '分！不服来战，一起寻找单眼小黄人stuart！', // 分享标题
                 link: window.location.href, // 分享链接
                 imgUrl: wx.wechatShare// 分享图标
             });
             wx.onMenuShareAppMessage({
                 title: '寻找单眼萌人Stuart', // 分享标题
                 desc: 'Bee-Do~我在游戏中获得了' + Game.Init.xiaohuangren.get("currentScore") + '分！不服来战，一起寻找单眼小黄人stuart！', // 分享描述
                 link: window.location.href, // 分享链接
                 imgUrl: wx.wechatShare,// 分享图标
                 type: 'link'
             });
         }
         Game.Init = function(){
            Game.Init.xiaohuangren = new Game.Model;
        }
        var img = new Image();
        img.src = $("body").data("preload");
        if(img.complete) {
            console.log("complete");
            Game.Init();
        }
        else {
            img.onload = function() {
                console.log("onload");
                Game.Init();
            };
        }
    });
})();