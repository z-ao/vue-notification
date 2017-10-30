<template>
    <transition 
        name="v-notification-fade"
        @after-leave="notificationAfterLeave">
        <div
            class="v-notification"
            v-show="visible"
            :style="{top: top? top + 'px': 'auto'}"
            :data-notification="pos"
            @mouseenter="clearTimer"
            @mouseleave="startTimer"
            @click="clickEvent"
            >
            <div class="v-notification__group">
                <div class="v-notification__closeBtn v-icon-close" @click.stop="visible = !visible">×</div>
                <aside class="v-notification__message">{{ message }}</aside>
                <h2 class="v-notification__title">{{ title }} </h2>
                <p class="v-notification__content">{{ content }}</p>
            </div>
        </div>
    </transition>
</template>

<script type="text/javascript">
/**
*   params message          提示框说明         {string} 
*   params title            提示框标题          {string}
*   params content          提示语             {string}
*   params duration         延时关闭时间         {number}      @default    4500
*   params autoClose        自动关闭            {boolean}     @default    true
*   params onClick          点击提示框事件       {function}
*   params onClose          关闭提示框回调事件   {function}
*/
export default {
    data () {
        return {
            visible: false,
            pos: null,
            timer: null,
            message: '',
            title: '',
            content: '',
            top: null,
            duration: 4500,
            autoClose: '',
            onClick: null,  //点击回调函数
            onClose: null,   //移除时回调的函数
            closeEvent: null
        }
    },
    created () {

    },
    mounted () {
        //开场动画
        this.visible = true;
        this.startTimer();
    },
    methods: {
        startTimer() {
            if (this.autoClose === false) return false;

            this.timer = setTimeout(() => {
                this.visible = false;
            }, this.duration);  
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        clickEvent: function () {
            this.onClick && this.onClick()
        },
        notificationAfterLeave(el) {
            this.$el.parentNode.removeChild(this.$el);  //移除当前dom
            this.closeEvent(this.pos);                  

            this.onClose && this.onClose();     //移除时回调的函数
        }
    }
} 
</script>

<style type="text/css">
    .v-notification{
        position: fixed;
        right: 16px;
        width: 225px;
        min-height: 45px;
        padding: 10px;
        opacity: 0.85;
        transition: opacity .4s,transform .4s,right .4s,top .4s;
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
                height: 17px;
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

    .v-notification-fade-enter, .v-notification-fade-leave-active /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(100%);
    }

</style>