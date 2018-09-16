$(document).ready(function() {

  // Stacked horizontal

    // Inferno
    var svg = d3.select("svg#stacked_inf"),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        mHeight = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 
            margin.top + ")");


    d3.json('/assets/json/json_inferno_it.json').then(function(d) {

      var keys = ["chars", "rhyme_length"],
          newdata = [],
          total = 0,
          absolute_lines = [],
          colors = [];

      var tooltip;

      tooltip = d3.select('body')
          .append('div')
          .style('position', 'absolute')
          .style('padding', '1px 0')
          .style('background', 'white')
          .style('opacity', 0);

      $.each(d.cantica, function(k, v) {
        $.each(v.canto, function(k, v) {
          $.each(v.lines, function(k, v) {
            var attr = {};
            attr["line_number"] = v.line_number;
            attr["chars"] = v.chars;
            attr["rhyme_length"] = v.rhyme_length;
            attr["rhyme"] = v.rhyme;
            attr["absolute_line"] = total++;
            attr["color"] = v.color;
            newdata.push(attr);
            absolute_lines.push(total);
            colors.push(v.color);
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
        .range(["#d8d8d8", "#ff8c00"]);

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
      .attr("height", ((mHeight / total) - 2) + "px")
      .attr("fill", function(d) {
        var key = d3.select(this.parentNode).datum().key;
        if (key == 'rhyme_length') {
          return "rgba" + d.data.color;
        }
        return "#d8d8d8";
      })
      .attr("class", function(d) {
        var key = d3.select(this.parentNode).datum().key;
        if (key == 'rhyme_length') {
          return "rhyme";
        }
        return "line";
      })
      .on('mouseover', function(d, i) {
        tooltip.transition().duration(200)
          .style('opacity', .9)
        tooltip.html(
          '<div class="tooltip">' +
          '<strong>line: </strong>' + d.data.line_number + 
          '<br><strong>rhyme: </strong>' + d.data.rhyme +
          '<br><strong>rhyme_length: </strong>' + d.data.rhyme_length +
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
      .data(keys.slice())
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("y", - 15)
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function(d) {
        if (d === 'rhyme_length') {
          return "transparent";
        }
        return "#d8d8d8";
      })
      .attr("stroke", "#666666")
      .attr("margin-bottom", "10px");

    legend.append("text")
      .attr("y", - 5)
      .attr("x", width - 24)
      .attr("dy", 0)
      .text(function(d) {
        return d;
      });
    });


    // // Purgatorio
    // var svg = d3.select("svg#stacked_pur"),
    //     margin = { top: 20, right: 20, bottom: 30, left: 40 },
    //     width = +svg.attr("width") - margin.left - margin.right,
    //     mHeight = +svg.attr("height") - margin.top - margin.bottom,
    //     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 
    //         margin.top + ")");


    // d3.json('/assets/json/json_purgatorio_it.json').then(function(d) {

    //   var keys = ["chars", "rhyme_length"],
    //       newdata = [],
    //       total = 0,
    //       absolute_lines = [],
    //       colors = [];

    //   var tooltip;

    //   tooltip = d3.select('body')
    //       .append('div')
    //       .style('position', 'absolute')
    //       .style('padding', '1px 0')
    //       .style('background', 'white')
    //       .style('opacity', 0);

    //   $.each(d.cantica, function(k, v) {
    //     $.each(v.canto, function(k, v) {
    //       $.each(v.lines, function(k, v) {
    //         var attr = {};
    //         attr["line_number"] = v.line_number;
    //         attr["chars"] = v.chars;
    //         attr["rhyme_length"] = v.rhyme_length;
    //         attr["rhyme"] = v.rhyme;
    //         attr["absolute_line"] = total++;
    //         attr["color"] = v.color;
    //         newdata.push(attr);
    //         absolute_lines.push(total);
    //         colors.push(v.color);
    //       });
    //     });
    //   });

    //   var y = d3.scaleBand()
    //     .rangeRound([0, absolute_lines])
    //     .paddingInner(0.05)
    //     .align(0.1);

    //   var x = d3.scaleLinear()
    //     .rangeRound([0, (width - 200)]);

    //   var z = d3.scaleOrdinal()
    //     .range(["#d8d8d8", "#ff8c00"]);

    //   x.domain([0, d3.max(newdata, function(d) {
    //     return d.chars;
    //   })]);
    //   y.domain([0, total]);
    //   z.domain(keys);


    // yAxisVal = d3.scaleLinear()
    //     .domain([0, total])
    //     .range([0, mHeight + 24]);

    // yTicks = d3.axisLeft(yAxisVal)
    //     .ticks(total);

    // g.append("g")
    //   .selectAll("g")
    //   .data(d3.stack().keys(keys)(newdata))
    //   .enter().append("g")
    //   .attr("fill", function(d) {
    //     return z(d.key);
    //   })
    //   .selectAll("rect")
    //   .data(function(d) {
    //     return d;
    //   })
    //   .enter().append("rect")
    //   .attr("x", function(d) {
    //     return x(d[0]);
    //   })
    //   .attr("y", function(d) {
    //     return d.data.absolute_line * 10;
    //   })
    //   .attr("width", function(d) {
    //     return x(d[1] - d.data.rhyme_length) - x(d[0] - d.data.rhyme_length);
    //   })
    //   .attr("height", ((mHeight / total) - 2) + "px")
    //   .attr("fill", function(d) {
    //     var key = d3.select(this.parentNode).datum().key;
    //     if (key == 'rhyme_length') {
    //       return "rgba" + d.data.color;
    //     }
    //     return "#d8d8d8";
    //   })
    //   .attr("class", function(d) {
    //     var key = d3.select(this.parentNode).datum().key;
    //     if (key == 'rhyme_length') {
    //       return "rhyme";
    //     }
    //     return "line";
    //   })
    //   .on('mouseover', function(d, i) {
    //     tooltip.transition().duration(200)
    //       .style('opacity', .9)
    //     tooltip.html(
    //       '<div class="tooltip">' +
    //       '<strong>line: </strong>' + d.data.line_number + 
    //       '<br><strong>rhyme: </strong>' + d.data.rhyme +
    //       '<br><strong>rhyme_length: </strong>' + d.data.rhyme_length +
    //       '</div>'
    //     )
    //       .style('left', (d3.event.pageX) + 'px')
    //       .style('top', (d3.event.pageY) + 'px')
    //     tempColor = this.style.fill;
    //     d3.select(this)
    //       .style('fill', 'yellow');
    //   })
    //   .on('mouseout', function(d) {
    //       tooltip.html('');
    //       d3.select(this)
    //         .style('fill', tempColor);
    //   });

    // g.append("g")
    //   .attr("class", "axis")
    //   .call(d3.axisTop(x));

    // g.append("g")
    //   .attr("class", "axis")
    //   .call(yTicks);

    // var legend = g.append("g")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 10)
    //   .attr("text-anchor", "end")
    //   .selectAll("g")
    //   .data(keys.slice())
    //   .enter().append("g")
    //   .attr("transform", function(d, i) {
    //     return "translate(0," + i * 20 + ")";
    //   });

    // legend.append("rect")
    //   .attr("y", - 15)
    //   .attr("x", width - 19)
    //   .attr("width", 19)
    //   .attr("height", 19)
    //   .attr("fill", function(d) {
    //     if (d === 'rhyme_length') {
    //       return "transparent";
    //     }
    //     return "#d8d8d8";
    //   })
    //   .attr("stroke", "#666666")
    //   .attr("margin-bottom", "10px");

    // legend.append("text")
    //   .attr("y", - 5)
    //   .attr("x", width - 24)
    //   .attr("dy", 0)
    //   .text(function(d) {
    //     return d;
    //   });
    // });


    // // Paradiso
    // var svg = d3.select("svg#stacked_par"),
    //     margin = { top: 20, right: 20, bottom: 30, left: 40 },
    //     width = +svg.attr("width") - margin.left - margin.right,
    //     mHeight = +svg.attr("height") - margin.top - margin.bottom,
    //     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + 
    //         margin.top + ")");


    // d3.json('/assets/json/json_paradiso_it.json').then(function(d) {

    //   var keys = ["chars", "rhyme_length"],
    //       newdata = [],
    //       total = 0,
    //       absolute_lines = [],
    //       colors = [];

    //   var tooltip;

    //   tooltip = d3.select('body')
    //       .append('div')
    //       .style('position', 'absolute')
    //       .style('padding', '1px 0')
    //       .style('background', 'white')
    //       .style('opacity', 0);

    //   $.each(d.cantica, function(k, v) {
    //     $.each(v.canto, function(k, v) {
    //       $.each(v.lines, function(k, v) {
    //         var attr = {};
    //         attr["line_number"] = v.line_number;
    //         attr["chars"] = v.chars;
    //         attr["rhyme_length"] = v.rhyme_length;
    //         attr["rhyme"] = v.rhyme;
    //         attr["absolute_line"] = total++;
    //         attr["color"] = v.color;
    //         newdata.push(attr);
    //         absolute_lines.push(total);
    //         colors.push(v.color);
    //       });
    //     });
    //   });

    //   var y = d3.scaleBand()
    //     .rangeRound([0, absolute_lines])
    //     .paddingInner(0.05)
    //     .align(0.1);

    //   var x = d3.scaleLinear()
    //     .rangeRound([0, (width - 200)]);

    //   var z = d3.scaleOrdinal()
    //     .range(["#d8d8d8", "#ff8c00"]);

    //   x.domain([0, d3.max(newdata, function(d) {
    //     return d.chars;
    //   })]);
    //   y.domain([0, total]);
    //   z.domain(keys);


    // yAxisVal = d3.scaleLinear()
    //     .domain([0, total])
    //     .range([0, mHeight + 24]);

    // yTicks = d3.axisLeft(yAxisVal)
    //     .ticks(total);

    // g.append("g")
    //   .selectAll("g")
    //   .data(d3.stack().keys(keys)(newdata))
    //   .enter().append("g")
    //   .attr("fill", function(d) {
    //     return z(d.key);
    //   })
    //   .selectAll("rect")
    //   .data(function(d) {
    //     return d;
    //   })
    //   .enter().append("rect")
    //   .attr("x", function(d) {
    //     return x(d[0]);
    //   })
    //   .attr("y", function(d) {
    //     return d.data.absolute_line * 10;
    //   })
    //   .attr("width", function(d) {
    //     return x(d[1] - d.data.rhyme_length) - x(d[0] - d.data.rhyme_length);
    //   })
    //   .attr("height", ((mHeight / total) - 2) + "px")
    //   .attr("fill", function(d) {
    //     var key = d3.select(this.parentNode).datum().key;
    //     if (key == 'rhyme_length') {
    //       return "rgba" + d.data.color;
    //     }
    //     return "#d8d8d8";
    //   })
    //   .attr("class", function(d) {
    //     var key = d3.select(this.parentNode).datum().key;
    //     if (key == 'rhyme_length') {
    //       return "rhyme";
    //     }
    //     return "line";
    //   })
    //   .on('mouseover', function(d, i) {
    //     tooltip.transition().duration(200)
    //       .style('opacity', .9)
    //     tooltip.html(
    //       '<div class="tooltip">' +
    //       '<strong>line: </strong>' + d.data.line_number + 
    //       '<br><strong>rhyme: </strong>' + d.data.rhyme +
    //       '<br><strong>rhyme_length: </strong>' + d.data.rhyme_length +
    //       '</div>'
    //     )
    //       .style('left', (d3.event.pageX) + 'px')
    //       .style('top', (d3.event.pageY) + 'px')
    //     tempColor = this.style.fill;
    //     d3.select(this)
    //       .style('fill', 'yellow');
    //   })
    //   .on('mouseout', function(d) {
    //       tooltip.html('');
    //       d3.select(this)
    //         .style('fill', tempColor);
    //   });

    // g.append("g")
    //   .attr("class", "axis")
    //   .call(d3.axisTop(x));

    // g.append("g")
    //   .attr("class", "axis")
    //   .call(yTicks);

    // var legend = g.append("g")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 10)
    //   .attr("text-anchor", "end")
    //   .selectAll("g")
    //   .data(keys.slice())
    //   .enter().append("g")
    //   .attr("transform", function(d, i) {
    //     return "translate(0," + i * 20 + ")";
    //   });

    // legend.append("rect")
    //   .attr("y", - 15)
    //   .attr("x", width - 19)
    //   .attr("width", 19)
    //   .attr("height", 19)
    //   .attr("fill", function(d) {
    //     if (d === 'rhyme_length') {
    //       return "transparent";
    //     }
    //     return "#d8d8d8";
    //   })
    //   .attr("stroke", "#666666")
    //   .attr("margin-bottom", "10px");

    // legend.append("text")
    //   .attr("y", - 5)
    //   .attr("x", width - 24)
    //   .attr("dy", 0)
    //   .text(function(d) {
    //     return d;
    //   });
    // });
});

// Remove the loading spinner once the page has completed loading
$(window).on('load', function() {
  setTimeout(function(){
    $('.loading').addClass('hide');
  }, 10000);
});