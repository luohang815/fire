/**
 * Created by 14585 on 2017/7/13.
 */
//创建和初始化地图函数：
function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMapOverlay();//向地图添加覆盖物
}
function createMap() {
    map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(120.122284, 30.292546), 19);
}
function setMapEvent() {
    map.enableScrollWheelZoom();
    map.enableKeyboard();
    map.enableDragging();
    map.enableDoubleClickZoom()
}
function addClickHandler(target, window) {
    target.addEventListener("click", function () {
        target.openInfoWindow(window);
    });
}
function addMapOverlay() {
    var markers = [
        {content: "我的备注", title: "目的地", imageOffset: {width: 0, height: 3}, position: {lat: 30.292426, lng: 120.122356}}
    ];
    for (var index = 0; index < markers.length; index++) {
        var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
        var marker = new BMap.Marker(point, {
            icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
                imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
            })
        });
        var label = new BMap.Label(markers[index].title, {offset: new BMap.Size(25, 5)});
        var opts = {
            width: 200,
            title: markers[index].title,
            enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
        marker.setLabel(label);
        addClickHandler(marker, infoWindow);
        map.addOverlay(marker);
    }
    ;
}
//向地图添加控件
function addMapControl() {
    var scaleControl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true});
    map.addControl(overviewControl);
}
var map;
initMap();
//注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use('element', 'layer', function () {
    var element = layui.element();
});
$(".gotop").click(function () {
    $("body,html").animate({
        scrollTop: 0
    }, 700)
});
$(document).scroll(function () {
    var curScroll = ($(window).height()) / 2; //获取当前窗口的可视高度 减半
    if ($(document).scrollTop() > curScroll) { //当滚动条滚动超过一半时，显示返回顶部
        $(".gotop").css({opacity: 1});
    } else if ($(document).scrollTop() <= curScroll && $(document).scrollTop() > 0) {
        $(".gotop").css({opacity: 0});
    }
});


//展开
(function show() {
    var synopsis = $("#synopsis");
    var innerHTML = synopsis.html();
    var innerHTMLLength = innerHTML.length;
    var str = "";
    if (innerHTMLLength > 500) {
        str = innerHTML.substring(0, 500);
        str += "<a id='more'>...显示更多</a>"
    } else {
        str = innerHTML;
    }
    $("#synopsis").html(str);
    $("#more").on("click", function (e) {
        var et = e.target.innerHTML;
        if (et == "...显示更多") {

            $("#synopsis").html(innerHTML);
        }
    })
})();

//菜单固定代码

$(document).scroll(function () {
    var scorllTop = $(document).scrollTop();
    if (scorllTop > 250) {
        $(".layui-aside").css("position", "fixed");
        $(".layui-aside").css("top", "80px");
    } else {
        $(".layui-aside").css("position", "relative");
        $(".layui-aside").css("top", "-130px");
    }
});

