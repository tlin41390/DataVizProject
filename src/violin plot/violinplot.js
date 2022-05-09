function main() {

    var margin = 200;
    var canvasWidth = 700;
    var canvasHeight = 700;


    var svg = d3.select("#Nvidia-Violinplot")
        .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    const container_g = svg.append("g").attr("transform", "translate(100,100)")


    d3.csv("CSV/stock_and_time-Nvidia.csv").then(data => {

        var y = d3.scaleLinear()
            .domain([0, 60])
            .range([height, 0])
        container_g.append("g").call(d3.axisLeft(y).ticks(10))

        var x = d3.scaleBand()
            .range([0, width])
            .domain(data.map((d) => {
                return d['chipset'];
            }))
            .padding(0.05)
        container_g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        var histogram = d3.bin()
            .domain(y.domain())
            .thresholds(y.ticks(10))
            .value(d => d)

        var sumstatTwo = d3.rollup(data, (d) => {
            let input = d.map((g) => { return g['time']; })
            return (histogram(input))
        }, (d) => { return d.chipset; })

        var bundledData = []

        var maxNum = 0

        sumstatTwo.forEach((values, keys) => {
            var allBins = sumstatTwo.get(keys)
            var lengths = allBins.map(function (a) { return a.length; })
            var longuest = d3.max(lengths)
            if (longuest > maxNum) { maxNum = longuest }
            bundledData.push({ key: keys, value: values })
        })

        var xNum = d3.scaleLinear()
            .range([0, x.bandwidth()])
            .domain([-maxNum, maxNum])

        container_g
            .selectAll("myViolin")
            .data(bundledData)
            .enter()
            .append("g")
            .attr("transform", function (d) { return ("translate(" + x(d.key) + " ,0)") }) // Translation on the right to be at the group position
            .append("path")
            .datum(function (d) { return (d.value) })
            .style("stroke", "none")
            .style("fill", "#76b900")
            .attr("d", d3.area()
                .x0(function (d) { return (xNum(-d.length)) })
                .x1(function (d) { return (xNum(d.length)) })
                .y(function (d) { return (y(d.x0)) })
                .curve(d3.curveCatmullRom)
            )
    })
}

main();