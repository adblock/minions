var Game = Game || {};
;(function(){
    'use strict';
    //view
    Game.View = {}
    //启动界面
    Game.View.Init  = Backbone.View.extend({
        el: '#game',
        initialize:function(){
            $("body").addClass("start");
            this.render();
        },
        render: function() {
            React.render(<Game.ReactClass.Init view={this}/>, this.el);
        },
        destroy:function(){
            React.unmountComponentAtNode(this.el);
        }
    });
    //开始
    Game.View.Start  = Backbone.View.extend({
        el: '#game',
        template: '<div id="top-panle" class="element">\
                    <div class="Checkpoint"></div>\
                   <div class="Score"></div>\
                   </div>\
                   <div class="CountDown"></div>\
                   <div class="Table"></div>\
                   <div class="Trouble"></div>',
        initialize:function(){
            this.render();
        },
        render: function() {
            this.$el.html(this.template);
            React.render(<Game.ReactClass.CountDown view={this}/>, this.$el.find(".CountDown")[0]);
            React.render(<Game.ReactClass.Checkpoint view={this}/>, this.$el.find(".Checkpoint")[0]);
            React.render(<Game.ReactClass.Score view={this}/>, this.$el.find(".Score")[0]);
            React.render(<Game.ReactClass.Table view={this}/>, this.$el.find(".Table")[0]);
        },
        resetCountdown:function(){
            React.unmountComponentAtNode(this.$el.find(".CountDown")[0]);
            React.render(<Game.ReactClass.CountDown view={this}/>, this.$el.find(".CountDown")[0]);
        },
        showTrouble:function(){
            var Checkpoint = this.model.get("Checkpoint");
            switch (Checkpoint)
            {
                case 5:
                    React.render(<Game.ReactClass.Trouble trouble={"Kevin"}/>, this.$el.find(".Trouble")[0]);
                    break;
                case 10:
                    React.render(<Game.ReactClass.Trouble trouble={"Bob"}/>, this.$el.find(".Trouble")[0]);
                    break;
                case 15:
                    React.render(<Game.ReactClass.Trouble trouble={"Tom"}/>, this.$el.find(".Trouble")[0]);
                    break;
                case 21:
                    React.render(<Game.ReactClass.TroubleTime trouble={"5"}/>, this.$el.find(".Trouble")[0]);
                    break;
                case 25:
                    React.render(<Game.ReactClass.Trouble trouble={"Carl"}/>, this.$el.find(".Trouble")[0]);
                    break;
            }
        },
        destroy:function(){
            React.unmountComponentAtNode(this.$el.find(".CountDown")[0]);
            React.unmountComponentAtNode(this.$el.find(".Checkpoint")[0]);
            React.unmountComponentAtNode(this.$el.find(".Score")[0]);
            React.unmountComponentAtNode(this.$el.find(".Table")[0]);
        }
    });
})();