var Game = Game || {};
;(function(){
    'use strict';
    Game.Model = Backbone.Model.extend({
        view:{},
        url:"/minions/game/data",
        defaults: {
            "rank":0,
            "currentScore":0,
            "status":true,//游戏状态 flase 结束 true 开始
            "CountDown":  10,//倒数计时
            "Checkpoint": 1,//关卡数
            "friends":[//全部会进来的小黄人
                "Stuart",
                "Dave",
                "Kevin",
                "Bob",
                "Tom",
                "Carl"
            ],
            "room":[//当前房间小黄人
                "Stuart",
                "Dave"
            ],
            roomNum :2,
            "mapFormat":[//盘子的布局
                [1,3],//第1关~第2关：2×2的格子，共4个小黄人。捣乱角色：戴夫。
                [1,8],//第3关~第4关：3×3的格子，共9个小黄人。捣乱角色：戴夫。
                [1,7,8],//4×4的格子，共16个小黄人。捣乱角色：戴夫、凯文。
                [1,8,8,8],//第10关~第14关：5×5的格子，共25个小黄人。捣乱角色：戴夫、凯文、鲍勃。
                [1,8,8,8,11],//第15关~第24关：6×6的格子，共36个小黄人。捣乱角色：戴夫、凯文、鲍勃、汤姆。
                [1,7,7,7,7,7],//第25关~第XXX关：6×6的格子，共36个小黄人。捣乱角色：戴夫、凯文、鲍勃、汤姆、卡尔（卡尔是单眼小黄人，为最高难度）
            ]
        },
        initialize: function() {
            this.fetch({silent:true});
            this.view.Init = new Game.View.Init({model:this});
            this.on({
               "change:status":function(model){
                    React.render(<Game.ReactClass.GameOver model={model}/>, $("#game").find(".Trouble")[0]);
                    // this.save([],{
                    //     success:function(model){
                    //         React.render(<Game.ReactClass.GameOver model={model}/>, $("#game").find(".Trouble")[0]);

                    //         wx.onMenuShareTimeline({
                    //             title: 'Bee-Do~我在游戏中获得了' + Game.Init.xiaohuangren.get("currentScore") + '分，击败了' + Game.Init.xiaohuangren.get("rank") + '%的小黄人！不服来战，一起寻找单眼小黄人stuart！', // 分享标题
                    //             link: window.location.href, // 分享链接
                    //             imgUrl: wx.wechatShare// 分享图标
                    //         });
                    //         wx.onMenuShareAppMessage({
                    //             title: '寻找单眼萌人Stuart', // 分享标题
                    //             desc: 'Bee-Do~我在游戏中获得了' + Game.Init.xiaohuangren.get("currentScore") + '分，击败了' + Game.Init.xiaohuangren.get("rank") + '%的小黄人！不服来战，一起寻找单眼小黄人stuart！', // 分享描述
                    //             link: window.location.href, // 分享链接
                    //             imgUrl: wx.wechatShare,// 分享图标
                    //             type: 'link'
                    //         });
                    //     }
                    // });
                    console.log("游戏结束");
                },
                "change:rank":function(){
                    console.log("游戏结束");
                    Game.WecahtShare();
                },
                "change:Checkpoint":function(){
                    if(this.get("Checkpoint") < 21){
                        this.set("CountDown",10);
                    }else{
                        this.set("CountDown",5);
                    }
                    this.view.Start.resetCountdown();
                    console.log(this.get("Checkpoint")+"关");
                },
                "change:currentScore":function(){
                    if(this.get("currentScore")>this.get("score")){
                        this.save();
                    }
                    Game.WecahtShare();
                    console.log(this.get("score")+"分");
                    console.log(this.get("currentScore")+"分");
                }
            });
        },
        upScore:function(){
            if(this.get("CountDown")>=7){
                return this.set("currentScore",this.get("currentScore")+12);
            }
            if(this.get("CountDown")>=5){
                return this.set("currentScore",this.get("currentScore")+9);
            }
            if(this.get("CountDown")>=0){
                return this.set("currentScore",this.get("currentScore")+5);
            }
        }
    });
})();
