'use strict';

(function () {
    // 读取已设定的延迟结果,单位秒 s
    chrome.storage.sync.get(['userTimeDelay'], function (result) {
        let userTimeDelayNode = document.getElementById('time_delay');
        userTimeDelayNode.value = result.userTimeDelay > 0 ? result.userTimeDelay : 0;
    });

    // 设定用户延迟时间
    let submit = document.getElementById('submit');
    submit.addEventListener('click', function () {
        let userTimeDelay = document.getElementById('time_delay').value;
        let setResultNode = document.getElementById('result');

        let isNotNum = !/^\d+$/.test(userTimeDelay);
        if (isNotNum || userTimeDelay < 0) {
            setResultNode.innerHTML = '<span style="color: red">输入有误！</span>';
            return false;
        }

        // 保存设定的延迟结果
        chrome.storage.sync.set({userTimeDelay: userTimeDelay}, function () {
            setResultNode.innerHTML = '<span style="color: green">设定成功：' + userTimeDelay + 's</span>';
        });
    });

})();
