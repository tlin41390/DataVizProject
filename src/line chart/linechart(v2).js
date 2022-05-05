function main() {
    const canvasWidth = 700;
    const canvasHeight = 700;
    const margin = 200;

    const svg = d3.select("#linechart").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;


    const parseTime = d3.timeParse("%y-%b")

    const container_g = svg.append("g")
        .attr("transform", "translate(100,100)");

    d3.csv("CSV/linechartData/graphics.csv", function (d) {
        return d;
    }).then(function (data) {
        for (d of data) {
            d.date = parseTime(d.Time);
            d.prices = +d.Prices;
            console.log(d.date);
        }
        var groups = ["GeForce RTX 3060 12GB", "GeForce RTX 3070 Ti", "GeForce RTX 3080 Ti", "GeForce RTX 3090", "Radeon RX 6600 XT", "Radeon RX 6700 XT", "Radeon RX 6800 XT", "Radeon RX 6900 XT"]

        d3.select(".select").select("select")
            .selectAll("myOptions")
            .data(groups)
            .enter().append("option")
            .text(function (d) { return d; })
            .attr("value", function (d) { return d; })

        const xScale = d3.scaleTime()
            .domain(d3.extent(data, (d) => { return d.date }))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, 3000])
            .range([height, 0])

        container_g.append("g")
            .attr("transform", "translate(0," + width + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", 50)
            .attr("x", width - 250)
            .attr("font-size", "30px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Months");

        container_g.append("g")
            .call(d3.axisLeft(yScale))

        var line = container_g
            .append("g")
            .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x((d) => { return xScale(d.date) })
                .y((d) => { return yScale(+d["GeForce RTX 3060 12GB"]) })
            )
            .attr("stroke", "#76b900")
            .style("stroke-width", 4)
            .style("fill", "none")

        var msrpLine = container_g
            .append("g")
            .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x((d) => { return xScale(d.date) })
                .y((d) => { return yScale(+d["MSRP GeForce RTX 3060 12GB"]) })
            ).attr("stroke", "black")
            .style("stroke-width", 4)
            .style("fill", "none")

        var dot = container_g
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => { return xScale(d.date) })
            .attr("cy", (d) => { return yScale(+d["GeForce RTX 3060 12GB"]) })
            .attr("r", 7)
            .style("fill", "#76b900")

        function update(selectedGroup) {

            if (selectedGroup.includes("RTX")) {
                console.log("banana")
            }

            // Create new data with the selection?
            var dataFilter = data.map(function (d) { return { date: parseTime(d.Time), value: d[selectedGroup], msrp: d["MSRP " + selectedGroup] } })

            // Give these new data to update line
            line
                .datum(dataFilter)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function (d) { return xScale(+d.date) })
                    .y(function (d) { return yScale(+d.value) })
                )
                .attr("stroke", function (d) { if (selectedGroup.includes("RTX")) { return "#76b900" } else { return "#F89713" } })
            dot
                .data(dataFilter)
                .transition()
                .duration(1000)
                .attr("cx", function (d) { return xScale(+d.date) })
                .attr("cy", function (d) { return yScale(+d.value) })
                .style("fill", function (d) { if (selectedGroup.includes("RTX")) { return "#76b900" } else { return "#F89713" } })

            msrpLine
                .datum(dataFilter)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function (d) { return xScale(+d.date) })
                    .y(function (d) { return yScale(+d.msrp) })
                )

        }

        // When the button is changed, run the updateChart function
        d3.select("select").on("change", function (d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })
    })
}
main();