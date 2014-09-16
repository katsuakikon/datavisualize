var svg = d3.select("#result") // ID名resultの要素を指定
    .append("svg") // svg要素を追加
    .attr("width", 500) // レイヤーの横幅（svg要素の横幅）を指定
    .attr("height", 200) // レイヤーの縦幅（svg要素の縦幅）を指定
    .style("background-color", "#EEE"); // レイヤー背景色の設定

svg.append("rect") // 四角形を指定
        .attr("x", 250) // x座標を指定
        .attr("y", 100) // y座標を指定
        .attr("width", 200) // 横幅
        .attr("height", 50) // 高さ
        .attr("fill", "cyan"); // 色

svg.append(★★★)
        .attr("x", 250) // x座標を指定
        .attr("y", 100) // y座標を指定
        .text("Hello World!")
        .attr({
            'dominant-baseline': ★★★ // 表示位置が設定できます ⇒ http://jsfiddle.net/likr/4z6mX/
        });

