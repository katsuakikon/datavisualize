var WebAPIURL = "http://www.itdashboard.go.jp/PublicApi/getData.json?dataset=BasicInformation&field=organization&option=count";

d3.json(WebAPIURL, function(error, data) {
    if (error) {
        d3.select("#result").html(error.statusText);
        return;
    }

    var xZeroPoint = 150; // x座標の起点（px）
    var yZeroPoint = 5; // y座標の起点(px)

    // 軸表記に必要な幅
    var axisRange = 20;
    // 棒グラフの棒の描画サイズ関連
    var rectRange = 10; // 棒の幅
    var rectEdge = 2; // 棒の端線の幅
    var rectSpace = rectRange + rectEdge * 2 + 10; // 棒の出力スペース（棒の出力幅と余白）

    // 取得データから描画の幅に必要なpx数を算出
    var xMAX = xZeroPoint + d3.max(data.raw_data, function(d) {
        return d.count;
    });
    // 同上で高さに必要なpxを算出
    var yMAX = 5 + data.raw_data.length * rectSpace;

    var svg = d3.select("#result") // ID名resultの要素を指定
    .append("svg") // svg要素を追加
    .attr("width", xMAX + axisRange) // レイヤーの横幅（svg要素の横幅）を指定
    .attr("height", yMAX + axisRange); // レイヤーの縦幅（svg要素の縦幅）を指定

    // 棒グラフの棒の部分を作成
    svg.selectAll("rect") // 四角形を追加。以後のメソッドは、この四角形に対しての設定になる
    .data(data.raw_data)
        .enter()
        .append("rect")
        .attr("x", xZeroPoint) // x座標を指定
        .attr("y", function(row, i) {
            return i * rectSpace + yZeroPoint;
        }) // y座標を指定
        /* -- アニメーション処理エリア start -- */
        .attr("width", 0) // rect幅初期値
        .attr("height", 0) // rect高さ初期値
        .transition() // アニメーション関数
        .delay(2000) // アニメーション開始タイミング 2秒後開始
        .duration(5000) // アニメーション完了までの時間
        /* -- アニメーション処理エリア end -- */
        .attr("width", function(row) {
            return row.count;
        }) // 横幅を指定
        .attr("height", rectRange) // 縦幅を指定
        .attr("stroke", "blue") // 青色にする
        .attr("fill", "cyan") // 塗りは水色にする
        .attr("stroke-width", rectEdge); // 線幅を指定

    // 棒グラフの縦軸の表示要素を作成
    svg.selectAll("text")
        .data(data.raw_data)
        .enter()
        .append("text")
        .attr("x", 10) // x座標を指定
        .attr("y", function(row, i) {
            return i * rectSpace + (yZeroPoint + rectRange / 2 + rectEdge);
        }) // y座標を指定
        .text(function(row) {
            return row.organization;
        })
        .attr({
            'dominant-baseline': 'middle'
        });

    // ==========　軸作成　==========
    // ★縦軸の作成
    // スケール設定（空の目盛）
    var yScale = d3.scale.linear()
        .domain([0, 0])
        .range([0, yMAX]);
    // y軸の描画
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + xZeroPoint + ", " + 0 + ")") // 出力起点
        .call(d3.svg.axis()
            .scale(yScale) // スケールを適用する
            .orient("left")); // 線の描画位置

    // スケール設定（ここでは府省別のシステム数を目盛とするため上限を400にしている）
    var xScale = d3.scale.linear() // スケールを設定
        .domain([0, 400]) // 表示上のサイズ
        .range([0, 400]); // 実際の出力サイズ
    // x軸の描画
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + xZeroPoint + ", " + yMAX + ")") // 出力起点
        .call(d3.svg.axis()
            .scale(xScale) //スケールを適用する
            .orient("bottom") //bottomはデフォルトなので省略でもよい
        );
});
