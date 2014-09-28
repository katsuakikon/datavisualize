"use strict";
/* Google Charts================================================== */
google.load("visualization", "1", {
    packages: ["table","corechart"]
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
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

            chart.draw(result, options);

            // ========== イベントリスナー ==========
            google.visualization.events.addListener(
                chart,
                'select',
                function(event) {
                    if (chart.getSelection()[0]) {
                        drawAddChart(result.getValue(chart.getSelection()[0].row, 0));
                    }
                }
            );

        }).error(function() {
        alert("WebAPI呼出しエラー");
    });
}

function drawAddChart(org) {

        $.getJSON("http://www.itdashboard.go.jp/PublicApi/getData.json?dataset", {
            dataset: "BasicInformation",
            organization: org
        },
        function(jsonData) {

            // ========== データ設定領域 ========== 
            var data = new google.visualization.DataTable();
            data.addRows(jsonData.raw_data.length);
            data.addColumn("string", "システムID");
            data.addColumn("string", "システム名");
            data.addColumn("string", "組織名");
            data.addColumn("string", "情報システム区分");

            $.each(jsonData.raw_data, function(i, v) {
                data.setValue(i, 0, v.system_id);
                data.setValue(i, 1, v.system_name);
                data.setValue(i, 2, v.organization);
                data.setValue(i, 3, v.system_class);
            });

            // ========== 表示設定領域 ========== 
            var options = {
                title: 'システム一覧',
                chartArea: {
                    width: "50%",
                    height: "90%"
                },
                vAxis: {
                    title: '府省名'
                }
            };

            // ========== 描画処理領域 ========== 
            var chart = new google.visualization.Table(document.getElementById('chart_add'));

            chart.draw(data, options);

        }).error(function() {
        alert("WebAPI呼出しエラー");
    });
}
