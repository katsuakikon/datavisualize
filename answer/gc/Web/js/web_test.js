"use strict";
/* Google Charts================================================== */
google.load("visualization", "1", {
    packages: ["corechart"]
});
google.setOnLoadCallback(drawChart);

function drawChart() {
    $.getJSON("http://www.itdashboard.go.jp/PublicApi/getData.json?dataset", {
            dataset: "BasicInformation",
            field: "system_id,organization"
        },
        function(jsonData) {

            // ========== データ設定領域 ========== 
            var data = new google.visualization.DataTable();
            data.addRows(jsonData.raw_data.length);
            data.addColumn("string", "府省名");
            data.addColumn("string", "システムIDの数");
            console.log(jsonData.raw_data);
            $.each(jsonData.raw_data, function(i, v) {
                data.setValue(i, 0, v.organization);
                data.setValue(i, 1, v.system_id);
            });

            var result = google.visualization.data.group(
                data, // 対象データ
                [0], // グループ化列インデックス
                [{
                    'column': 1,
                    'aggregation': google.visualization.data.count,
                    'type': 'number'
                }]
            );

            // ========== 表示設定領域 ========== 
            var options = {
                title: '府省別システム数',
                chartArea: {
                    width: "50%",
                    height: "90%"
                },
                vAxis: {
                    title: '府省名'
                }
            };

            // ========== 描画処理領域 ========== 
            var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

            chart.draw(result, options);

        }).error(function() {
        alert("WebAPI呼出しエラー");
    });

}
