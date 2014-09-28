var WebAPIURL = "http://www.itdashboard.go.jp/PublicApi/getData.json?dataset=BasicInformation&field=organization&option=count";

d3.json(WebAPIURL, function(error, data) {
    if (error) {
        d3.select("#result").html(error.statusText);
        return;
    }

    var tbl = d3.select("#result") // div#result内に出力
        .append("table") // table要素を追加
        .selectAll("tr") // tr要素を対象にする
        .data(data.raw_data) // 出力するデータ
        .enter() // データ数だけ要素を生成
        .append("tr")
        .selectAll("td")
        .data(function(row) { // 1行ごとにデータを返す
            return d3.entries(row); // key, valueを返す
        })
        .enter()
        .append("td") // td要素を追加
        .text(function(d) {
            return d.value; // valueが配列要素の値
        });
});