/* Using D3JS to render the data I saved in json format */
console.log('hello outside document ready');

$(document).ready(function() {

    console.log('ebfore d3');

    d3.json('/assets/json/json_sample.json').then(function(d) {

        console.log('hello');

        var char_lines = [],
            text_lines = [],
            line_numbers = [],
            margin = { top: 0, right: 0, bottom: 30, left: 20 }
            height = 400 - margin.top - margin.bottom,
            width = 600 - margin.left - margin.right;

        var tempColor,
            yScale,
            yAxisValues,
            yAxisTicks,
            yGuide,
            xScale,
            xAxisValues,
            xAxisTicks,
            xGuide,
            colors,
            tooltip,
            testViz;

        for (i = 0; i < d.lines.length; i++) {
            char_lines.push(d.lines[i].chars);
            text_lines.push(d.lines[i].text);
            line_numbers.push(d.lines[i].line_number);
        }

        yScale = d3.scaleLinear()
            .domain([0, d3.max(char_lines)])
            .range([0, height]);

        yAxisValues = d3.scaleLinear()
            .domain([0, d3.max(char_lines)])
            .range([height, 0]);


        yAxisTicks = d3.axisLeft(yAxisValues)
            .ticks(10)

        xScale = d3.scaleBand()
            .domain(char_lines)
            .paddingInner(.1)
            .paddingOuter(.1)
            .range([0, width])

        xAxisValues = d3.scaleTime()
            .domain([line_numbers[0],line_numbers[(line_numbers.length - 1)]])
            .range([0, width])

        xAxisTicks = d3.axisBottom(xAxisValues)
            .ticks(d3.line_number.every(1))

        colors = d3.scaleLinear()
            .domain([0, 65, d3.max(char_lines)])
            .range(['#FFFFFF', '#2D8BCF', '#DA3637'])

        tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('opacity', 0);

        testViz = d3.select('#viz').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
              'translate(' + margin.left + ',' + margin.right + ')')
            .selectAll('rect').data(char_lines)
            .enter().append('rect')
              .attr('fill', colors)
              .attr('width', function(d) {
                return xScale.bandwidth();
              })
              .attr('height', 0)
              .attr('x', function(d) {
                return xScale(d);
              })
              .attr('y', height)
              .on('mouseover', function(d) {
                tooltip.transition().duration(200)
                  .style('opacity', .9)
                tooltip.html(
                  '<div style="font-size: 2rem; font-weight: bold">' +
                    d + '&deg;</div>'
                )
                  .style('left', (d3.event.pageX -35) + 'px')
                  .style('top', (d3.event.pageY -30) + 'px')
                tempColor = this.style.fill;
                d3.select(this)
                  .style('fill', 'yellow')
        })

        .on('mouseout', function(d) {
            tooltip.html('')
            d3.select(this)
            .style('fill', tempColor)
        });


        yGuide = d3.select('#viz svg').append('g')
                .attr('transform', 'translate(20,0)')
                .call(yAxisTicks)

        xGuide = d3.select('#viz svg').append('g')
                .attr('transform', 'translate(20,'+ height + ')')
                .call(xAxisTicks)

        testViz.transition()
            .attr('height', function(d) {
              return yScale(d);
            })
            .attr('y', function(d) {
              return height - yScale(d);
            })
            .delay(function(d, i) {
              return i * 20;
            })
            .duration(1000)
            .ease(d3.easeBounceOut)
    }); // json import
});
