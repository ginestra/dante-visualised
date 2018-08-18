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






  var svg = d3.select("svg#stacked"),
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var data = [
    {
        "line_number": 1,
        "chars": 36,
        "rhyme_length": 0
    },
    {
        "line_number": 2,
        "chars": 33,
        "rhyme_length": 0
    },
    {
        "line_number": 3,
        "chars": 33,
        "rhyme_length": 3
    },
    {
        "line_number": 4,
        "chars": 38,
        "rhyme_length": 3
    },
    {
        "line_number": 5,
        "chars": 37,
        "rhyme_length": 3
    },
    {
        "line_number": 6,
        "chars": 33,
        "rhyme_length": 3
    },
    {
        "line_number": 7,
        "chars": 36,
        "rhyme_length": 4
    },
    {
        "line_number": 8,
        "chars": 40,
        "rhyme_length": 3
    },
    {
        "line_number": 9,
        "chars": 40,
        "rhyme_length": 4
    },
    {
        "line_number": 10,
        "chars": 38,
        "rhyme_length": 2
    },
    {
        "line_number": 11,
        "chars": 37,
        "rhyme_length": 2
    },
    {
        "line_number": 12,
        "chars": 30,
        "rhyme_length": 2
    },
    {
        "line_number": 13,
        "chars": 43,
        "rhyme_length": 2
    },
    {
        "line_number": 14,
        "chars": 31,
        "rhyme_length": 2
    },
    {
        "line_number": 15,
        "chars": 37,
        "rhyme_length": 2
    },
    {
        "line_number": 16,
        "chars": 38,
        "rhyme_length": 3
    },
    {
        "line_number": 17,
        "chars": 34,
        "rhyme_length": 2
    },
    {
        "line_number": 18,
        "chars": 39,
        "rhyme_length": 3
    },
    {
        "line_number": 19,
        "chars": 32,
        "rhyme_length": 2
    },
    {
        "line_number": 20,
        "chars": 34,
        "rhyme_length": 2
    },
    {
        "line_number": 21,
        "chars": 39,
        "rhyme_length": 2
    },
    {
        "line_number": 22,
        "chars": 35,
        "rhyme_length": 2
    },
    {
        "line_number": 23,
        "chars": 33,
        "rhyme_length": 2
    },
    {
        "line_number": 24,
        "chars": 39,
        "rhyme_length": 3
    }
  ];

  // fix pre-processing
  var keys = [];
  for (key in data[0]){
    if (key != "line_number")
      keys.push(key);
  }
  data.forEach(function(d){
    d.total = 0;
    keys.forEach(function(k){
      d.total += d[k];
    })
  });

  // data.sort(function(a, b) {
  //   return b.total - a.total;
  // });
  x.domain(data.map(function(d) {
    return d.line_number;
  }));
  y.domain([0, d3.max(data, function(d) {
    return d.total;
  })]).nice();
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
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
      return x(d.data.line_number);
    })
    .attr("y", function(d) {
      return y(d[1]);
    })
    .attr("height", function(d) {
      return y(d[0]) - y(d[1]);
    })
    .attr("width", x.bandwidth());

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks().pop()) + 0.5)
    .attr("dy", "0.32em");
    // .attr("fill", "#000")
    // .attr("font-weight", "bold")
    // .attr("text-anchor", "start")
    // .text("Population");

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
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", z);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) {
      return d;
    });
});