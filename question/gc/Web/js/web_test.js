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
            // 取得データからDataTableを作成してみましょう。
            // /* ★ */ のついている箇所にコードを追加してください。

            // １．取得データのサイズ（長さ）を行数として設定します。
            data.addRows(jsonData.raw_data.length);
            // ２．ヘッダ行となるカラムの型と名称を設定します。
            data.addColumn("string", "府省名");
            /* ★ */

            console.log(jsonData.raw_data);

            // ３．取得データをループし、DataTableにレコードを追加していきます。
            $.each(jsonData.raw_data, function(i, v) {
                data.setValue(/* ★ */);
                /* ★ */
            });

            // ４．グループ化してシステム数をカウントします。
            var result = google.visualization.data.group(
                data, // 対象データ
                [/* ★ */], // グループ化列インデックス
                [{
                    'column': /* ★ */,
                    'aggregation': /* ★ */,
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
