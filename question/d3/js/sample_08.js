var WebAPIURL = "http://www.itdashboard.go.jp/PublicApi/getData.json?dataset=BasicInformation&field=organization&option=count";

d3.★★★(★★★, function(error, data) {
    if (error) {
        d3.select("#result").html(error.statusText);
        return;
    }

    var tbl = d3.select("#result") // div#result内に出力
        .append("table") // table要素を追加
        .★A★("tr") // tr要素を対象にする
        .★B★(data.raw_data) // 出力するデータ
        .★C★() // データ数だけ要素を生成
        .append("tr")
        .★A★("td")
        .★B★(function(row) { // 1行ごとにデータを返す
            return d3.entries(row); // key, valueを返す
        })
        .★C★()
        .append("td") // td要素を追加
        .text(function(d) {
            return d.value; // valueが配列要素の値
        });
});