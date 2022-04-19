function main() {

    const canvasWidth = 700;
    const canvasHeight = 700;
    const margin = 200;


    const svg = d3.select("#linechart-Nvidia").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    const parseTime = d3.timeParse("%y-%b")

    const container_g = svg.append("g")
        .attr("transform", "translate(100,100)");

    d3.csv("CSV/linechartData/thirty_sixty.csv", function (d) {
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
            .domain([000, 3000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(-30," + height / 2 + ")")
            .attr("font-size", "1px")
            .call(d3.axisBottom(xScale_thirty_sixty).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            }))

        container_g.append("g")
            .attr("transform", "translate(-30," + 0 + ")")
            .call(d3.axisLeft(yScale_thirty_sixty).tickFormat(function (d) {
                return d + "$";
            }))
        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#76b900', 'black'])

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
    d3.csv("CSV/linechartData/thirty_seventy_ti.csv", function (d) {
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
            .domain([000, 3000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(0," + height / 2 + ")")
            .call(d3.axisBottom(xScale_thirty_seventy_ti).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            }))

        container_g.append("g")
            .attr("transform", "translate(" + (width / 2 + 30) + ",0)")
            .call(d3.axisLeft(yScale_thirty_seventy_ti).tickFormat(function (d) {
                return d + "$";
            }))

        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#76b900', 'black'])

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

    d3.csv("CSV/linechartData/thirty_eighty_ti.csv", function (d) {
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
            .domain([000, 3000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(-30," + (height + 80) + ")")
            .call(d3.axisBottom(xScale_thirty_eighty_ti).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            }))

        container_g.append("g")
            .attr("transform", "translate(-30," + (height / 2 + 80) + ")")
            .call(d3.axisLeft(yScale_thirty_eighty_ti).tickFormat(function (d) {
                return d + "$";
            }))

        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#76b900', 'black'])

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

    d3.csv("CSV/linechartData/thirty_ninety.csv", function (d) {
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
            .domain([0, 3000])
            .range(([height / 2, 0]));

        const sumstat = d3.group(data, d => d.GPUs)

        container_g.append("g")
            .attr("transform", "translate(0," + (height + 80) + ")")
            .call(d3.axisBottom(xScale_thirty_ninety).tickFormat(function (d) {
                return d3.timeFormat("%b")(d);
            }))

        container_g.append("g")
            .attr("transform", "translate(" + (width / 2 + 30) + "," + (height / 2 + 80) + ")")
            .call(d3.axisLeft(yScale_thirty_ninety).tickFormat(function (d) {
                return d + "$";
            }))

        //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#76b900', 'black'])

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