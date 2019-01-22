$(document).ready(function() {
  // Calendar/Pattern view - Repetition stars
  d3.json('/dante-visualised/assets/json/stars.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 150 - margin.top - margin.bottom,
        width = 1080 - margin.left - margin.right;

    var positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    var cantiche = [],
        cantos = [],
        data = [],
        lines = [],
        line_nums = [],
        total_lines = 0;

    $.each(d.cantica, function(k, v) {
      title = v.title;
      $.each(v.canto, function(k, v) {
        canto = v.number;
        $.each(v.line, function(k, v) {
          var attr = {};
          attr["title"] = title;
          attr["number"] = canto;
          attr["line_num"] = v.line_num;
          attr["text"] = v.text;
          data.push(attr);
        });
      });
    });

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#repetition_stars').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(data)
        .enter().append('rect')
          .attr('fill', function(d) {
            if (d.title == "Inferno") {
              return '#6b0504';
            } else if (d.title == "Purgatorio") {
              return '#c2b8b2';
            }
            return '#5e5c6c';
          })
          .attr('width', '44px')
          .attr('height', '44px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 22 === 0) {
              positionx = 0;
            }
            return ((positionx * 50) - 50);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 22 === 0) {
              positiony += 50;
            }
            return positiony;
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>cantica: </strong>' + d.title + 
              '<br><strong>canto: </strong>' + d.number + 
              '<br><strong>line number: </strong>' + d.line_num + 
              '<br><strong>text: </strong>' + d.text +
              '</div>'
            )
              .style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY) + 'px')
            tempColor = this.style.fill;
            d3.select(this)
              .style('fill', '#bbc5ab');
          })
          .on('mouseout', function(d) {
              tooltip.html('');
              d3.select(this)
                .style('fill', tempColor);
          });
  }); // json import

  // Calendar/Pattern view - Repetition stars
  d3.json('/dante-visualised/assets/json/christ.json').then(function(d) {

    var margin = { top: 20, right: 0, bottom: 0, left: 0 }
        height = 150 - margin.top - margin.bottom,
        width = 1080 - margin.left - margin.right;

    var positionx = 0,
        positiony = 0,
        counter = 0;

    var tooltip;

    var cantiche = [],
        cantos = [],
        data = [],
        lines = [],
        line_nums = [],
        total_lines = 0;

    $.each(d.cantica, function(k, v) {
      title = v.title;
      $.each(v.canto, function(k, v) {
        canto = v.number;
        $.each(v.line, function(k, v) {
          var attr = {};
          attr["title"] = title;
          attr["number"] = canto;
          attr["line_num"] = v.line_num;
          attr["text"] = v.text;
          data.push(attr);
        });
      });
    });

    tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '1px 0')
        .style('background', 'white')
        .style('opacity', 0);

    d3.select('#repetition_christ').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .selectAll('rect').data(data)
        .enter().append('rect')
          .attr('fill', function(d) {
            if (d.title == "Inferno") {
              return '#6b0504';
            } else if (d.title == "Purgatorio") {
              return '#c2b8b2';
            }
            return '#5e5c6c';
          })
          .attr('width', '44px')
          .attr('height', '44px')
          .attr('x', function(d) {
            positionx++;
            if (positionx % 22 === 0) {
              positionx = 0;
            }
            return ((positionx * 50) - 50);
          })
          .attr('y', function(d) {
            counter++;
            if (counter % 22 === 0) {
              positiony += 50;
            }
            return positiony;
          })
          .on('mouseover', function(d, i) {
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div class="tooltip">' +
              '<strong>cantica: </strong>' + d.title + 
              '<br><strong>canto: </strong>' + d.number + 
              '<br><strong>line number: </strong>' + d.line_num + 
              '<br><strong>text: </strong>' + d.text +
              '</div>'
            )
              .style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY) + 'px')
            tempColor = this.style.fill;
            d3.select(this)
              .style('fill', '#bbc5ab');
          })
          .on('mouseout', function(d) {
              tooltip.html('');
              d3.select(this)
                .style('fill', tempColor);
          });
  }); // json import
});

// Remove the loading spinner once the page has completed loading
$(window).on('load', function() {
  setTimeout(function(){
    $('.loading').addClass('hide');
  }, 800);
});