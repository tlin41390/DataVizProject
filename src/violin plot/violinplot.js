function main() {
    const canvasWidth = 800;
    const canvasHeight = 800;
    const margin = 200;

    const svg = d3.select("body").append("svg")
        .attr("width",canvasWidth)
        .attr("height",canvasHeight)

    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;

    svg.append("text")
        .attr("x",50)
        .attr("y",50)
        .attr("font-size","20px")
        .attr("font-family","sans-serif")
        .text("Violin Plot for Distribution of In Stock Times for Nvidia GPUs")

    const xScale = d3.scaleBand().range([0,width]).padding(0.3);
    const yScale = d3.scaleLinear().range([height,0]);

    const container_g = svg.append("g")
        .attr("transform","translate(100,100)");

    d3.csv("../../CSV/stock_and_time - (Nvidia).csv",(d)=> {return{ model:d.chipset,stock:+d["time(minutes)"]}}).then((data)=>{
        xScale.domain(data.map((d)=>{
            return d['model'];
        }))
        yScale.domain([0,d3.max(data,(d)=>{return d['stock']})])
        container_g.append("g")
        .attr("transform","translate(0,"+height+")")
        .call(d3.axisBottom(xScale))


        container_g.append("g")
            .call(d3.axisLeft(yScale))

        var histogram = d3.histogram()
            .domain(yScale.domain())
            .thresholds(yScale.ticks(20))
            .value(d=>d)

        var sumstat = d3.rollup(data,
            a=>{
            let input = a.map(g=>g["stock"]);
            return histogram(input);
            },
            b=>b["model"]
        );

         const maxNum = Array.from(sumstat.values())
            .map((value, key) => d3.max(value.map(d => d.length)))
            .reduce((a, b) => a > b? a: b);

        var xNum = d3.scaleLinear()
            .range([0,xScale.bandwidth()])
            .domain([0,maxNum])

        container_g.selectAll("myViolin")
            .data(sumstat)
            .enter()
            .append("g")
            .attr("transform", function(d){
                return("translate("+(xScale(d[0]))+","+0+")")
            })

        
    
    });

    // const
}

main();