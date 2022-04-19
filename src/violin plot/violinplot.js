function main() {

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;


    var svg = d3.select("#Nvidia-Violinplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    d3.csv("CSV/stock_and_time-Nvidia.csv").then(data => {

        var y = d3.scaleLinear()
            .domain([0, 60])
            .range([height, 0])
        svg.append("g").call(d3.axisLeft(y).ticks(10))

        var x = d3.scaleBand()
            .range([0, width])
            .domain(data.map((d) => {
                return d['chipset'];
            }))
            .padding(0.05)
        svg.append("g")
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
        console.log(bundledData)

        console.log(sumstatTwo.keys())

        var xNum = d3.scaleLinear()
            .range([0, x.bandwidth()])
            .domain([-maxNum, maxNum])

        svg
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