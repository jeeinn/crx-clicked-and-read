'use strict';

(function () {

    let submit = document.getElementById('submit');
    submit.addEventListener('click', function () {
        let timeDelay = document.getElementById('time_delay').value;
        let result = document.getElementById('result');

        timeDelay = parseFloat(timeDelay);
        if (timeDelay < 0) {
            result.innerHTML = '值不正确！';
            return false;
        }
        // 保存设定的延迟结果
        chrome.storage.sync.set({time_delay: timeDelay}, function () {
            result.innerHTML = '设定结果：' + timeDelay + 's';
        });
    });

})();
