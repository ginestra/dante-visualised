/* Using D3JS to render the data I saved in json format */

$(document).ready(function() {
  d3.json('/assets/json/json_inferno.json').then(function(d) {

    var char_lines = [],
        text_lines = [],
        line_numbers = [],
        rhymes = [],
        margin = { top: 20, right: 0, bottom: 0, left: 40 }
        height = 60000 - margin.top - margin.bottom,
        width = 1080 - margin.left - margin.right,

        total_lines = 0;

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

    // TODO: improve to automise field name (eg. cantica, canto, etc.)
    $.each(d.cantica, function(k, v) {
      $.each(v.canto, function(k, v) {
        $.each(v.tercet, function(k, v) {
          $.each(v.lines, function(k, v) {
            char_lines.push(v.chars);
            text_lines.push(v.text);
            line_numbers.push(v.line_number);
            rhymes.push(v.rhyme);
            // console.log('v.chars: ' + v.chars + '\n' +
            //             'v.text: ' + v.text + '\n' +
            //             'v.line_number: ' + v.line_number);
            total_lines++;
          });
        });
      });     
    });

    console.log(total_lines);

    // for (i = 0; i < d.cantica[0].canto[33].tercet[0].lines.length; i++) {
    //     char_lines.push(d.cantica[0].canto[33].tercet[0].lines[i].chars);
    //     text_lines.push(d.cantica[0].canto[33].tercet[0].lines[i].text);
    //     line_numbers.push(d.cantica[0].canto[33].tercet[0].lines[i].line_number);
    // }

    yScale = d3.scaleLinear()
        .domain([0, total_lines])
        .range([0, height]);

    yAxisValues = d3.scaleLinear()
        .domain([0, total_lines])
        .range([0, height]);

    yAxisTicks = d3.axisLeft(yAxisValues)
        .ticks(total_lines)


    xScale = d3.scaleLinear()
        // .domain([0, d3.max(line_numbers)])
        .domain([0, d3.max(char_lines)])
        .range([0, width])

    xAxisValues = d3.scaleLinear()
        // .domain([line_numbers[0], line_numbers[(line_numbers.length - 1)]])
        .domain([0, d3.max(char_lines)])
        .range([0, width])

    xAxisTicks = d3.axisTop(xAxisValues)
        // .ticks(d3.line_numbers.every(1))
        .ticks(20)

    // colors = d3.scaleLinear()
    //     .domain([0, d3.max(char_lines)/2, d3.max(char_lines)])
    //     .range(['#fff', '#2D8BCF', '#ffbb00'])

    // Trying ordinal scale
    colors = d3.scaleOrdinal()
        .domain([d3.max(char_lines)-3, d3.max(char_lines)])
        .range(['#666', '#ffbb00'])

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    testViz = d3.select('#viz').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')')
        .selectAll('rect').data(char_lines)
        .enter().append('rect')
          .attr('fill', colors)
          // .attr('width', function(d, i) {
          //   return xScale(i);
          // })
          .attr('width', 0)
          .attr('height', '10px')
          .attr('y', function(d, i) {
            return yScale(i);
          })
          .attr('x', width)
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div><strong>chars:</strong> ' + d +
              '<br><strong>line:</strong> ' + line_numbers[i] + 
              '<br><strong>text:</strong> ' + text_lines[i] + 
              '<br><strong>rhyme:</strong> ' + rhymes[i] + '</div>'
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
            .attr('transform', 'translate(40, 20)')
            .call(yAxisTicks)

    xGuide = d3.select('#viz svg').append('g')
            .attr('transform', 'translate(40, 20)')
            .call(xAxisTicks)

    testViz.transition()
        .attr('width', function(d) {
          return xScale(d);
        })
        .attr('x', 0)
        .delay(function(d, i) {
          return i * 2;
        })
        .duration(1000)
        .ease(d3.easeBounceOut)
  }); // json import
});
