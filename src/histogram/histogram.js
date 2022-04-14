
function main() {
    const canvasWidth = 700;
    const canvasHeight = 700;
    const margin = 200;

    const svg = d3.select("body").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    const xScale = d3.scaleLinear().range([0, width / 2]);
    const yScale = d3.scaleLinear().range([height / 2, 0]);

    const x = d3.scaleLinear().range([width / 2 + 30, width])
    const y = d3.scaleLinear().range([height / 2, 0])

    const thirdX = d3.scaleLinear().range([0, width / 2])
    const thirdY = d3.scaleLinear().range([width, height / 2 + 30])

    const container_g = svg.append("g")
        .attr("transform", "translate(100,100)");

    d3.csv("../../CSV/stock_and_time-(Nvidia).csv").then(data => {
        xScale.domain([0, 60]);
        yScale.domain([0, 400]);
        x.domain([0, 60]);
        y.domain([0, 400]);
        thirdX.domain([0, 60]);
        thirdY.domain([0, 400]);

        let distributions_thirtyseventy = []
        let distributions_thirtyeighty = []
        let distributions_thirtyseventy_ti = []
        data.forEach((d) => {
            if (d.chipset == "rtx-3070") {
                distributions_thirtyseventy.push(d["time(minutes)"])
            } else if (d.chipset == "rtx-3080") {
                distributions_thirtyeighty.push(d["time(minutes)"])
            } else if (d.chipset == "rtx-3080ti") {
                distributions_thirtyseventy_ti.push(d["time(minutes)"])
            }
        })
        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(x))


        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(thirdX))

        container_g.append("g")
            .call(d3.axisLeft(thirdY).tickFormat(function (d) {
                return d;
            }).ticks())

        container_g.append("g")
            .attr("transform", "translate(0, " + height / 2 + ")")
            .call(d3.axisBottom(xScale))

        container_g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d;
            }).ticks())

        container_g.append("g")
            .call(d3.axisLeft(y).tickFormat(function (d) {
                return d;
            }).ticks())
            .attr("transform", "translate(" + ((width / 2) + 30) + "," + 0 + ")")

        const computeBins = d3.bin()
            .value(function (d) { return d })
            .domain(xScale.domain())
            .thresholds(xScale.ticks(10));

        const getOther = computeBins(distributions_thirtyeighty);
        const bins = computeBins(distributions_thirtyseventy);
        const getThird = computeBins(distributions_thirtyseventy_ti);

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
            .data(getThird)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xScale(d.x0) })
            .attr("y", function (d) { return yScale(d.length) })
            .attr("width", function (d) { return xScale(d.x1) - xScale(d.x0) })
            .style("fill", "green")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - yScale(d.length); })
            .on("mouseover", mouseover)
            .on("mousemove", (Event, d) => {
                tooltip
                    .html("Frequency " + d.length)
                    .style("left", (Event.x) / 2 - 100 + "px")
                    .style("top", (Event.y) / 2 + "px")
            })
            .on("mouseleave", mouseleave)

        container_g.selectAll(".bar2")
            .data(getOther)
            .enter()
            .append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) { return x(d.x0) })
            .attr("y", function (d) { return y(d.length) })
            .attr("width", function (d) { return x(d.x1) - x(d.x0) })
            .style("fill", "green")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height / 2 - y(d.length); })
            .on("mouseover", mouseover)
            .on("mousemove", (Event, d) => {
                tooltip
                    .html("Frequency " + d.length)
                    .style("left", (Event.x) / 2 - 100 + "px")
                    .style("top", (Event.y) / 2 + "px")
            })
            .on("mouseleave", mouseleave)

        container_g.selectAll(".bar3")
            .data(bins)
            .enter()
            .append("rect")
            .attr("class", "bar3")
            .attr("x", function (d) { return thirdX(d.x0) })
            .attr("y", function (d) { return thirdY(d.length) })
            .attr("width", function (d) { return thirdX(d.x1) - thirdX(d.x0) })
            .style("fill", "green")
            .style("opacity", 0.5)
            .attr("height", function (d) { return height - thirdY(d.length); })
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
