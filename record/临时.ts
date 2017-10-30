import toastr from 'toastr';

import {Injectable, ViewContainerRef} from '@angular/core';
import {ToastController, Toast} from 'ionic-angular';
import {LoadingController, Loading} from 'ionic-angular';

import Translator, {TranslateParams} from '../../translation/translator';

@Injectable()
export class NotificationProvider {

    constructor(
        protected toastCtrl: ToastController,
        protected loadingCtrl: LoadingController
    ) {
        // 设置toast默认位置
        toastr.options.positionClass = 'toast-top-center';
    }

    public showInfo (source: string, params: TranslateParams = {}, showCloseButton: boolean = false) {
        if(showCloseButton) { // 显示关闭按钮
            toastr.options.closeButton = showCloseButton;
        }
        toastr.info(Translator.translate(source, params));
    }
    public showError() {

    }
    // IMPORTANT params为null是表示不翻译
    public showToast(source: string | Array<string>, params: TranslateParams = {}, showCloseButton: boolean = false): Toast {
        if (typeof source === 'string') source = [source]; // 将string调整为Array<string>
        let message: string = '';
        for (let [index, s] of source.entries()) {
            if (index !== 0) message += '\n'; // 增加换行
            message += params != null ? Translator.translate(s, params) : s;
        }
        let toast = this.toastCtrl.create({
            message,
            cssClass: 'r3t-notification-toast', // notification.css中设置toast样式
            duration: showCloseButton ? null : 3000,
            position: 'top',
            showCloseButton,
            closeButtonText: Translator.translate('Button.Close')
        });
        toast.present();
        return toast;
    }

    // IMPORTANT params为null是表示不翻译
    public showLoading(text: string, params: TranslateParams = {}): Loading {
        let loading = this.loadingCtrl.create({
            content: params != null ? Translator.translate(text, params) : text,
        });
        loading.present();
        return loading;
    }
}