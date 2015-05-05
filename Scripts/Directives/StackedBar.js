var stackedBar = function (ForecastMgr,$timeout,forecastParams) {
    
    return {
        restrict: 'EA',
        bindToController: true,
        require: '^forecastControls',
        controllerAs: 'graphCtrl',
        templateUrl: '/Views/Templates/stackedBar.html',
        scope: true,
        controller: function ($scope) {
        
            var graphCtrl = this;
            
            graphCtrl.data = undefined;
            
            graphCtrl.spin = true;
            
            graphCtrl.params = forecastParams.getparams();
            
            graphCtrl.refresh = function () {
                ForecastMgr.getForecast(graphCtrl.params).then(
                function (response) {
        
                    graphCtrl.data = response;
        
                    var lastrow = response[response.length - 1];
                    var income = 0;
                    var outgoing = 0;
        
                    for (var i = 0; i < response.length; i++) {
                        income += response[i].total_payments;
                        outgoing += response[i].total_deductions;
                    }
        
                    //graphCtrl.headlines.balance = lastrow.balance;
                    //graphCtrl.headlines.savings = lastrow.total_savings;
                    //graphCtrl.headlines.income = income;
                    //graphCtrl.headlines.outgoing = outgoing;
                });
        };
        
        $scope.$on('redrawChart',graphCtrl.refresh());    
        
    },

    link: function(scope, elem, attrs) {
        
        scope.$watch(function(){return scope.graphCtrl.data;},
        function(newVal,oldVal) { 
        //Margins, width, height
        if (newVal !== oldVal && newVal.length > 0) {
            var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                width = 800 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
    
            var parseDate = function (date) {
                return new Date(date);
            };
    
            //X scale
            var x = d3.time.scale()
                .range([0, width]);
    
            //Y scale
            var y = d3.scale.linear()
                .rangeRound([height,0]);
    
            //Colour palette as a scale
            var color = d3.scale.ordinal()
                .range(["#5cb85c", "#f53f3f","#f0ad4e", "#0066FF"]);
    
            //XAxis Declare
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
    
            //YaXis Define
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"));
    
            //Create a SVG and add a 'g' (generic svg element)
            var svg = d3.select(elem.children()[1]).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("class","graphcanvas")
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
            //START USING DATA
    
            //What points will we plot? Filter the names for what we're plotting
            color.domain(d3.keys(newVal[0]).filter(function (key) {
                return (key !== "caldate" && key !== "payment_details" && key !== "deduction_details" && key !=="savings_details" && key !=="savings")
            }));
    
            //Associate newVal with the colours in a new 'amounts' array
            newVal.forEach(function (d) {
                d.amounts = color.domain().map(function (name) { return { name: name, yPos: Math.max(0, parseInt(d[name])), height: Math.abs(d[name]) } });
                d.labels = [d.payment_details + " " + d.deduction_details]
                d.caldate = parseDate(d.caldate);
            });
    
            //Total Bank Balance
            var balanceline = d3.svg.line()
              .x(function (d) { return x(d.caldate); })
              .y(function (d) { return y(d.balance); });
    
            //Total Savings
            var savingsline = d3.svg.line()
              .x(function (d) { return x(d.caldate); })
              .y(function (d) { return y(d.total_savings); });
    
            // X domain is the dates
            x.domain(d3.extent(newVal, function (d) { return d.caldate; }));
    
            // Y domain is the biggest negative to the biggest positive
            y.domain([
                d3.min(newVal, function (d) { return parseInt(d["total_deductions"]); }),
                d3.max(newVal, function (d) { return parseInt(d["balance"]); })
            ]);
    
            //Create an X axis
            svg.append("g")
                .attr("class", "xaxis")
                .attr("transform", "translate(0," + y(0) + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function (d) { return "rotate(-65)"});
    
            //Create a Y axis
            svg.append("g")
                .attr("class", "yaxis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end");
    
            // Create a line for the totals
            svg.append("path")
                .datum(newVal)
                .attr("class", "balanceline")
                .attr("d", balanceline);
    
            svg.append("path")
                .datum(newVal)
                .attr("class", "savingsline")
                .attr("d", savingsline);
    
            //Create an array of G's to contain the newVal
            var bars = svg.selectAll(".date")
                .data(newVal)
            .enter().append("g")
                .attr("class", "g")
                .attr("transform", function (d) { return "translate(" + x(d.caldate) + ",0)"; });
    
            bars.selectAll("rect")
                .data(function (d) { return [d.amounts[0], d.amounts[1]];})
              .enter().append("rect")
                .attr("width", width / newVal.length)
                .attr("y", y(0))
                .attr("height", 0)
                .style("fill", function (d) { return color(d.name); });
    
            bars.selectAll("rect")
                .transition()
                .attr("y", function (d) { return y(d.yPos); })
                .attr("height", function (d) { return y(0) - y(d.height); })
                .duration(1000);
    
            //Create the labels
            bars.selectAll("svg.title")
                .data(function (d) { return [d.labels]; })
                .enter().append("svg:title")
                .text(function (d) { return JSON.stringify(d); });
    
            //Create a legend
            var legend = svg.selectAll(".legend")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(-20," + i * 20 + ")"; });
    
                legend.append("rect")
                    .attr("x", width - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", color);
    
                legend.append("text")
                    .attr("x", width - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function (d) { return d; });
                
                scope.graphCtrl.spin = false;
                scope.graphCtrl.data = [];   
            }
            },true);
        }   
    };
};

stackedBar.$inject = ['ForecastMgr','$timeout','forecastParams'];
