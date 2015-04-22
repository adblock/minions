var Game = Game || {};
;(function(){
    'use strict';
    Game.ReactClass = {}
    //开始按钮
    Game.ReactClass.Init = React.createClass({
        handleClickInfo: function(){
            React.render(<Game.ReactClass.Rule view={this.props.view}/>, $("body").find(".rule")[0]);
        },
        render: function() {
            return (
                <div>
                    <div className="element game-title animated infinite bounceIn"></div>
                    <div className="element game-start animated infinite bounceIn" onClick={this.handleClickInfo}></div>
                    <div className="element game-info animated infinite bounceIn" onClick={this.handleClickInfo}></div>
                    <div className="rule"></div>
                </div>
            );
        }
    });
    //倒数计数
    Game.ReactClass.CountDown  = React.createClass({
        getInitialState: function() {
            var model = this.props.view.model;
            return {secondsElapsed: model.get("CountDown")};
        },
        resetCountDown:function(){
            var model = this.props.view.model;
            this.setState({secondsElapsed: model.get("CountDown")});
        },
        tick: function() {
            var model = this.props.view.model;
            if(!model.get("status")){
                this.resetCountDown();
                console.log("游戏结束了！")
            }
            if((this.state.secondsElapsed) == 0 && model.get("status")){
                //倒数为0
                this.resetCountDown();
                //清除Interval
                clearInterval(this.props.view.model.interval);
                //设置游戏状态为结束
                model.set("status",false);
            }else{
                model.set("CountDown",this.state.secondsElapsed - 1);
                this.setState({secondsElapsed: this.state.secondsElapsed - 1});
            }
        },
        componentDidMount: function() {
            this.props.view.model.interval = setInterval(this.tick, 1000);
        },
        componentWillUnmount: function() {
            this.resetCountDown();
            clearInterval(this.props.view.model.interval);
        },
        render: function() {
            var $miaolNum = "element miaoNum miaoNum_"+ this.state.secondsElapsed;
            var $miaorocess= "process element process_"+ this.state.secondsElapsed;
            return (
                <div>
                    <div className="yuan element"></div>
                    <div className="lan element">
                        <div className="miao element">
                            <div className={$miaolNum}></div>
                            <div className="element miaoNum miaoText"></div>
                        </div>
                        <div className={$miaorocess}></div>
                    </div>
                </div>
            );
        }
    });
    //关卡计分
    Game.ReactClass.Checkpoint = React.createClass({
        getInitialState: function() {
            var model = this.props.view.model;
            return {Checkpoint: model.get("Checkpoint")};
        },
        render: function() {
            var $Checkpoint = this.state.Checkpoint.toString();
            if($Checkpoint.length<2){
                var firstNum = "element CheckpointNum CheckpointNum_"+0;
                var secendNum = "element CheckpointNum CheckpointNum_"+$Checkpoint;
            }else{
                var $Checkpoint = $Checkpoint.split("")
                var firstNum = "element CheckpointNum CheckpointNum_" + $Checkpoint[0];
                var secendNum = "element CheckpointNum CheckpointNum_" + $Checkpoint[1];
            }
            if(this.state.Checkpoint>99){
                var firstNum = "element CheckpointNum CheckpointNum_9";
                var secendNum = "element CheckpointNum CheckpointNum_9";
            }
            return (
                <div>
                    <div className={firstNum}></div>
                    <div className={secendNum}></div>
                </div>
            );
        }
    });
    //分数
    Game.ReactClass.Score = React.createClass({
        getInitialState: function() {
            var model = this.props.view.model;
            return {
                currentScore: model.get("currentScore"),
                score: model.get("score")
            };
        },
        render: function() {
            return (
                <div>
                    <div className="highScore">
                        最高分数 : {this.state.score}
                    </div>
                    <div className="currentScore">
                        当前分数 : {this.state.currentScore}
                    </div>
                </div>
            );
        }
    });
    //显示规则
    Game.ReactClass.Rule = React.createClass({
        handleClickClose:function(){
            React.unmountComponentAtNode($("body").find(".rule")[0]);
        },
        handleClickStart: function() {
            var model = this.props.view.model;
            model.view.Init.destroy();
            model.view.Start = new Game.View.Start({model:this.props.view.model});
        },
        render: function() {
            return (
                <div className="rule-bg animated fadeIn">
                    <div className="rule-model element  animated slideInDown">
                        <div className="in">
                            <div className="closeThis" onClick={this.handleClickClose}></div>
                            <div className="yesThis" onClick={this.handleClickStart}></div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    //显示捣乱的小黄人
    Game.ReactClass.Trouble = React.createClass({
        render: function() {
            var styleName = "element trouble-name trouble-"+this.props.trouble;
            return (
                <div className="none-blank-bg">
                    <div className="blue-bg animated slideInDown">
                        <div className={styleName}></div>
                    </div>
                </div>
            );
        }
    });
    //显示时间减半
    Game.ReactClass.TroubleTime = React.createClass({
        render: function() {
            var styleName = "trouble-name trouble-"+this.props.trouble;
            return (
                <div className="none-blank-bg">
                    <div className="blue-bg animated slideInDown">
                        <div className={styleName}>时间减半 !</div>
                    </div>
                </div>
            );
        }
    });
    //休息结束
    Game.ReactClass.GameOver = React.createClass({
        reloadModel:function(){
            Game.Init();
            Game.Init.xiaohuangren.set("mapFormat",[//盘子的布局
                [1,3],//第1关~第2关：2×2的格子，共4个小黄人。捣乱角色：戴夫。
                [1,8],//第3关~第4关：3×3的格子，共9个小黄人。捣乱角色：戴夫。
                [1,7,8],//4×4的格子，共16个小黄人。捣乱角色：戴夫、凯文。
                [1,8,8,8],//第10关~第14关：5×5的格子，共25个小黄人。捣乱角色：戴夫、凯文、鲍勃。
                [1,8,8,8,11],//第15关~第24关：6×6的格子，共36个小黄人。捣乱角色：戴夫、凯文、鲍勃、汤姆。
                [1,7,7,7,7,7],//第25关~第XXX关：6×6的格子，共36个小黄人。捣乱角色：戴夫、凯文、鲍勃、汤姆、卡尔（卡尔是单眼小黄人，为最高难度）
            ]);
        },
        render: function() {
            var model     = this.props.model;
            var styleName = "element trouble-name trouble-"+this.props.trouble;
            return (
                <div className="blank-bg animated fadeIn">
                    <div className="gameover element animated slideInDown" onClick={this.reloadModel}>
                        <div className="in">
                            <div className="currentScore">{model.get("currentScore")}</div>
                            <div className="rank">您击败了 <strong>{model.get("rank")}%</strong> 的玩家</div>
                            <a ></a>
                        </div>
                    </div>
                </div>
            );
        }
    });
    //赌局
    Game.ReactClass.Table = React.createClass({
        getTableMap : function(){
            var model      = this.props.view.model;
            var room       = model.get("room");//当前rom里面有哪些小坏蛋
            var friends    = model.get("friends");//当前rom里面有哪些小坏蛋
            var Checkpoint = model.get("Checkpoint");//当前关卡数
            var mapFormat  = model.get("mapFormat");//获取小坏蛋们随机格式
            //循环给出一个随机数组
            var loop = function(mapFormat){
                var room = model.get("room");//当前rom里面有哪些小坏蛋
                var result = [];
                _.each(mapFormat,function(value,key){
                    for(var i=0;i<value;i++){
                        result.push(room[key]);
                    }
                });
                return  _.shuffle(result);
            }
            //判断关卡数 给出不同的结果
            if(Checkpoint<=2){
                this.props.tableSize = 2;
                return loop(mapFormat[0]);
            }
            if(Checkpoint<=4){
                this.props.tableSize = 3;
                return loop(mapFormat[1]);
            }
            if(Checkpoint<=9){
                this.props.tableSize = 4;
                if(Checkpoint===5){
                    room.push(friends[2])
                }
                return loop(mapFormat[2]);
            }
            if(Checkpoint<=14){
                this.props.tableSize = 5;
                if(Checkpoint===10){
                    room.push(friends[3])
                }
                return loop(mapFormat[3]);
            }
            if(Checkpoint<=24){
                this.props.tableSize = 6;
                if(Checkpoint===15){
                    room.push(friends[4])
                }
                return loop(mapFormat[4]);
            }
            if(Checkpoint>=25){
                this.props.tableSize = 6;
                if(Checkpoint===25){
                    room.push(friends[5])
                }
                var modIndex = 0;
                mapFormat[5] = _.map(mapFormat[5],function(value,index,list){
                    if(index===0){return value}
                    if(index >= 1 && index <= 4){
                        if(value>1){
                            modIndex++
                            value = value-1;
                            return value;
                        }else{
                            return value;
                        }
                    }
                    if(index===5){
                        return value + modIndex;
                    }
                });
                model.set("mapFormat",mapFormat);
                return loop(mapFormat[5]);
            }
        },
        swithPoint:function(){//显示捣乱的小黄人
            var model = this.props.view.model;
            var Checkpoint = model.get("Checkpoint");
            if(Checkpoint===5||Checkpoint===10||Checkpoint===15||Checkpoint===21||Checkpoint===25){
                model.view.Start.showTrouble();
                setTimeout(function(){
                    model.view.Start.render();
                },2000);
            }else{
                model.view.Start.render();
            }

        },
        yes: function(event) {
            var model = this.props.view.model;

            if(!model.get("status")){
                console.log("游戏结束了！");
                return;
            }
            //加分
            model.upScore();
            //增加关卡
            var Checkpoint = model.get("Checkpoint");
            model.set("Checkpoint",Checkpoint +1 );
            //清除倒计时
            clearInterval(model.interval);
            //再显示，根据关卡显示捣乱的
            this.swithPoint();
            console.log("你找对了！！！");
        },
        no: function(event) {
            var model = this.props.view.model;
            this.props.view.model.set("status",false);
            clearInterval(this.props.view.model.interval);
            console.log("游戏结束了！");
        },
        render: function() {
            var result = this.getTableMap();
            var _this = this;
            var style = "element animated infinite bounceIn tablesize_" + this.props.tableSize;
            return (
                <div className={style}>
                    <ul>
                        {result.map(function(object){
                            var style = "element animated rubberBand xhr_"+ object;
                            if(object==="Stuart"){
                                return <li className={style} onClick={_this.yes}></li>
                            }else{
                                return <li className={style} onClick={_this.no}></li>
                            }
                        })}
                    </ul>
                </div>
            );
        }
    });
})();