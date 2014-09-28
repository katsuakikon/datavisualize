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
    /* -- アニメーション処理エリア start -- */
    .attr("width", 0) // rect幅初期値
    .attr("height", 0) // rect高さ初期値
    .transition() // アニメーション関数
    .delay(2000) // アニメーション開始タイミング 2秒後開始
    .duration(5000) // アニメーション完了までの時間
    /* -- アニメーション処理エリア end -- */
    .attr("width", function(d) { return d; }) // 横幅
    .attr("height", 50) // 高さ
    .attr("fill", "cyan"); // 色

// 縦軸の作成
// スケール設定（空の目盛）
var yScale = d3.scale.linear()
    .domain([0, 0])
    .range([0, 470]);
// y軸の描画
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(50, 30)") // 出力起点
    .call(d3.svg.axis()
        .scale(yScale) // スケールを適用する
        .orient("left")); // 線の描画位置

// 横軸の作成
// スケール設定（目盛付）
var xScale = d3.scale.linear()
    .domain([0, 100])
    .range([0, 300]);
// y軸の描画
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(50, 460)") // 出力起点
    .call(d3.svg.axis()
        .scale(xScale) // スケールを適用する
        .orient("bottom")); // 線の描画位置
