import Vue from 'vue';
import Notification from './src/main.js';

(function (Vue) {
	Vue.prototype.$notify = Notification;
})(Vue);
