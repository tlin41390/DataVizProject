function main() {
    const canvasWidth = 800;
    const canvasHeight = 800;
    const margin = 300;

    const svg = d3.select("#scatterplot").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;
    //text for the canvas of the title
    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "20px")
        .attr("font-family", "sans-serif")
        .text("GPU prices in relation to Etherium Prices")

        
    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);

    const container_g = svg.append("g").attr("transform","translate(100,100)")

    d3.csv("../../CSV/ebay_prices.csv").then(data=>{ 
        xScale.domain([2000,4600]);
        yScale.domain([300,3000]);

        //append the circles on the graph and see what color scale to use based on the publisher
        container_g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .style("fill","black")
            .attr("class", "dot")
      			.attr("r",4)
            .attr("cx", function(d){ return xScale(+d["Etherium Price"]); })
            .attr("cy", function(d){ return yScale(+d["Prices"]); })
            //actions to display and remove tooltip

            //Display the X-axis
        container_g.append("g")
        .attr("transform", "translate(0, " + 500 + ")")
        .call(d3.axisBottom(xScale).tickFormat(function(d) {
            return d;
        }).ticks(10))

        container_g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return d;
        }).ticks(10))
    });
}
main();