function main() {

    const canvasWidth = 800;
    const canvasHeight = 800;
    const margin = 400;


    const svg = d3.select("body").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;
    
    const parseTime = d3.timeParse("%y-%b")

    const container_g = svg.append("g")
        .attr("transform","translate(100,100)");

    d3.csv("../../CSV/condensed_ebay_prices_etherium .csv", function (d) {
        return d;
    }).then(function (data) {

        for (d of data) {
            d.date = parseTime(d.Month);
            d.prices = +d.Prices;
        }

        const xScale = d3.scaleTime()
            .domain(d3.extent(data, (d) => { return d.date }))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => Number(d.Prices.replace(/[^0-9.-]+/g, "")))])
            .range(([height, 0]));

        const sumstat = d3.group(data, d => d.Item)
        container_g.append("g")
            .attr("transform","translate(0,"+ height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - 350)
            .attr("x",width - 250)
            .attr("font-size","30px")
            .attr("stroke","black")
            .text("Months")

        container_g.append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("font-size","25px")
            .attr("transform","rotate(-90)")
            .attr("y",40)
            .attr("x",-80)
            .attr("dy","-4.1em")
            .attr("stroke","black")
            .text("Prices for Items")

             //color scale for the different plays that are being represented.
        const color = d3.scaleOrdinal()
            .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#1e90ff','seagreen','aquamarine','yellow','blue','pink','coral','cyan'])

         container_g.selectAll(".line")
            .data(sumstat)
            .join("path")
            .attr("fill","none")
            .attr("stroke",(d)=>{ return color(d[0])})
            .attr("stroke-width",1.5)
            .attr("d",function(d){
                return d3.line()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.prices))(d[1])
                })

        container_g.selectAll(".label")
                .data(sumstat)
                .enter()
                .append("text")
                .datum(function(d){ return{id:d.date,value:d.prices}})
                .attr("class","label")
                .attr("transform", function(d){ return "translate(" + xScale(d.value.date)+ ","+ yScale(d.value.prices)+ ")";})
                .attr("x", 55)
                .attr("y",15)

    });
}
main();