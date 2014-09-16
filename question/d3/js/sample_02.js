var svg = d3.select("#result") // ID名resultの要素を指定
    .append("svg") // svg要素を追加
    .attr("width", 500) // レイヤーの横幅（svg要素の横幅）を指定
    .attr("height", 200) // レイヤーの縦幅（svg要素の縦幅）を指定
    .style("background-color", "#EEE"); // レイヤー背景色の設定

svg.append(★★★) // 四角形を指定
        .attr("x", ★★★) // x座標を指定
        .attr(★★★, 100) // y座標を指定
        .attr("width", 200) // 横幅
        .attr(★★★, 50) // 高さ
        .attr("fill", "blue"); // 色