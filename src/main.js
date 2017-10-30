import Vue from 'vue';
import NotificationVue from './main.vue';
let NotificationConstructor = Vue.extend(NotificationVue);

let instance,       //提示框
    instances = [], //提示框集合
    pos       = 0;  //提示框标记

var Notification = function (options) {
    let option = options || {};
    //设置提示框高度与标签
    let _offsetTop = 16;
    instances.forEach((item) => {
        if (item) {
            _offsetTop += item.$el.offsetHeight + 5;
        }
    }) 

    //传入数据给组件
    option.top          = _offsetTop;
    option.pos          = pos;
    option.autoClose    = options.autoClose || true;
    option.closeEvent   = Notification.closeEvent;

    //实例提示框
	instance = new NotificationConstructor({
        data: option
    });

  	instance.vm = instance.$mount();
    //插入提示框
  	document.body.appendChild(instance.vm.$el);

    instances[pos] = instance;
    pos++;
  	return instance.vm;
}

/*
    [closeEvent]    提示框关闭触发事件
    @param   {number}   pos     提示框标记
*/
Notification.closeEvent = function (pos) {
    instances[pos] = null;      //清除对应数据
    
    var h = 16;                //重设高度
    instances.forEach((item) => {
        if (item) {
            item.top = h;
            h += item.$el.offsetHeight + 5;
        }
    })
};

/*
    [clear]    清除所有提示框
    @param   {function}   cb     回调函数
*/
Notification.clear = function (cb) {
    instances.forEach((item) => {
        if (item) {
            item.visible = false;
        };
    })

    cb && cb();
}

export default Notification;
