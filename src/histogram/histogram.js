
function main() {
    const canvasWidth = 700;
    const canvasHeight = 700;
    const margin = 200;

    const svg = d3.select("#histogram").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)


    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    const xScale_thirtySeventyTi = d3.scaleLinear().range([0, width / 2]);
    const yScale_thirtySeventyTi = d3.scaleLinear().range([height / 2, 0]);

    const xScale_thirtyEightyTi = d3.scaleLinear().range([width / 2 + 30, height])
    const yScale_thirtyEightyTi = d3.scaleLinear().range([height / 2, 0])

    const xScale_thirtyNinety = d3.scaleLinear().range([0, width / 2])
    const yScale_thirtyNinety = d3.scaleLinear().range([height, height / 2 + 30])

    const xScale_thirtySixty = d3.scaleLinear().range([width / 2 + 30, height])
    const yScale_thirtySixty = d3.scaleLinear().range([height, height / 2 + 30])

    const container_g = svg.append("g")
        .attr("transform", "translate(100,100)");

    d3.csv("CSV/stock_and_time-Nvidia.csv").then(data => {
        xScale_thirtySeventyTi.domain([0, 60]);
        yScale_thirtySeventyTi.domain([0, 300]);

        xScale_thirtyEightyTi.domain([0, 60]);
        yScale_thirtyEightyTi.domain([0, 300]);

        xScale_thirtyNinety.domain([0, 60]);
        yScale_thirtyNinety.domain([0, 300]);

        xScale_thirtySixty.domain([0, 60]);
        yScale_thirtySixty.domain([0, 300]);

        let distributions_thirtysixty = []
        let distributions_thirtyeighty_ti = []
        let distributions_thirtyseventy_ti = []
        let distributions_thirtyninety = []

        data.forEach((d) => {
            if (d.chipset == "rtx-3070ti") {
                distributions_thirtyseventy_ti.push(d["time"])
            } else if (d.chipset == "rtx-3080ti") {
                distributions_thirtyeighty_ti.push(d["time"])
            } else if (d.chipset == "rtx-3090") {
                distributions_thirtyninety.push(d["time"])
            } else if (d.chipset == "rtx-3060") {
                distributions_thirtysixty.push(d["time"])
            }
        })

        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(xScale_thirtySeventyTi))
            .append("text")
            .attr("y", height - 725)
            .attr("x", width - 375)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Nvidia GeForce RTX 3070TI");

        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(xScale_thirtyEightyTi))
            .append("text")
            .attr("y", height - 725)
            .attr("x", width - 100)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Nvidia GeForce RTX 3080TI");

        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale_thirtyNinety))
            .append("text")
            .attr("y", height - 700)
            .attr("x", width - 375)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Nvidia GeForce RTX 3090");

        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale_thirtySixty)).append("text")
            .attr("y", height - 700)
            .attr("x", width - 100)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Nvidia GeForce RTX 3060");

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtySeventyTi).tickFormat(function (d) {
                return d;
            }).ticks(5))

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtyEightyTi).tickFormat(function (d) {
                return d;
            }).ticks(5))
            .attr("transform", "translate(" + ((width / 2) + 30) + "," + 0 + ")")

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtyNinety).tickFormat(function (d) {
                return d;
            }).ticks(5))

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtySixty).tickFormat(function (d) {
                return d;
            }).ticks(5))
            .attr("transform", "translate(" + ((width / 2) + 30) + "," + 0 + ")")


        const computeBins = d3.bin()
            .value(function (d) { return d })
            .domain(xScale_thirtySeventyTi.domain())
            .thresholds(xScale_thirtySeventyTi.ticks(10));


        const compute_thirtyeighty_ti = computeBins(distributions_thirtyeighty_ti);
        const compute_thirtyninety = computeBins(distributions_thirtyninety);
        const compute_thirtyseventy_ti = computeBins(distributions_thirtyseventy_ti);
        const compute_thirtysixty = computeBins(distributions_thirtysixty);

        // create a tooltip
        const Tooltip = d3.select("#histogram")
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
        }

        let mouseleave = function (d) {
            Tooltip
                .style("opacity", 0)
                .style("left", "0px")
                .style("top", "0px")
            d3.select(this)
                .style("stroke", "white")
                .style("opacity", 0.5)
        }

        container_g.selectAll(".bar3")
            .data(compute_thirtyseventy_ti)
            .enter()
            .append("rect")
            .attr("class", "bar3")
            .attr("x", function (d) { return xScale_thirtySeventyTi(d.x0) })
            .attr("y", function (d) { return yScale_thirtySeventyTi(d.length) })
            .attr("width", function (d) { return xScale_thirtySeventyTi(d.x1) - xScale_thirtySeventyTi(d.x0) })
            .style("fill", "#76b900")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - yScale_thirtySeventyTi(d.length); })
            .style("stroke", "white")
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.pageX + 30 + "px")
                    .style("top", event.pageY + "px")
            })
            .on("mouseleave", mouseleave)


        container_g.selectAll(".bar1")
            .data(compute_thirtyeighty_ti)
            .enter()
            .append("rect")
            .attr("class", "bar1")
            .attr("x", function (d) { return xScale_thirtyEightyTi(d.x0) })
            .attr("y", function (d) { return yScale_thirtyEightyTi(d.length) })
            .attr("width", function (d) { return xScale_thirtyEightyTi(d.x1) - xScale_thirtyEightyTi(d.x0) })
            .style("fill", "#76b900")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - yScale_thirtyEightyTi(d.length); })
            .style("stroke", "white")
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.pageX + 30 + "px")
                    .style("top", event.pageY + "px")
            })
            .on("mouseleave", mouseleave)


        container_g.selectAll(".bar2")
            .data(compute_thirtyninety)
            .enter()
            .append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) { return xScale_thirtyNinety(d.x0) })
            .attr("y", function (d) { return yScale_thirtyNinety(d.length) })
            .attr("width", function (d) { return xScale_thirtyNinety(d.x1) - xScale_thirtyNinety(d.x0) })
            .style("fill", "#76b900")
            .style("opacity", 0.5)
            .attr("stroke", "white")
            .attr("height", function (d) { return height - yScale_thirtyNinety(d.length) })
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.pageX + 30 + "px")
                    .style("top", event.pageY + "px")
            })
            .on("mouseleave", mouseleave)

        container_g.selectAll(".bar4")
            .data(compute_thirtysixty)
            .enter()
            .append("rect")
            .attr("class", "bar4")
            .attr("x", function (d) { return xScale_thirtySixty(d.x0) })
            .attr("y", function (d) { return yScale_thirtySixty(d.length) })
            .attr("width", function (d) { return xScale_thirtySixty(d.x1) - xScale_thirtySixty(d.x0) })
            .style("fill", "#76b900")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height - yScale_thirtySixty(d.length); })
            .style("stroke", "white")
            .on("mouseover", mouseover)
            .on("mousemove", (event, d) => {
                Tooltip
                    .html("Frequency " + d.length + "<br>" + "Range " + Math.min(...d) + "-" + Math.max(...d))
                    .style("left", event.pageX + 30 + "px")
                    .style("top", event.pageY + "px")
            })
            .on("mouseleave", mouseleave)
    })
}
main();
