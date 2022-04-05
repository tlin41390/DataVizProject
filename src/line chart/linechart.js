function main(){

    var svg = d3.select('svg'),
        margin = {
            top: 20,
            right:80,
            bottom: 30,
            left:50,
        }, 
        width = svg.attr("width")-margin.left - margin.right,
        height = svg.attr("height")-margin.top - margin.bottom,
        g = svg.append("g").attr("transform","translate("+margin.left +","+margin.top+")");

        const parseTime = d3.timeParse("%y-%b")

    var x = d3.scaleTime().range([0,width - margin.right]),
        y = d3.scaleLinear().range([height,0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line().
        curve(d3.curveBasis)
        .x(function(d){return x(d.Month); })
        .y(function(d){ return y(d.Prices);});

    d3.csv("../../CSV/condensed_ebay_prices_etherium .csv",function(d){
        return d;
    }).then(function(data){

        let categories = Array.from(new Set(data.map(d=>d.Item)));

        for (d of data){
            d.date = parseTime(d.Month);
            console.log(d.date)
            for(var i =0,n=categories.length, c; i <n; ++i) d[c = categories[i]] = +d[c];
            
        }

        const items = data.categories.map(function(id){
            return{
                id: id,
                values: data.map(function(d){
                    return {date:d.date,prices:d[id]}
                })
            }
        })
    });
}
main();