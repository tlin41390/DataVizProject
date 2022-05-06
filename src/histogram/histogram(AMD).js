function main() {
    const canvasWidth = 700;
    const canvasHeight = 700;
    const margin = 200;

    const svg = d3.select("#histogramAMD").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    const xScale_rx5700 = d3.scaleLinear().range([0, width / 2]);
    const yScale_rx5700 = d3.scaleLinear().range([height / 2, 0]);

    const xScale_rx6700xt = d3.scaleLinear().range([width / 2 + 30, height])
    const yScale_rx6700xt = d3.scaleLinear().range([height / 2, 0])

    const xScale_rx6600xt = d3.scaleLinear().range([0, width / 2])
    const yScale_rx6600xt = d3.scaleLinear().range([height, height / 2 + 30])

    const xScale_rx6800xt = d3.scaleLinear().range([width / 2 + 30, height])
    const yScale_rx6800xt = d3.scaleLinear().range([height, height / 2 + 30])

    const container_g = svg.append("g")
        .attr("transform", "translate(100,100)");

    d3.csv("CSV/stock_and_time-AMD.csv").then(data => {
        xScale_rx5700.domain([0, 60]);
        yScale_rx5700.domain([0, 300]);

        xScale_rx6700xt.domain([0, 60]);
        yScale_rx6700xt.domain([0, 300]);

        xScale_rx6600xt.domain([0, 60]);
        yScale_rx6600xt.domain([0, 300]);

        xScale_rx6800xt.domain([0, 60]);
        yScale_rx6800xt.domain([0, 300]);

        let distributions_rx6800xt = []
        let distributions_rx6700 = []
        let distributions_rx5700 = []
        let distributions_rx6600xt = []

        data.forEach((d) => {
            if (d.chipset == "rx5700") {
                distributions_rx5700.push(d["time"])
            } else if (d.chipset == "rx6700xt") {
                distributions_rx6700.push(d["time"])
            } else if (d.chipset == "600xt") {
                distributions_rx6600xt.push(d["time"])
            } else if (d.chipset == "rx6800xt") {
                distributions_rx6800xt.push(d["time"])
            }
        })

        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(xScale_rx5700))
            .append("text")
            .attr("y", height - 725)
            .attr("x", width - 375)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 5700XT");

        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(xScale_rx6700xt))
            .append("text")
            .attr("y", height - 725)
            .attr("x", width - 100)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 6700XT");


        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale_rx6600xt))
            .append("text")
            .attr("y", height - 700)
            .attr("x", width - 375)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 6600XT");


        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale_rx6800xt))
            .append("text")
            .attr("y", height - 700)
            .attr("x", width - 100)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 6800XT");


        container_g.append("g")
            .call(d3.axisLeft(yScale_rx5700).tickFormat(function (d) {
                return d;
            }).ticks(5))

        container_g.append("g")
            .call(d3.axisLeft(yScale_rx6700xt).tickFormat(function (d) {
                return d;
            }).ticks(5))
            .attr("transform", "translate(" + ((width / 2) + 30) + "," + 0 + ")")

        container_g.append("g")
            .call(d3.axisLeft(yScale_rx6600xt).tickFormat(function (d) {
                return d;
            }).ticks(5))

        container_g.append("g")
            .call(d3.axisLeft(yScale_rx6800xt).tickFormat(function (d) {
                return d;
            }).ticks(5))
            .attr("transform", "translate(" + ((width / 2) + 30) + "," + 0 + ")")


        const computeBins = d3.bin()
            .value(function (d) { return d })
            .domain(xScale_rx5700.domain())
            .thresholds(xScale_rx5700.ticks(10));


        const compute_rx6700 = computeBins(distributions_rx6700);
        const compute_rx6600xt = computeBins(distributions_rx6600xt);
        const compute_rx5700 = computeBins(distributions_rx5700);
        const compute_rx6800xt = computeBins(distributions_rx6800xt);

        const Tooltip = d3.select("#histogramAMD")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("font-family", "sans-serif")
            .style("transform", "translate(0px,0px)")
            .style("width", "200px")
            .style("padding", "5px")

        let mouseover = function (d) {
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }

        let mouseleave = function (d) {
            Tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "white")
                .style("opacity", 0.5)
        }
        container_g.selectAll(".bar3")
            .data(compute_rx5700)
            .enter()
            .append("rect")
            .attr("class", "bar3")
            .attr("x", function (d) { return xScale_rx5700(d.x0) })
            .attr("y", function (d) { return yScale_rx5700(d.length) })
            .attr("width", function (d) { return xScale_rx5700(d.x1) - xScale_rx5700(d.x0) })
            .style("fill", "#F8971D")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - yScale_rx5700(d.length); })
            .style("stroke", "white")
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.x + 30 + "px")
                    .style("top", event.y + (3000) + "px")
            })
            .on("mouseleave", mouseleave)


        container_g.selectAll(".bar1")
            .data(compute_rx6700)
            .enter()
            .append("rect")
            .attr("class", "bar1")
            .attr("x", function (d) { return xScale_rx6700xt(d.x0) })
            .attr("y", function (d) { return yScale_rx6700xt(d.length) })
            .attr("width", function (d) { return xScale_rx6700xt(d.x1) - xScale_rx6700xt(d.x0) })
            .style("fill", "#F8971D")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - yScale_rx6700xt(d.length); })
            .style("stroke", "white")
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.x + 30 + "px")
                    .style("top", event.y + (3000) + "px")
            })
            .on("mouseleave", mouseleave)

        console.log(distributions_rx5700);
        console.log(distributions_rx6800xt);

        container_g.selectAll(".bar2")
            .data(compute_rx6600xt)
            .enter()
            .append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) { return xScale_rx6600xt(d.x0) })
            .attr("y", function (d) { return yScale_rx6600xt(d.length) })
            .attr("width", function (d) { return xScale_rx6600xt(d.x1) - xScale_rx6600xt(d.x0) })
            .style("fill", "#F8971D")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height - yScale_rx6600xt(d.length) })
            .style("stroke", "white")
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.x + 30 + "px")
                    .style("top", event.y + (3000) + "px")
            })
            .on("mouseleave", mouseleave)

        container_g.selectAll(".bar4")
            .data(compute_rx6800xt)
            .enter()
            .append("rect")
            .attr("class", "bar4")
            .attr("x", function (d) { return xScale_rx6800xt(d.x0) })
            .attr("y", function (d) { return yScale_rx6800xt(d.length) })
            .attr("width", function (d) { return xScale_rx6800xt(d.x1) - xScale_rx6800xt(d.x0) })
            .style("fill", "#F8971D")
            .style("opacity", 0.4)
            .attr("height", function (d) { return height - yScale_rx6800xt(d.length); })
            .style("stroke", "white")
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length).html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.x + 30 + "px")
                    .style("top", event.y + (3000) + "px")
            })
            .on("mouseleave", mouseleave)
    })
}
main();
