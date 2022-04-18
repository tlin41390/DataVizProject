function main() {
    const canvasWidth = 700;
    const canvasHeight = 700;
    const margin = 200;

    const svg = d3.select("#histogam(AMD)").append("svg")
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

    d3.csv("CSV/stock_and_time-AMD.csv").then(data => {
        xScale_thirtySeventyTi.domain([0, 60]);
        yScale_thirtySeventyTi.domain([0, 400]);

        xScale_thirtyEightyTi.domain([0, 60]);
        yScale_thirtyEightyTi.domain([0, 400]);

        xScale_thirtyNinety.domain([0, 60]);
        yScale_thirtyNinety.domain([0, 400]);

        xScale_thirtySixty.domain([0, 60]);
        yScale_thirtySixty.domain([0, 400]);

        let distributions_thirtysixty = []
        let distributions_thirtyeighty_ti = []
        let distributions_thirtyseventy_ti = []
        let distributions_thirtyninety = []

        data.forEach((d) => {
            if (d.chipset == "rx5700") {
                distributions_thirtyseventy_ti.push(d["time"])
            } else if (d.chipset == "rx6700xt") {
                distributions_thirtyeighty_ti.push(d["time"])
            } else if (d.chipset == "600xt") {
                distributions_thirtyninety.push(d["time"])
            } else if (d.chipset == "rx6800xt") {
                distributions_thirtysixty.push(d["time"])
            }
        })

        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(xScale_thirtySeventyTi))

        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(xScale_thirtyEightyTi))

        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale_thirtyNinety))

        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale_thirtySixty))

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtySeventyTi).tickFormat(function (d) {
                return d;
            }).ticks())

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtyEightyTi).tickFormat(function (d) {
                return d;
            }).ticks())
            .attr("transform", "translate(" + ((width / 2) + 30) + "," + 0 + ")")

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtyNinety).tickFormat(function (d) {
                return d;
            }).ticks())

        container_g.append("g")
            .call(d3.axisLeft(yScale_thirtySixty).tickFormat(function (d) {
                return d;
            }).ticks())
            .attr("transform", "translate(" + ((width / 2) + 30) + "," + 0 + ")")


        const computeBins = d3.bin()
            .value(function (d) { return d })
            .domain(xScale_thirtySeventyTi.domain())
            .thresholds(xScale_thirtySeventyTi.ticks(10));


        const compute_thirtyeighty_ti = computeBins(distributions_thirtyeighty_ti);
        const compute_thirtyninety = computeBins(distributions_thirtyninety);
        const compute_thirtyseventy_ti = computeBins(distributions_thirtyseventy_ti);
        const compute_thirtysixty = computeBins(distributions_thirtysixty);

        const tooltip = d3.select("body")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("width", "10%")
            .style("border-width", 50)
            .style("border-radius", 5)
            .style("padding", "5px")

        let mouseover = function (d) {
            tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }

        let mouseleave = function (d) {
            tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.5)
        }

        container_g.selectAll(".bar1")
            .data(compute_thirtyeighty_ti)
            .enter()
            .append("rect")
            .attr("class", "bar1")
            .attr("x", function (d) { return xScale_thirtyEightyTi(d.x0) })
            .attr("y", function (d) { return yScale_thirtyEightyTi(d.length) })
            .attr("width", function (d) { return xScale_thirtyEightyTi(d.x1) - xScale_thirtyEightyTi(d.x0) })
            .style("fill", "#F8971D")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - yScale_thirtyEightyTi(d.length); })
            .on("mouseover", mouseover)
            .on("mousemove", (Event, d) => {
                tooltip
                    .html("Frequency " + d.length)
                    .style("left", (Event.x) / 2 - 100 + "px")
                    .style("top", (Event.y) / 2 + "px")
            })
            .on("mouseleave", mouseleave)

        console.log(distributions_thirtyseventy_ti);
        console.log(distributions_thirtysixty);

        container_g.selectAll(".bar2")
            .data(compute_thirtyninety)
            .enter()
            .append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) { return xScale_thirtyNinety(d.x0) })
            .attr("y", function (d) { return yScale_thirtyNinety(d.length) })
            .attr("width", function (d) { return xScale_thirtyNinety(d.x1) - xScale_thirtyNinety(d.x0) })
            .style("fill", "#F8971D")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height - yScale_thirtyNinety(d.length) })
            .on("mouseover", mouseover)
            .on("mousemove", (Event, d) => {
                tooltip
                    .html("Frequency " + d.length)
                    .style("left", (Event.x) / 2 - 100 + "px")
                    .style("top", (Event.y) / 2 + "px")
            })
            .on("mouseleave", mouseleave)

        container_g.selectAll(".bar3")
            .data(compute_thirtyseventy_ti)
            .enter()
            .append("rect")
            .attr("class", "bar3")
            .attr("x", function (d) { return xScale_thirtySeventyTi(d.x0) })
            .attr("y", function (d) { return yScale_thirtySeventyTi(d.length) })
            .attr("width", function (d) { return xScale_thirtySeventyTi(d.x1) - xScale_thirtySeventyTi(d.x0) })
            .style("fill", "#F8971D")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - yScale_thirtySeventyTi(d.length); })
            .on("mouseover", mouseover)
            .on("mousemove", (Event, d) => {
                tooltip
                    .html("Frequency " + d.length)
                    .style("left", (Event.x) / 2 - 100 + "px")
                    .style("top", (Event.y) / 2 + "px")
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
            .style("fill", "#F8971D")
            .style("opacity", 0.4)
            .attr("height", function (d) { return height - yScale_thirtySixty(d.length); })
            .on("mouseover", mouseover)
            .on("mousemove", (Event, d) => {
                tooltip
                    .html("Frequency " + d.length)
                    .style("left", (Event.x) / 2 - 100 + "px")
                    .style("top", (Event.y) / 2 + "px")
            })
            .on("mouseleave", mouseleave)
    })
}
main();
