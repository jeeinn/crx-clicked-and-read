// Copyright 2018 The Chromium Authors. All rights reserved.

'use strict';

(function () {
    let url = window.location.href;
    let timeDelay = 2 * 1000;
    let timeDelayDefault = timeDelay;

    // 读取设定的延迟结果
    chrome.storage.sync.get(['time_delay'], function (result) {
        timeDelay = result.time_delay ? result.time_delay : timeDelayDefault;
    });

    // 所有具体规则
    switch (true) {
        // CSDN & ITeye
        case /(http|https):\/\/blog\.csdn\.net\/.*/.test(url):
        case /(http|https):\/\/.*\.iteye\.com\/.*/.test(url):
            setTimeout(function () {
                let canClick = document.querySelector("#btn-readmore");
                if (canClick) canClick.click();
            }, timeDelay);
            break;
        case /(http|https):\/\/bbs\.csdn\.net\/.*/.test(url):
            setTimeout(function () {
                let canClick = document.querySelector(".js_show_topic");
                if (canClick) canClick.click();
            }, timeDelay);
            break;
        // 百度知道
        case /(http|https):\/\/zhidao\.baidu\.com\/.*/.test(url):
            setTimeout(function () {
                let canClick = document.querySelector(".wgt-answers-showbtn");
                if (canClick) canClick.click();
            }, timeDelay);
            break;
        default:
            break;
    }

})();
