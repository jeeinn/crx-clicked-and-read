// Copyright 2018 The Chromium Authors. All rights reserved.

'use strict';

(function () {
    let url = window.location.href;
    let timeDelay = 0;
    let timeDelayDefault = 2 * 1000;
    let removeReadMore = {};

    // 读取设定的延迟结果
    chrome.storage.sync.get(['time_delay'], function (result) {
        timeDelay = result.time_delay ? (result.time_delay * 1000) : timeDelayDefault;
    });

    // 所有具体规则
    switch (true) {
        // CSDN & ITeye
        case /(http|https):\/\/blog\.csdn\.net\/.*/.test(url):
        case /(http|https):\/\/.*\.iteye\.com\/.*/.test(url):
            removeReadMore = function (){
                let canClick = document.querySelector("#btn-readmore");
                if (canClick) canClick.click();
            };
            break;
        case /(http|https):\/\/bbs\.csdn\.net\/.*/.test(url):
            removeReadMore = function () {
                let canClick = document.querySelector(".js_show_topic");
                if (canClick) canClick.click();
            };
            break;
        // 百度知道
        case /(http|https):\/\/zhidao\.baidu\.com\/.*/.test(url):
            removeReadMore = function () {
                let canClick = document.querySelector(".wgt-answers-showbtn");
                if (canClick) canClick.click();

                canClick = document.querySelector(".wgt-best-showbtn");
                if (canClick) canClick.click();
            };
            break;
        // 360doc
        case /(http|https):\/\/.*360doc\.com\/content\/.*/.test(url):
            removeReadMore = function() {
                document.getElementsByTagName('body')[0].classList.remove('articleMaxH');
                console.log('360doc');
            };
            break;
        default:
            break;
    }
    setTimeout(removeReadMore, timeDelay);

})();
