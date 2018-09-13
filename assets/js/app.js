/* Using D3JS to render the data I saved in json format */

$(document).ready(function() {
  d3.json('/assets/json/json_inferno_it.json').then(function(d) {

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
        .range(['#fff', '#2D8BCF', '#ffbb00']);

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
              '<div class="tooltip">' +
              // '<strong>Canto: </strong>' + d3.data(cantos).title +
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


  // Stacked horizontal
  var svg = d3.select("svg#stacked"),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      mHeight = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 
          margin.top + ")");


  d3.json('/assets/json/json_inferno_it.json').then(function(d) {

    var keys = ["chars", "rhyme_length"],
        newdata = [],
        total = 0,
        absolute_lines = [];

    $.each(d.cantica, function(k, v) {
      $.each(v.canto, function(k, v) {
        $.each(v.lines, function(k, v) {
          var attr = {};
          attr["line_number"] = v.line_number;
          attr["chars"] = v.chars;
          attr["rhyme_length"] = v.rhyme_length;
          attr["absolute_line"] = total++;
          newdata.push(attr);
          absolute_lines.push(total);
        });
      });     
    });

    var y = d3.scaleBand()
      .rangeRound([0, absolute_lines])
      .paddingInner(0.05)
      .align(0.1);

    var x = d3.scaleLinear()
      .rangeRound([0, (width - 200)]);

    var z = d3.scaleOrdinal()
      .range(["#6b486b", "#ff8c00"]);

    x.domain([0, d3.max(newdata, function(d) {
      return d.chars;
    })]);
    y.domain([0, total]);
    z.domain(keys);


  yAxisVal = d3.scaleLinear()
      .domain([0, total])
      .range([0, mHeight + 24]);

  yTicks = d3.axisLeft(yAxisVal)
      .ticks(total);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(newdata))
    .enter().append("g")
    .attr("fill", function(d) {
      return z(d.key);
    })
    .selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter().append("rect")
    .attr("x", function(d) {
      return x(d[0]);
    })
    .attr("y", function(d) {
      return d.data.absolute_line * 10;
    })
    .attr("width", function(d) {
      return x(d[1] - d.data.rhyme_length) - x(d[0] - d.data.rhyme_length);
    })
    .attr("height", ((mHeight / total) - 2) + "px");

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisTop(x));

  g.append("g")
    .attr("class", "axis")
    .call(yTicks);

  var legend = g.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(0," + i * 20 + ")";
    });

  legend.append("rect")
    .attr("y", - 15)
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", z);

  legend.append("text")
    .attr("y", - 5)
    .attr("x", width - 24)
    .attr("dy", 0)
    .text(function(d) {
      return d;
    });
  });

  // Calendar/Pattern view - Sentiment analysis

});
