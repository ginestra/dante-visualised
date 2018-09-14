$(document).ready(function() {
  // Calendar/Pattern view - Sentiment analysis
  d3.json('/assets/json/json_sentiment_inferno_en.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 1600 - margin.top - margin.bottom,
        width = 300 - margin.left - margin.right;

    var the_lines = d.lines,
        positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#inferno').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(the_lines)
        .enter().append('rect')
          .attr('fill', function(d) {
            return d.color;
          })
          .attr('width', '10px')
          .attr('height', '10px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 30 === 0) {
              positionx = 0;
            }
            return ((positionx * 10) - 10);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 30 === 0) {
              positiony += 10;
            }
            return positiony;
          })
          .style('opacity', function(d) {
            return Math.abs(d.compound);
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>line: </strong>' + d.line_number + 
              '<br><strong>text: </strong>' + d.text +
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
  }); // json import

    d3.json('/assets/json/json_sentiment_purgatorio_en.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 1600 - margin.top - margin.bottom,
        width = 300 - margin.left - margin.right;

    var the_lines = d.lines,
        positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#purgatorio').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(the_lines)
        .enter().append('rect')
          .attr('fill', function(d) {
            return d.color;
          })
          .attr('width', '10px')
          .attr('height', '10px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 30 === 0) {
              positionx = 0;
            }
            return ((positionx * 10) - 10);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 30 === 0) {
              positiony += 10;
            }
            return positiony;
          })
          .style('opacity', function(d) {
            return Math.abs(d.compound);
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>line: </strong>' + d.line_number + 
              '<br><strong>text: </strong>' + d.text +
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
  });

    d3.json('/assets/json/json_sentiment_paradiso_en.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 1600 - margin.top - margin.bottom,
        width = 300 - margin.left - margin.right;

    var the_lines = d.lines,
        positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#paradiso').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(the_lines)
        .enter().append('rect')
          .attr('fill', function(d) {
            return d.color;
          })
          .attr('width', '10px')
          .attr('height', '10px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 30 === 0) {
              positionx = 0;
            }
            return ((positionx * 10) - 10);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 30 === 0) {
              positiony += 10;
            }
            return positiony;
          })
          .style('opacity', function(d) {
            return Math.abs(d.compound);
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>line: </strong>' + d.line_number + 
              '<br><strong>text: </strong>' + d.text +
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
  });

    // NO NEUTRALS

    d3.json('/assets/json/json_sentiment_no_neutral_inferno_en.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 1600 - margin.top - margin.bottom,
        width = 300 - margin.left - margin.right;

    var the_lines = d.lines,
        positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#inferno2').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(the_lines)
        .enter().append('rect')
          .attr('fill', function(d) {
            return d.color;
          })
          .attr('width', '10px')
          .attr('height', '10px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 30 === 0) {
              positionx = 0;
            }
            return ((positionx * 10) - 10);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 30 === 0) {
              positiony += 10;
            }
            return positiony;
          })
          .style('opacity', function(d) {
            return Math.abs(d.compound);
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>line: </strong>' + d.line_number + 
              '<br><strong>text: </strong>' + d.text +
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
  });

    // NO NEUTRALS

    d3.json('/assets/json/json_sentiment_no_neutral_purgatorio_en.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 1600 - margin.top - margin.bottom,
        width = 300 - margin.left - margin.right;

    var the_lines = d.lines,
        positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#purgatorio2').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(the_lines)
        .enter().append('rect')
          .attr('fill', function(d) {
            return d.color;
          })
          .attr('width', '10px')
          .attr('height', '10px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 30 === 0) {
              positionx = 0;
            }
            return ((positionx * 10) - 10);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 30 === 0) {
              positiony += 10;
            }
            return positiony;
          })
          .style('opacity', function(d) {
            return Math.abs(d.compound);
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>line: </strong>' + d.line_number + 
              '<br><strong>text: </strong>' + d.text +
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
  });

    // NO NEUTRALS

    d3.json('/assets/json/json_sentiment_no_neutral_paradiso_en.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 1600 - margin.top - margin.bottom,
        width = 300 - margin.left - margin.right;

    var the_lines = d.lines,
        positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#paradiso2').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(the_lines)
        .enter().append('rect')
          .attr('fill', function(d) {
            return d.color;
          })
          .attr('width', '10px')
          .attr('height', '10px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 30 === 0) {
              positionx = 0;
            }
            return ((positionx * 10) - 10);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 30 === 0) {
              positiony += 10;
            }
            return positiony;
          })
          .style('opacity', function(d) {
            return Math.abs(d.compound);
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>line: </strong>' + d.line_number + 
              '<br><strong>text: </strong>' + d.text +
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
  });
});