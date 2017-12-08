<template>
    <transition 
        name="v-notification-fade"
        :appear="true"
        :enterClass="sideClass"
        :leave-active-class="sideClass"
        @after-leave="notificationAfterLeave">
        <div
            class="v-notification"
            v-show="visible"
            :style="OffsetStyle"
            :data-notification="tag"
            @mouseenter="clearTimer"
            @mouseleave="startTimer"
            @click="clickEvent"
            >
            <div class="v-notification__group">
                <div class="v-notification__closeBtn v-icon-close" @click.stop="visible = !visible">×</div>
                <aside class="v-notification__message"></aside>
                <h2 class="v-notification__title">{{ title }} </h2>
                <p class="v-notification__content">{{ content }} </p>
            </div>
        </div>
    </transition>
</template>

<script type="text/javascript">
/**
*   params message          提示框说明          {string} 
*   params title            提示框标题          {string}
*   params content          提示语             {string}
*   params duration         延时关闭时间         {number}      @default    4500
*   params AutoGone         自动消失            {string}     @default    true
*   params click            点击提示框事件       {function}
*   params gone             提示框消失回调事件   {function}
*/
export default {
    data () {
        return {
            visible: true,
            tag: null,
            timer: null,
            position: 'top-left',
            offset: {},
            closeEvent: null,
            message: '',
            title: '',
            content: '',
            duration: 4500,
            AutoGone: 'true',
            click: null,  //点击回调函数
            gone: null   //移除时回调的函数
        }
    },
    created() {      
        //因为notification是直接插入body里的
        //如果调路由的话,notification消失
        let that = this;
        if (window) {window.addEventListener('hashchange', () => { that.visible = false })};
    }
    mounted () {
        //开场动画
        this.startTimer();
    },
    methods: {
        startTimer() {
            if (this.AutoGone === 'false') return false;

            this.timer = setTimeout(() => {
                this.visible = false;
            }, this.duration);
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        clickEvent: function () {
            this.click && this.click();
        },
        notificationAfterLeave(el) {
            this.$el.parentNode.removeChild(this.$el);  //移除当前dom
            this.gone && this.gone();     //移除时回调的函数
            this.closeEvent(this.tag); 
        }
    },
    computed: {
        OffsetStyle() {
            let Style = {};
            Object.keys(this.offset).forEach((key) => {
                Style[key] = this.offset[key] + 'px';
            });

            return Style;
        },
        sideClass() {
            let horizontal = this.position.indexOf('right') >= 0? 'right': 'left';
            let enterClass = 'v-notification-' + horizontal + '-side-show';

            return enterClass;
        }
    }
} 
</script>

<style type="text/css">
    .v-notification{
        position: fixed;
        width: 225px;
        min-height: 45px;
        padding: 10px;
        opacity: 0.85;
        transition: opacity .4s,transform .4s,right .4s,top .4s,bottom .4s,left .4s;
        border-radius: 5px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
        overflow: hidden;

        .v-notification__group{
            margin-left: 0;

            .v-notification__message, .v-notification__title, .v-notification__content{
                display: block;
                line-height: 17px;
                font-size: 12px;
                font-weight: 400;
            }

            .v-notification__message{
                line-height: 17px;
                padding-right: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .v-notification__closeBtn{
                z-index: 99;
                float: right;
                font-weight: bold;
                font-size: 1em;
                cursor: pointer;
            }

        }

    }
    .v-notification-right-side-show{
        opacity: 0;
        transform: translateX(100%);
    }

    .v-notification-left-side-show{
        opacity: 0;
        transform: translateX(-100%);
    }

</style>