require([
    "esri/Map",
    "esri/views/MapView",
    "esri/config",
    "esri/layers/FeatureLayer",
], function (Map, MapView, config, Featurelayer,) {

    config.apiKey = "AAPK56e3ac027f044c4089d8ceec232fc05dYaOuzVRzm8tMRqvzOvDvIEevbqJ85yppn9PacU6cy4duurJrVK9wo_8BcWO8i8bi";

    const map1 = new Map({
        basemap: "streets"
    });

    const view1 = new MapView({
        container: "viewDiv",
        map: map1,
        center: [40, -28],
        zoom: 3
    });

    view1.ui.remove("attribution");

    document.getElementById("gray").addEventListener("click", function () {
        map1.basemap = "gray";
    });

    document.getElementById("hybrid").addEventListener("click", function () {
        map1.basemap = "hybrid";
    });

    document.getElementById("terrain").addEventListener("click", function () {
        map1.basemap = "terrain";
    });

    document.getElementById("osm").addEventListener("click", function () {
        map1.basemap = "osm";
    });

    document.getElementById("streets").addEventListener("click", function () {
        map1.basemap = "streets";
    });
    document.getElementById("streets_night").addEventListener("click", function () {
        map1.basemap = "streets-night";
    });


    // var layer_point = new Featurelayer({
    //     url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/FeatureServer"
    // });

    // var layer_line = new Featurelayer({
    //     url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer"
    // });

    // var layer_polygon = new Featurelayer({
    //     url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer"
    // });

    document.getElementById("Add_point").addEventListener("click", function () {
        map1.add(layer_point);
    });

    document.getElementById("Add_line").addEventListener("click", function () {
        map1.add(layer_line);
    });

    document.getElementById("Add_polygon").addEventListener("click", function () {
        map1.add(layer_polygon);
    });

    document.getElementById("Remove_point").addEventListener("click", function () {
        map1.remove(layer_point);
    });

    document.getElementById("Remove_line").addEventListener("click", function () {
        map1.remove(layer_line);
    });

    document.getElementById("Remove_polygon").addEventListener("click", function () {
        map1.remove(layer_polygon);
    });

    // document.getElementById("Arabic").addEventListener("click",function(){

    // });

    // view1.map.allLayers.on("change", function (event) {
    //     var num = event.target.length - 2;
    //     document.getElementById("Layers").textContent = "Layers： " + num;
    // });


    //***显示经纬度、比例尺大小和尺度***//
    function showCoordinates(pt) {
        var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
            " | Scale 1:" + Math.round(view1.scale * 1) / 1 +
            " | Zoom " + view1.zoom;
        coordsWidget.innerHTML = coords;
    }

    //*** 添加事件显示中心的坐标（在视图停止移动之后） ***//
    view1.watch(["stationary"], function () {
        showCoordinates(view1.center);
    });

    //*** 添加显示鼠标的坐标点***//
    view1.on(["pointer-down", "pointer-move"], function (evt) {
        showCoordinates(view1.toMap({ x: evt.x, y: evt.y }));
    });

    document.getElementById("simul_button").addEventListener("click", function () {
        var basemap1 = prompt("Please enter another basemap", "")
        if (basemap1 == view1.map.basemap) {
            document.write("Please Select A Different Map!")
        }
        if (basemap1 != null && basemap1 != "") {
            const map2 = new Map({
                basemap: basemap1
            });

            const view2 = new MapView({
                container: "div2",
                map: map2,
                center: [40, -28],
                zoom: 3
            });

            var div_2 = document.getElementById("div2");
            var div_1 = document.getElementById("viewDiv");
            div_2.style.width = "100%";
            div_2.style.height = "50%";
            div_1.style.height = "50%";
            view2.ui.remove("attribution");

            const views = [view1, view2];
            let active;

            const sync = (source) => {
                if (!active || !active.viewpoint || active !== source) {
                    return;
                }

                for (const view of views) {
                    if (view !== active) {
                        view.viewpoint = active.viewpoint;
                    }
                }
            };

            for (const view of views) {
                view.watch(["interacting", "animation"], () => {
                    active = view;
                    sync(active);
                });

                view.watch("viewpoint", () => sync(view));
            }

        }


    })
});
