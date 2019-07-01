// Copyright 2018 The Chromium Authors. All rights reserved.

'use strict';

/**
 * 构造异步函数读取设定的延迟结果
 * chrome.storage.sync.get 读取用户数据竟然是异步的 -_-||
 *
 * @param {number} timeDelayDefault
 * @returns {Promise<number>}
 */
function getUserTimeDelay(timeDelayDefault) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(['userTimeDelay'], function (result) {
            if (result.userTimeDelay >= 0) {
                resolve(result.userTimeDelay * 1000);
            } else {
                reject(timeDelayDefault);
            }
        });
    });
}

(async function () {
    let url = window.location.href;
    let timeDelayDefault = 2 * 1000;
    let removeReadMore = function () {};

    // 所有自动点击的具体规则
    switch (true) {
        // CSDN & ITeye & yq.aliyun
        case /(http|https):\/\/.*blog\.csdn\.net\/.*/.test(url):
        case /(http|https):\/\/.*\.iteye\.com\/.*/.test(url):
        case /(http|https):\/\/yq\.aliyun\.com\/articles\/.*/.test(url):
            removeReadMore = function () {
                let canClick = document.querySelector("#btn-readmore");
                if (canClick) {
                    canClick.click();
                }else{
                    canClick = document.querySelector(".btn-readmore");
                    if (canClick) canClick.click();
                }
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
            removeReadMore = function () {
                document.getElementsByTagName('body')[0].classList.remove('articleMaxH');
            };
            break;

        // 知乎问答
        case /(http|https):\/\/.*zhihu\.com\/question\/.*/.test(url):
            removeReadMore = function () {
                let question = document.querySelector(".Button.QuestionRichText-more.Button--plain");
                if(question) question.click();
                // 第一个回答默认为展开，出于优化这里只点击第二个被折叠的回答
                let content = document.querySelectorAll(".Button.ContentItem-rightButton.Button--plain");
                if(content && content.length>1) content[1].click();
            };
        break;

        // 豆瓣，有些文章会有
        case /(http|https):\/\/.*douban\.com\/note\/.*/.test(url):
            removeReadMore = function () {
                let canClick = document.querySelector(".taboola-open-btn");
                if (canClick) canClick.click();
            };
            break;

        // Waiting Your Codes !
        // case 'xxx':
        //     break;

        default:
            removeReadMore = function () {};
            break;
    }

    let timeDelay = await getUserTimeDelay(timeDelayDefault);
    setTimeout(function () {
        removeReadMore();
    }, timeDelay);

})();
