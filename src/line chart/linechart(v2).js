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

    d3.csv("../../CSV/linechartData/graphics.csv", function (d) {
        return d;
    }).then(function (data) {
        for (d of data) {
            d.date = parseTime(d.Time);
            d.prices = +d.Prices;
            console.log(d.date);
        }
        var groups = ["GeForce RTX 3060 12GB", "GeForce RTX 3070 Ti"]

        d3.select("#selectButton")
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
            .attr("stroke", "black")
            .style("stroke-width", 4)
            .style("fill", "none")

        var msrpLine = container_g
            .append("g")
            .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x((d)=>{return xScale(d.date) })
                .y((d)=>{return yScale(+d["MSRP GeForce RTX 3060 12GB"])})
            ).attr("stroke","black")
            .style("stroke-width",4)
            .style("fill","none")

        var dot = container_g
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => { return xScale(d.date) })
            .attr("cy", (d) => { return yScale(+d["GeForce RTX 3060 12GB"]) })
            .attr("r", 7)
            .style("fill", "#69b3a2")

        function update(selectedGroup) {

            // Create new data with the selection?
            var dataFilter = data.map(function (d) { return { date: parseTime(d.Time), value: d[selectedGroup],msrp:d["MSRP "+ selectedGroup] } })

            // Give these new data to update line
            line
                .datum(dataFilter)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function (d) { return xScale(+d.date) })
                    .y(function (d) { return yScale(+d.value) })
                )
                .attr("stroke","green")
            dot
                .data(dataFilter)
                .transition()
                .duration(1000)
                .attr("cx", function (d) { return xScale(+d.date) })
                .attr("cy", function (d) { return yScale(+d.value) })

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
        d3.select("#selectButton").on("change", function (d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })
    })
}
main();