var WebAPIURL = "http://www.itdashboard.go.jp/PublicApi/getData.json?dataset=BasicInformation&field=organization&option=count";

d3.json(WebAPIURL, function(error, data) {
    if (error) {
        d3.select("#result").html(error.statusText);
        return;
    }

    // 横棒グラフを作ってみよう！
});
