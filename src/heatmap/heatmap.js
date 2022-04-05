function main(){
    const canvasWidth = 800;
    const canvasHeight = 800;
    const margin = 200;

    const svg = d3.select("body").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    //add the text to the canvas for the title

    svg.append("text")
        .attr("transform", "translate(100, 0)")
        .attr("x",50)
        .attr("y", 50)
        .attr("font-size", "20px")
        .attr("font-family","sans-serif")
        .text("HeatMap of Popularity of GPUS bought by Monthly Basis")

    const container_g = svg.append("g")
        .attr("transform","translate(100,100)");
    
    d3.csv("../../CSV/condensed_ebay_prices.csv",(d)=> {return{time:d["Month"],mode:d["GPUs"],bought:+d["Sold"]}}).then(data=>{
        const myGroups = Array.from(new Set(data.map(d=>d.mode)))
        const myRows = Array.from(new Set(data.map(d=>d.time)))
        console.log(myGroups);
        console.log(myRows);

        const x = d3.scaleBand()
            .range([0,width])
            .domain(myRows)
            .padding(0.05)

        const y = d3.scaleBand()
            .range([height,0])
            .domain(myGroups)
            .padding(0.05)

        container_g.append("g")
            .style("font-size",8)
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove()

        container_g.append("g")
            .style("font-size",8)
            .attr("transform",'translate(0,'+height+")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()

        const myColor = d3.scaleSequential()
            .interpolator(d3.interpolateOranges)
            .domain([10,d3.max(data,(d)=>{return d.bought})])

        container_g.selectAll()
            .data(data,(d)=>{return d.time+":"+d.mode})
            .join("rect")
                .attr("x",(d)=>{return x(d.time)})
                .attr("y",(d)=>{return y(d.mode)})
                .attr("rx",4)
                .attr("ry",4)
                .attr("width",x.bandwidth())
                .attr("height",y.bandwidth())
                .style("fill",(d)=>{return myColor(d.bought)})
                .on("mouseover", function(event,a) {
                    //Get this bar's x/y values, then augment for the tooltip
                    var xPosition = parseFloat(d3.select(this).attr("x"))+100;
                    var yPosition = parseFloat(d3.select(this).attr("y"))+100;
    
                //Update the tooltip position and value
                d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(a.bought);
                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
                })
                .on("mouseout", function() {
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
            })
    
    })



}
main();