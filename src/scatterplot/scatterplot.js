function main() {
    const canvasWidth = 800;
    const canvasHeight = 800;
    const margin = 200;

    const svg = d3.select("#scatterplot").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    const container_g = svg.append("g")
        .attr("transform", "translate(100,100)");

    d3.csv("CSV/linechartData/graphics.csv", function (d) {
        return d;
    }).then(function (data) {
        for (d of data) {
            d.etherium = +d["Etherium Price"];
        }
        var groups = ["GeForce RTX 3060 12GB", "GeForce RTX 3070", "GeForce RTX 3070 Ti", "GeForce RTX 3080", "GeForce RTX 3080 Ti", "GeForce RTX 3090", "Radeon RX 6600 XT", "Radeon RX 6700 XT", "Radeon RX 6800", "Radeon RX 6800 XT", "Radeon RX 6900 XT"]

        d3.select("#etherium_selector").select("select")
            .selectAll("myOptions")
            .data(groups)
            .enter().append("option")
            .text(function (d) { return d; })
            .attr("value", function (d) { return d; })

        container_g.append("text")
            .attr("font-size", "15px")
            .attr("transform", "rotate(-90)")
            .attr("y", 90)
            .attr("x", 000)
            .attr("dy", "-4.1em")
            .attr("stroke", "black")
            .text("GPU Prices")
        d3.select(".select").select("select")
            .selectAll("myOptions")
            .data(groups)
            .enter().append("option")
            .text(function (d) { return d; })
            .attr("value", function (d) { return d; })

        const xScale = d3.scaleLinear()
            .domain([2400, 4600])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .range([height, 0])

        const yAxis = d3.axisLeft().scale(yScale);

        container_g.append("g")
            .attr("class", "prices")

        container_g.append("g")
            .attr("transform", "translate(0," + width + ")")
            .call(d3.axisBottom(xScale).tickFormat(function(d){return "$"+d}))
            .append("text")
            .attr("y", 50)
            .attr("x", 50)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Etherium Price");

        // create a tooltip
        const Tooltip = d3.select("#scatterplot")
            .append("div")
            .style("opacity", 0)
            .attr("class", "column")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("font-family", "sans-serif")
            .style("width", "200px")
            .style("padding", "5px")

        let mouseover = function (d) {
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)

            d3.select(this).raise().classed("active", true);
        }

        let mouseleave = function () {
            Tooltip
                .style("opacity", 0)
                .style("left", "0px")
                .style("top", "0px")
            d3.select(this)
                .style("stroke", "white")
        }
        let dot = container_g.selectAll(".points")
            .data(data)

        dot.join("circle")
            .attr("class", "points")
            .transition()
            .attr("cx", function (d) { return xScale(+d.etherium) })
            .attr("cy", function (d) { return yScale(+d.value) })
            .attr("r", "7")
            .style("stroke", "white")
            .duration(1000)

        update("GeForce RTX 3060 12GB")


        function update(selectedGroup) {

            var dataFilter = data.map(function (d) { return { etherium: d["Etherium Price"], value: +d[selectedGroup] } })

            yScale.domain([d3.min(dataFilter, function (d) { return +d.value - 200 }), d3.max(dataFilter, function (d) { return +d.value })])

            container_g.selectAll(".prices")
                .transition()
                .duration(1000)
                .call(yAxis.ticks(15).tickFormat(function (d) { return "$" + d }))
            // Give these new data to update line

            dot = container_g.selectAll(".points")
                .data(dataFilter)

            dot.join("circle")
                .attr("class", "points")
                .transition()
                .attr("cx", function (d) {
                    return xScale(+d.etherium)
                })
                .attr("cy", function (d) {
                    return yScale(+d.value)
                })
                .attr("r", "7")
                .attr("stroke", "white")
                .duration(1000)

                .style("fill", function (d) { if (selectedGroup.includes("RTX")) { return "#76b900" } else { return "#F89713" } })

            dot
                .on("mouseover", mouseover)
                .on("mousemove", (event, d) => {
                    Tooltip
                        .html("GPU Price: $" + +d.value)
                        .style("left", event.pageX + 30 + "px")
                        .style("top", event.pageY + "px")
                })
                .on("mouseleave", mouseleave)

        }

        // // When the button is changed, run the updateChart function
        d3.select("#etherium_selector").select("select").on("change", function (d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })
    })
}
main();