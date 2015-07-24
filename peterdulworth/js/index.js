var navHeight,
    thomas_arrowState = '.card-header-arrow-down', thomas_arrowStateNeg = '.card-header-arrow-up',
    rice_arrowState = '.card-header-arrow-down', rice_arrowStateNeg = '.card-header-arrow-up',
    disco_arrowState = '.card-header-arrow-down', disco_arrowStateNeg = '.card-header-arrow-up',
    hcya_arrowState = '.card-header-arrow-down', hcya_arrowStateNeg = '.card-header-arrow-up',
    brevitest_arrowState = '.card-header-arrow-down', brevitest_arrowStateNeg = '.card-header-arrow-up',
    $nav = $('nav'),
    $downArrowWrapper = $("#down-arrow-wrapper"),
    $downArrow = $("#down-arrow"),
    $gearWrapper = $('#gear-wrapper'),
    $body = $('body'),
    $gap = $('#main-page-margin'),
    paddingTop;

    navHeight = ($( window ).height() - $nav.outerHeight());
    $gap.css('height', navHeight);
    $downArrowWrapper.effect( 'bounce', { times: 3 }, 1000);

$(window).on('scroll touchmove', function () {
    if ($(window).scrollTop() > navHeight) {
        document.styleSheets[3].disabled = false;
        paddingTop = parseFloat($nav.outerHeight() + 20);
        $nav.addClass('navbar-fixed-top');
        $body.css('padding-top', paddingTop + 'px');
    } else {
        document.styleSheets[3].disabled = true;
        $nav.removeClass('navbar-fixed-top');
        $body.css('padding-top', 0);
    }

    if ($(window).scrollTop() > ((3/4)*navHeight)) {
        $gearWrapper.show();
    } else {
        $gearWrapper.hide();
    }

    if ($(window).scrollTop() !== 0) {
        $downArrowWrapper.hide();
    } else {
        $downArrowWrapper.show();
        $downArrowWrapper.effect( 'bounce', { times: 3 }, 800);
    }
});

var $thomasCardTxtWrapper = $('#thomas-card-text-wrapper'), $thomasCardTxt = $('#thomas-card-text'),
    $riceCardTxtWrapper = $('#rice-card-text-wrapper'), $riceCardTxt = $('#rice-card-text'),
    $discoCardTxtWrapper = $('#disco-card-text-wrapper'), $discoCardTxt = $('#disco-card-text'),
    $hcyaCardTxtWrapper = $('#hcya-card-text-wrapper'), $hcyaCardTxt = $('#hcya-card-text'),
    $brevitestCardTxtWrapper = $('#brevitest-card-text-wrapper'), $brevitestCardTxt = $('#brevitest-card-text');

$thomasCardTxtWrapper.on({
  mouseenter: function () {
    $(thomas_arrowState, '#thomas').show();
    $thomasCardTxtWrapper.toggleClass('cursor-hand');
  },
  mouseleave: function () {
    $(thomas_arrowState, '#thomas').hide();
    $thomasCardTxtWrapper.toggleClass('cursor-hand');
  }
});

$thomasCardTxtWrapper.on('click', function () {
  $thomasCardTxt.slideToggle(200, function () {
    if ($thomasCardTxt.is(':visible')) {
      thomas_arrowState = '.card-header-arrow-up';
      thomas_arrowStateNeg = '.card-header-arrow-down';
    }
    else {
      thomas_arrowState = '.card-header-arrow-down';
      thomas_arrowStateNeg = '.card-header-arrow-up';
    }
    $(thomas_arrowState, '#thomas').show();
    $(thomas_arrowStateNeg, '#thomas').hide();
  });
});

$riceCardTxtWrapper.on({
  mouseenter: function () {
    $(rice_arrowState, '#rice').show();
    $riceCardTxtWrapper.toggleClass('cursor-hand');
  },
  mouseleave: function () {
    $(rice_arrowState, '#rice').hide();
    $riceCardTxtWrapper.toggleClass('cursor-hand');
  }
});

$riceCardTxtWrapper.on('click', function () {
  $riceCardTxt.slideToggle(200, function () {
    if ($riceCardTxt.is(':visible')) {
      rice_arrowState = '.card-header-arrow-up';
      rice_arrowStateNeg = '.card-header-arrow-down';
    }
    else {
      rice_arrowState = '.card-header-arrow-down';
      rice_arrowStateNeg = '.card-header-arrow-up';
    }
    $(rice_arrowState, '#rice').show();
    $(rice_arrowStateNeg, '#rice').hide();
  });
});

$discoCardTxtWrapper.on({
  mouseenter: function () {
    $(disco_arrowState, '#disco').show();
    $discoCardTxtWrapper.toggleClass('cursor-hand');
  },
  mouseleave: function () {
    $(disco_arrowState, '#disco').hide();
    $discoCardTxtWrapper.toggleClass('cursor-hand');
  }
});

$discoCardTxtWrapper.on('click', function () {
  $discoCardTxt.slideToggle(200, function () {
    if ($discoCardTxt.is(':visible')) {
      disco_arrowState = '.card-header-arrow-up';
      disco_arrowStateNeg = '.card-header-arrow-down';
    }
    else {
      disco_arrowState = '.card-header-arrow-down';
      disco_arrowStateNeg = '.card-header-arrow-up';
    }
    $(disco_arrowState, '#disco').show();
    $(disco_arrowStateNeg, '#disco').hide();
  });
});

$hcyaCardTxtWrapper.on({
  mouseenter: function () {
    $(hcya_arrowState, '#hcya').show();
    $hcyaCardTxtWrapper.toggleClass('cursor-hand');
  },
  mouseleave: function () {
    $(hcya_arrowState, '#hcya').hide();
    $hcyaCardTxtWrapper.toggleClass('cursor-hand');
  }
});

$hcyaCardTxtWrapper.on('click', function () {
  $hcyaCardTxt.slideToggle(200, function () {
    if ($hcyaCardTxt.is(':visible')) {
      hcya_arrowState = '.card-header-arrow-up';
      hcya_arrowStateNeg = '.card-header-arrow-down';
    }
    else {
      hcya_arrowState = '.card-header-arrow-down';
      hcya_arrowStateNeg = '.card-header-arrow-up';
    }
    $(hcya_arrowState, '#hcya').show();
    $(hcya_arrowStateNeg, '#hcya').hide();
  });
});

$brevitestCardTxtWrapper.on({
  mouseenter: function () {
    $(brevitest_arrowState, '#brevitest').show();
    $brevitestCardTxtWrapper.toggleClass('cursor-hand');
  },
  mouseleave: function () {
    $(brevitest_arrowState, '#brevitest').hide();
    $brevitestCardTxtWrapper.toggleClass('cursor-hand');
  }
});

$brevitestCardTxtWrapper.on('click', function () {
  $brevitestCardTxt.slideToggle(200, function () {
    if ($brevitestCardTxt.is(':visible')) {
      brevitest_arrowState = '.card-header-arrow-up';
      brevitest_arrowStateNeg = '.card-header-arrow-down';
    }
    else {
      brevitest_arrowState = '.card-header-arrow-down';
      brevitest_arrowStateNeg = '.card-header-arrow-up';
    }
    $(brevitest_arrowState, '#brevitest').show();
    $(brevitest_arrowStateNeg, '#brevitest').hide();
  });
});

$downArrow.on('mouseenter', function(e) {
    $downArrowWrapper.effect( 'bounce', { times: 3 }, 800);
});

$downArrowWrapper.on('click', function(e) {
    $('html, body').animate({
        scrollTop: navHeight + 1
    }, 600);
});

$(document).on('click','#education-nav-btn', function(e) {
    $('html, body').animate({
        scrollTop: navHeight + 2
    }, 800);
});

$(document).on('click','#extracurricular-nav-btn', function(e) {
    $('html, body').animate({
        scrollTop: $("#extracurricular").offset().top - $nav.outerHeight() - 20
    }, 800);
});

$(document).on('click','#experience-nav-btn', function(e) {
    $('html, body').animate({
        scrollTop: $("#experience").offset().top - $nav.outerHeight() - 20
    }, 800);
});

setInterval(function() {
    if($downArrowWrapper.is(':visible') &&  !($downArrow.is(":hover"))) {
        $downArrowWrapper.effect( 'bounce', { times: 3 }, 800);
    }
}, 10000);

var forceLayout;
(forceLayout = function (fireworks) {
  var width = $(window).width(),
      height = $(window).height();

  var nodes = d3.range(200).map( // range creates an array with 200 elements. map applies function to each element
      function () {
          var radiusMax, radiusMin;
          if ($(window).width() >= 1000) {
              radiusMax = 16;
              radiusMin = 4;
          } else if ($(window).width() < 1000 && $(window).width() >= 600) {
              radiusMax = 12;
              radiusMin = 3;
          } else if ($(window).width() < 600) {
              radiusMax = 12;
              radiusMin = 3;
          }
          return {
              radius: (Math.random() * (radiusMax - radiusMin)) + radiusMin
          };
      }),
      root = nodes[0];

  root.radius = 0;
  root.fixed = true;

var force = d3.layout.force()
    .gravity(0.1) // force pulling nodes to the center (like a spring)
    .charge(function(d, i) { return i ? -30 : -1000; }) // first value applies to all nodes except root. second value applies to root (cursor)
    .nodes(nodes) // sets layout nodes to nodes array
    .size([width, height]); // layout canvas size - affects centering

force.start();

var i = 1;

if (fireworks) {
  setInterval(function () {
    if(i % 2 && $(window).scrollTop() === 0) {
      force.nodes(nodes).charge(function(d, i) { return i ? -300 : 0; }).gravity(0.1); // first value applies to all nodes except root. second value applies to root (cursor)
      force.start();
    } else {
      force.nodes(nodes).charge(function(d, i) { return i ? 10 : 0; }).gravity(0.5); // first value applies to all nodes except root. second value applies to root (cursor)
      force.start();
    }
    i++;
  }, 500);
}

  var svg = d3.select("#force").append("svg") // find element with id: force and add child element svg
      .attr("width", width) // set attribute width: width
      .attr("height", height); // set attribute height: height

if (fireworks) {
  svg.selectAll("circle") // select all of svg with tag circle
      .data(nodes.slice(1)) // eliminate everything before position 1
      .enter().append("circle")  // enter: placeholder nodes for each data element for which no corresponding existing DOM element was found in the current selection
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d, i) { if((i % 3) === 0) { return 'red' } else if((i % 3) === 1) { return '#f8f8f8' } else if((i % 3) === 2) { return 'blue' }   });
} else {
  svg.selectAll("circle") // select all of svg with tag circle
      .data(nodes.slice(1)) // eliminate everything before position 1
      .enter().append("circle")  // enter: placeholder nodes for each data element for which no corresponding existing DOM element was found in the current selection
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d, i) { if((i % 3) === 0) { return '#6baed6' } else if((i % 3) === 1) { return '#9ecae1' } else if((i % 3) === 2) { return '#c6dbef' }   });
}
  force.on("tick", function(e) {
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));

    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

  svg.on("mousemove", function() {
    var p1 = d3.mouse(this);
    root.px = p1[0];
    root.py = p1[1];
    // force.size([2*p1[0], 2*p1[1]]);
    force.resume();
  });

  function collide (node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.radius + quad.point.radius;
        if (l < r) {
          l = (l - r) / l * .5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }
})();

// ************************************************************************************************************************************* //
var gearLayout;
(gearLayout = function () {
    var width = ($(window).width() >= 500) ? 500: 300,
        height = width,
        radius = 0.16*height,
        x = Math.sin(2 * Math.PI / 3),
        y = Math.cos(2 * Math.PI / 3);

    $(document).ready(function() {
        if ($(window).width() < 500) {
          $('#gear-wrapper').css('width', '300px');
          $('#gear-wrapper').css('height', '300px');
        }
    });

    var offset = 0,
        speed = 4,
        start = Date.now();

    var svg = d3.select("#gear-wrapper").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g") // group elements
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(.55)") // center gear
      .append("g");

    var frame = svg.append("g")
        .datum({radius: Infinity});

    frame.append("g")
        .attr("class", "annulus")
        .datum({teeth: 80, radius: -radius * 5, annulus: true})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "sun")
        .datum({teeth: 16, radius: radius})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(0,-" + radius * 3 + ")")
        .datum({teeth: 32, radius: -radius * 2})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(" + -radius * 3 * x + "," + -radius * 3 * y + ")")
        .datum({teeth: 32, radius: -radius * 2})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(" + radius * 3 * x + "," + -radius * 3 * y + ")")
        .datum({teeth: 32, radius: -radius * 2})
      .append("path")
        .attr("d", gear);

    d3.selectAll("input[name=reference]")
        .data([radius * 5, Infinity, -radius])
        .on("change", function(radius1) {
          var radius0 = frame.datum().radius, angle = (Date.now() - start) * speed;
          frame.datum({radius: radius1});
          svg.attr("transform", "rotate(" + (offset += angle / radius0 - angle / radius1) + ")");
        });

    d3.selectAll("input[name=speed]")
        .on("change", function() { speed = +this.value; });

    function gear(d) {
      var n = d.teeth,
          r2 = Math.abs(d.radius),
          r0 = r2 - 8,
          r1 = r2 + 8,
          r3 = d.annulus ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
          da = Math.PI / n,
          a0 = -Math.PI / 2 + (d.annulus ? Math.PI / n : 0),
          i = -1,
          path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
      while (++i < n) path.push(
          "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
          "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
          "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
          "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
          "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
          "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
      path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
      return path.join("");
    }

    d3.timer(function() {
      var angle = (Date.now() - start) * speed,
          transform = function(d) { return "rotate(" + angle / d.radius + ")"; };
      frame.selectAll("path").attr("transform", transform);
      frame.attr("transform", transform); // frame of reference
    });
})();

$(window).on('resize', function() {
    navHeight = ($( window ).height() - $('nav').outerHeight());
    $('#main-page-margin').css('height', navHeight);
    $( "#force" ).empty();
    $( "#gear-wrapper" ).empty();
    forceLayout();
    gearLayout();
});

$('#fireworks').on('click', function () {
    $(this).toggleClass('blueShadow');
    $( "#force" ).empty();
    if ($(this).hasClass('blueShadow')) {
      $( '#name' ).html("<span style='color:red'>P</span><span style='color:white'>e</span><span style='color:blue'>t</span><span style='color:red'>e</span><span style='color:white'>r</span> <span style='color:blue'>D</span><span style='color:red'>u</span><span style='color:white'>l</span><span style='color:blue'>w</span><span style='color:red'>o</span><span style='color:white'>r</span><span style='color:blue'>t</span><span style='color:red'>h</span>");
      forceLayout(true);
    } else {
      $( '#name' ).html("Peter Dulworth");
      forceLayout(false);
    }
});