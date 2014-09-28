d3.select("#result") // ID名resultの要素を指定
    .append("svg") // svg要素を追加
    .attr("width", 500) // レイヤーの横幅（svg要素の横幅）を指定
    .attr("height", 200) // レイヤーの縦幅（svg要素の縦幅）を指定
    .style("background-color", "gray"); // レイヤー背景色の設定