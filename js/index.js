window.addEventListener('load', function () {
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    //鼠标进入显示箭头
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    })
    //鼠标离开隐藏箭头
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            arrow_r.click();
        }, 2500)
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })
    //动态生成小圆圈
    var num = 0;
    var circle = 0;
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //记录当前小圆圈的索引号
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈移动图片
            var focusWidth = focus.offsetWidth;
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片放在最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var focusWidth = focus.offsetWidth;
    //节流阀
    var flag = true;
    //点击右侧按钮 滚动下一张图片
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //小圆圈跟着变化
            circle++;
            if (circle === ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    //左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === 0) {
                num = ul.children.length - 1;
                ul.style.left = num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //小圆圈跟着变化
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; ++i) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //自动播放轮播图
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2500)
})