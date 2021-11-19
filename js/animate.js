function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //如果回调函数存在则调用回调函数
            callback && callback();
        }
        obj.style.left = step + obj.offsetLeft + 'px';
    }, 15);
}