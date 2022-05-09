function main() {
    const canvasWidth = 1200;
    const canvasHeight = 700;
    const margin = 200;

    const svg = d3.select("#scatterplot-AMD").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin - 500;
    const height = svg.attr("height") - margin;
    //text for the canvas of the title
    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "20px")
        .attr("font-family", "sans-serif")
        .text("GPU prices in relation to Etherium Prices(AMD)")


    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const container_g = svg.append("g").attr("transform", "translate(100,100)")

    d3.csv("CSV/ebay_prices(AMD).csv").then(data => {
        xScale.domain([2400, 4600]);
        yScale.domain([400, 1700]);

        //append the circles on the graph and see what color scale to use based on the publisher
        container_g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .style("fill", function (d) {
                return color(d.GPUs)
            })
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx", function (d) { return xScale(+d["Etherium Price"]); })
            .attr("cy", function (d) { return yScale(+d["Prices"]); })
        //actions to display and remove tooltip

        //Display the X-axis
        container_g.append("g")
            .attr("transform", "translate(0, " + 500 + ")")
            .call(d3.axisBottom(xScale).tickFormat(function (d) {
                return d + "$";
            }).ticks(10))
            .append("text")
            .attr("y", height - 450)
            .attr("x", width - 250)
            .attr("font-size", "30px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Etherium Price");

        container_g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d + "$";
            }).ticks(13)).append("text")
            .attr("font-size", "25px")
            .attr("transform", "rotate(-90)")
            .attr("y", 40)
            .attr("x", -150)
            .attr("dy", "-4.1em")
            .attr("stroke", "black")
            .text("GPUs Price");

        container_g.append("g")
            .attr("class", "legendOrdinal")
            .attr("transform", "translate(600,300)")

        var models = new Set();

        data.forEach((d) => {
            models.add(d.GPUs);
        })

        var ordinal = d3.scaleOrdinal(d3.schemeCategory10).domain(models)
            .range(["#2077B4", "#FF7F0F", "#2CA02C", "#D62728"]);

        console.log([...models]);

        var legendOrdinal = d3.legendColor()
            //d3 symbol creates a path-string, for example
            //"M0,-8.059274488676564L9.306048591020996,
            //8.059274488676564 -9.306048591020996,8.059274488676564Z"
            .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
            .shapePadding(10)
            .scale(ordinal);

        container_g.select(".legendOrdinal")
            .call(legendOrdinal)
    });
}
main();