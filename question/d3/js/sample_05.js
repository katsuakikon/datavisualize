var svg = d3.select("#result") // ID名resultの要素を指定
    .append("svg") // svg要素を追加
    .attr("width", 500) // レイヤーの横幅（svg要素の横幅）を指定
    .attr("height", 500) // レイヤーの縦幅（svg要素の縦幅）を指定
    .style("background-color", "#EEE"); // レイヤー背景色の設定

var rectArray = [300, 200, 50, 100];

svg.selectAll("rect")
    .data(rectArray)
    .enter()
    .append("rect") // 四角形を指定
    .attr("x", 50) // x座標を指定
    .attr("y", function(d, index) { return index * 100 + 50; }) // y座標を指定
    .attr("width", function(d) { return d; }) // 横幅
    .attr("height", 50) // 高さ
    .attr("fill", "cyan"); // 色

// ★縦軸の作成
// スケール設定（空の目盛）
var yScale = d3.scale.★★★()
    .domain([0, 0])
    .range([0, ★★★]);
// y軸の描画
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(★★★, 30)") // 出力起点
    .★★★(d3.svg.★★★()
        .scale(★★★) // スケールを適用する
        .orient(★★★)); // 線の描画位置
