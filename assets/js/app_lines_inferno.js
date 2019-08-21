/* Using D3JS to render the data I saved in json format */

$(document).ready(function() {
  d3.json('/dante-visualised/assets/json/json_inferno_it.json').then(function(d) {

    var cantos = [],
        lines = [],
        char_lines = [],
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

    $.each(d.cantica, function(k, v) {
      $.each(v.canto, function(k, v) {
        cantos.push(v.title);
        // console.log(v.title);
        $.each(v.lines, function(k, v) {
          char_lines.push(v.chars);
          text_lines.push(v.text);
          line_numbers.push(v.line_number);
          rhymes.push(v.rhyme);
          total_lines++;
        });
      });     
    });

    var longest_line_char = Math.max(...char_lines);

    $('.metadata').append(
      '<h3>Metadata</h3>' + 
      '<p><strong>Number of lines: </strong>' +
      total_lines +
      '<br><strong>Number of cantos: </strong>' +
      cantos.length +
      '<br><strong>Longest line: </strong>' +
      longest_line_char + " chars" +
      '</p>'
    );

    console.log(total_lines);

    yScale = d3.scaleLinear()
        .domain([0, total_lines])
        .range([0, height]);

    yAxisValues = d3.scaleLinear()
        .domain([0, total_lines])
        .range([0, height]);

    yAxisTicks = d3.axisLeft(yAxisValues)
        .ticks(total_lines);

    xScale = d3.scaleLinear()
        .domain([0, d3.max(char_lines)])
        .range([0, width]);

    xAxisValues = d3.scaleLinear()
        .domain([0, d3.max(char_lines)])
        .range([0, width]);

    xAxisTicks = d3.axisTop(xAxisValues)
        .ticks(20);

    colors = d3.scaleLinear()
        .domain([0, d3.max(char_lines)/2, d3.max(char_lines)])
        .range(['#fff', '#2d8bcf', '#ffbb00']);

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
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .selectAll('rect').data(char_lines)
        .enter().append('rect')
          .attr('fill', colors)
          .attr('stroke', function(d, i) {
            if (line_numbers[i] % 3 === 0) {
              return "#000";
            }
            return "";
          })
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
              '<div class="tooltip">' +
              '<br><strong>chars: </strong>' + d +
              '<br><strong>line: </strong>' + line_numbers[i] + 
              '<br><strong>text: </strong>' + text_lines[i] + 
              '<br><strong>rhyme: </strong>' + rhymes[i] +
              '</div>'
            )
              .style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY) + 'px')
            tempColor = this.style.fill;
            d3.select(this)
              .style('fill', 'yellow');
    })
    .on('mouseout', function(d) {
        tooltip.html('');
        d3.select(this)
          .style('fill', tempColor);
    });


    yGuide = d3.select('#viz svg').append('g')
            .attr('transform', 'translate(40, 20)')
            .call(yAxisTicks);

    xGuide = d3.select('#viz svg').append('g')
            .attr('transform', 'translate(40, 20)')
            .call(xAxisTicks);

    testViz.transition()
        .attr('width', function(d) {
          return xScale(d);
        })
        .attr('x', 0)
        .delay(function(d, i) {
          return i * 2;
        })
        .duration(1000)
        .ease(d3.easeBounceOut);
  }); // json import
});

// Remove the loading spinner once the page has completed loading
$(window).on('load', function() {
  setTimeout(function(){
    $('.loading').addClass('hide');
  }, 10000);
});