function main() {

    const canvasWidth = 700;
    const canvasHeight = 700;
    const margin = 200;


    const svg = d3.select("#linechart-AMD").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    const parseTime = d3.timeParse("%y-%b")

    const container_g = svg.append("g")
        .attr("transform", "translate(100,100)");

    d3.csv("CSV/linechartData/rx6600xt.csv", function (d) {
        return d;
    }).then(function (data) {
        for (d of data) {
            d.date = parseTime(d.Month);
            d.prices = +d.Prices;
            console.log(d.date);
        }


        const xScale_thirty_sixty = d3.scaleTime()
            .domain(d3.extent(data, (d) => { return d.date }))
            .range([0, width / 2]);

        const yScale_thirty_sixty = d3.scaleLinear()
            .domain([0, 2000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(-30," + height / 2 + ")")
            .attr("font-size", "1px")
            .call(d3.axisBottom(xScale_thirty_sixty).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            }))
            .append("text")
            .attr("y", height - 775)
            .attr("x", width - 375)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 6600XT");

        container_g.append("g")
            .attr("transform", "translate(-30," + 0 + ")")
            .call(d3.axisLeft(yScale_thirty_sixty).tickFormat(function (d) {
                return d + "$";
            }))
        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#F89713', 'black'])

        container_g.selectAll(".line")
            .data(sumstat)
            .join("path")
            .attr("transform", "translate(-30," + 0 + ")")
            .attr("fill", "none")
            .attr("stroke", (d) => { return color(d[0]) })
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => xScale_thirty_sixty(d.date))
                    .y(d => yScale_thirty_sixty(d.prices))(d[1])
            })
    });
    d3.csv("CSV/linechartData/rx6700xt.csv", function (d) {
        return d;
    }).then(function (data) {

        for (d of data) {
            d.date = parseTime(d.Month);
            d.prices = +d.Prices;
        }


        const xScale_thirty_seventy_ti = d3.scaleTime()
            .domain(d3.extent(data, (d) => { return d.date }))
            .range([width / 2 + 30, height]);

        const yScale_thirty_seventy_ti = d3.scaleLinear()
            .domain([0, 2000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(0," + height / 2 + ")")
            .call(d3.axisBottom(xScale_thirty_seventy_ti).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            }))
            .attr("transform", "translate(0, " + height / 2 + ")")
            .append("text")
            .attr("y", height - 775)
            .attr("x", width - 100)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 6700XT");

        container_g.append("g")
            .attr("transform", "translate(" + (width / 2 + 30) + ",0)")
            .call(d3.axisLeft(yScale_thirty_seventy_ti).tickFormat(function (d) {
                return d + "$";
            }))

        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#F89713', 'black'])

        container_g.selectAll(".line")
            .data(sumstat)
            .join("path")
            .attr("fill", "none")
            .attr("stroke", (d) => { return color(d[0]) })
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => xScale_thirty_seventy_ti(d.date))
                    .y(d => yScale_thirty_seventy_ti(d.prices))(d[1])
            })
    });

    d3.csv("CSV/linechartData/rx6800xt.csv", function (d) {
        return d;
    }).then(function (data) {

        for (d of data) {
            d.date = parseTime(d.Month);
            d.prices = +d.Prices;
        }


        const xScale_thirty_eighty_ti = d3.scaleTime()
            .domain(d3.extent(data, (d) => { return d.date }))
            .range([0, width / 2]);

        const yScale_thirty_eighty_ti = d3.scaleLinear()
            .domain([000, 2000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(-30," + (height + 80) + ")")
            .call(d3.axisBottom(xScale_thirty_eighty_ti).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            }))
            .append("text")
            .attr("y", height - 775)
            .attr("x", width - 375)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 6800XT");

        container_g.append("g")
            .attr("transform", "translate(-30," + (height / 2 + 80) + ")")
            .call(d3.axisLeft(yScale_thirty_eighty_ti).tickFormat(function (d) {
                return d + "$";
            }))

        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#F89713', 'black'])

        container_g.selectAll(".line")
            .data(sumstat)
            .join("path")
            .attr("transform", "translate(-30," + (height / 2 + 80) + ")")
            .attr("fill", "none")
            .attr("stroke", (d) => { return color(d[0]) })
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => xScale_thirty_eighty_ti(d.date))
                    .y(d => yScale_thirty_eighty_ti(d.prices))(d[1])
            })
    });

    d3.csv("CSV/linechartData/rx6900.csv", function (d) {
        return d;
    }).then(function (data) {

        for (d of data) {
            d.date = parseTime(d.Month);
            d.prices = +d.Prices;
        }


        const xScale_thirty_ninety = d3.scaleTime()
            .domain(d3.extent(data, (d) => { return d.date }))
            .range([width / 2 + 30, width]);

        const yScale_thirty_ninety = d3.scaleLinear()
            .domain([0, 2000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(0," + (height + 80) + ")")
            .call(d3.axisBottom(xScale_thirty_ninety).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            })).append("text")
            .attr("y", height - 775)
            .attr("x", width - 100)
            .attr("font-size", "15px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("AMD Radeon RX 6900XT");

        container_g.append("g")
            .attr("transform", "translate(" + (width / 2 + 30) + "," + (height / 2 + 80) + ")")
            .call(d3.axisLeft(yScale_thirty_ninety).tickFormat(function (d) {
                return d + "$";
            }))

        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#F89713', 'black'])

        container_g.selectAll(".line")
            .data(sumstat)
            .join("path")
            .attr("fill", "none")
            .attr("transform", "translate(0," + (height / 2 + 80) + ")")
            .attr("stroke", (d) => { return color(d[0]) })
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => xScale_thirty_ninety(d.date))
                    .y(d => yScale_thirty_ninety(d.prices))(d[1])
            })
    });
}
main();