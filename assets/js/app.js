/* Using D3JS to render the data I saved in json format */
console.log('hello outside document ready');

$(document).ready(function() {

    // d3.json('/assets/json/json_sample.json').then(function(d) {
  //     var   char_lines = [],
  //           height = 400,
  //           width = 1080;

  //     var   tempColor,
  //           yScale,
  //           xScale,
  //           colors,
  //           tooltip,
  //           myChart;


  //     for (var i = 0; i < d.cantica[0].canto[0].tercet[0].lines.length; i++) {
  //       char_lines.push(d.cantica[0].canto[0].tercet[0].lines[i].chars);
  //     }

  //     yScale = d3.scaleLinear()
  //       .domain([0, d3.max(char_lines)])
  //       .range([0,height]);

  //     xScale = d3.scaleBand()
  //       .domain(char_lines)
  //       .paddingInner(.3)
  //       .paddingOuter(.1)
  //       .range([0, width])

  //     colors = d3.scaleLinear()
  //       .domain([0, char_lines.length *.33,
  //                   char_lines.length *.66,
  //                   char_lines.length
  //                   ])
  //       .range(['#B58929', '#C61C6F',
  //               '#268BD2', '#85992C'])

  //     tooltip = d3.select('body')
  //       .append('div')
  //       .style('position', 'absolute')
  //       .style('padding', '0 5px')
  //       .style('background', 'white')
  //       .style('opacity', 0);

  //     myChart = d3.select('#viz').append('svg')
  //       .attr('width', width)
  //       .attr('height', height)
  //       .selectAll('rect').data(char_lines)
  //       .enter().append('rect')
  //         .attr('fill', function(d, i) {
  //           return colors(i)
  //         })
  //         .attr('width', function(d) {
  //           return xScale.bandwidth();
  //         })
  //         .attr('height', 0)
  //         .attr('x', function(d) {
  //           return xScale(d);
  //         })
  //         .attr('y', height)
          
  //         .on('mouseover', function(d) {
  //           tooltip.transition().duration(200)
  //             .style('opacity', .9)
  //           tooltip.html(d)
  //             .style('left', (d3.event.pageX -35) + 'px')
  //             .style('top', (d3.event.pageY -30) + 'px')
  //           tempColor = this.style.fill;
  //           d3.select(this)
  //             .style('fill', 'yellow')
  //         })

  //         .on('mouseout', function(d) {
  //           d3.select(this)
  //             .style('fill', tempColor)
  //         });

  //     myChart.transition()
  //       .attr('height', function(d) {
  //         return yScale(d);
  //       })
  //       .attr('y', function(d) {
  //         return height - yScale(d);
  //       })
  //       .delay(function(d, i) {
  //         return i * 20;
  //       })
  //       .duration(1000)
  //       .ease(d3.easeBounceOut)
  // })

    // console.log('ebfore d3');

    d3.json('/assets/json/json_sample.json').then(function(d) {

        console.log(d.cantica[0].canto[0].tercet[0].lines[0].text);

        var char_lines = [],
            text_lines = [],
            line_numbers = [],
            margin = { top: 0, right: 0, bottom: 30, left: 20 }
            height = 400 - margin.top - margin.bottom,
            width = 1080 - margin.left - margin.right;

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

        for (i = 0; i < d.cantica[0].canto[0].tercet[0].lines.length; i++) {
            char_lines.push(d.cantica[0].canto[0].tercet[0].lines[i].chars);
            text_lines.push(d.cantica[0].canto[0].tercet[0].lines[i].text);
            line_numbers.push(d.cantica[0].canto[0].tercet[0].lines[i].line_number);
        }

        yScale = d3.scaleLinear()
            .domain([0, d3.max(char_lines)])
            .range([0, height]);

        yAxisValues = d3.scaleLinear()
            .domain([0, d3.max(char_lines)])
            .range([height, 0]);


        yAxisTicks = d3.axisLeft(yAxisValues)
            .ticks(10)

        xScale = d3.scaleLinear()
            .domain([0, d3.max(line_numbers)])
            .range([0, width])

        xAxisValues = d3.scaleLinear()
            .domain([line_numbers[0], line_numbers[(line_numbers.length - 1)]])
            .range([0, width])

        xAxisTicks = d3.axisBottom(xAxisValues)
            // .ticks(d3.line_numbers.every(1))
            .ticks(20)

        colors = d3.scaleLinear()
            .domain([0, 20, d3.max(char_lines)])
            .range(['#fff', '#2D8BCF', '#ffbb00'])

        tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('padding', '0 1px')
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
              // .attr('width', function(d, i) {
              //   return xScale(i);
              // })
              .attr('width','4px')
              .attr('height', 0)
              .attr('x', function(d, i) {
                return xScale(i);
              })
              .attr('y', height)
              .on('mouseover', function(d, i) {
                tooltip.transition().duration(200)
                  .style('opacity', .9)
                tooltip.html(
                  '<div>chars: ' + d + '<br>line: ' + i + '<br>verse: ' + text_lines[i] + '</div>'
                )
                  .style('left', (d3.event.pageX) + 'px')
                  .style('top', (d3.event.pageY) + 'px')
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
