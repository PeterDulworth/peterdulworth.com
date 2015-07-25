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

(function () {
    var app = {
        thomasArrowState: {
            pos: '.card-header-arrow-down',
            neg: '.card-header-arrow-up',
            context: '#thomas'
        },
        riceArrowState: {
            pos: '.card-header-arrow-down',
            neg: '.card-header-arrow-up',
            context: '#rice'
        },
        discoArrowState: {
            pos: '.card-header-arrow-down',
            neg: '.card-header-arrow-up',
            context: '#disco'
        },
        hcyaArrowState: {
            pos: '.card-header-arrow-down',
            neg: '.card-header-arrow-up',
            context: '#hcya'
        },
        brevitestArrowState: {
            pos: '.card-header-arrow-down',
            neg: '.card-header-arrow-up',
            context: '#brevitest'
        },
        mainPageMargin: 0,
        bodyPaddingTop: 0,

        init: function () {
            this.cacheDom();
            this.render();
            this.bindEvents();
            // setInterval(function() {
            // if(this.$downArrowWrapper.is(':visible') &&  !(this.$downArrow.is(":hover"))) {
            //         this.$downArrowWrapper.effect( 'bounce', { times: 3 }, 800);
            //     }
            // }, 10000);
        },
        cacheDom: function () {
            this.$nav = $('nav');
            this.$downArrowWrapper = $("#down-arrow-wrapper");
            this.$downArrow = $("#down-arrow");
            this.$gearWrapper = $('#gear-wrapper');
            this.$body = $('body');
            this.$gap = $('#main-page-margin');
            this.$window = $(window);
            this.$fireworks = $('#fireworks');
            this.educationNavBtn = $('#education-nav-btn');
            this.extracurricularNavBtn = $('#extracurricular-nav-btn');
            this.experienceNavBtn = $('#experience-nav-btn');
            this.$thomasCardTxtWrapper = $('#thomas-card-text-wrapper');
            this.$thomasCardTxt = this.$thomasCardTxtWrapper.find('#thomas-card-text');
            this.$riceCardTxtWrapper = $('#rice-card-text-wrapper');
            this.$riceCardTxt = this.$riceCardTxtWrapper.find('#rice-card-text');
            this.$discoCardTxtWrapper = $('#disco-card-text-wrapper'); this.$discoCardTxt = this.$discoCardTxtWrapper.find('#disco-card-text');
            this.$hcyaCardTxtWrapper = $('#hcya-card-text-wrapper'); this.$hcyaCardTxt = this.$hcyaCardTxtWrapper.find('#hcya-card-text');
            this.$brevitestCardTxtWrapper = $('#brevitest-card-text-wrapper'); this.$brevitestCardTxt = this.$brevitestCardTxtWrapper.find('#brevitest-card-text');
        },
        bindEvents: function () {
            this.$window.on('scroll touchmove', this.windowScroll.bind(this));
            this.$window.on('resize', this.windowResize.bind(this));
            this.$downArrow.on('mouseenter', this.downArrowMouseEnter.bind(this));
            this.$downArrowWrapper.on('click', {scrollTop: this.mainPageMargin + 1, duration: 800}, this.scrollToVal.bind(this));
            this.educationNavBtn.on('click', {scrollTop: this.mainPageMargin + 1, duration: 800}, this.scrollToVal.bind(this));
            this.extracurricularNavBtn.on('click', {scrollTop: $("#extracurricular").offset().top - this.$nav.outerHeight() - 20, duration: 800}, this.scrollToVal.bind(this));
            this.experienceNavBtn.on('click', {scrollTop: $("#experience").offset().top - this.$nav.outerHeight() - 20, duration: 800}, this.scrollToVal.bind(this));

            this.$thomasCardTxtWrapper.on('mouseenter', {arrowState: this.thomasArrowState, cardWrapper: this.$thomasCardTxtWrapper}, this.cardMouseEnter.bind(this));
            this.$thomasCardTxtWrapper.on('mouseleave', {arrowState: this.thomasArrowState, cardWrapper: this.$thomasCardTxtWrapper}, this.cardMouseLeave.bind(this));
            this.$thomasCardTxtWrapper.on('click',      {arrowState: this.thomasArrowState, cardTxt: this.$thomasCardTxt}, this.cardClick.bind(this));

            this.$riceCardTxtWrapper.on('mouseenter', {arrowState: this.riceArrowState, cardWrapper: this.$riceCardTxtWrapper}, this.cardMouseEnter.bind(this));
            this.$riceCardTxtWrapper.on('mouseleave', {arrowState: this.riceArrowState, cardWrapper: this.$riceCardTxtWrapper}, this.cardMouseLeave.bind(this));
            this.$riceCardTxtWrapper.on('click',      {arrowState: this.riceArrowState, cardTxt: this.$riceCardTxt}, this.cardClick.bind(this));

            this.$discoCardTxtWrapper.on('mouseenter', {arrowState: this.discoArrowState, cardWrapper: this.$discoCardTxtWrapper}, this.cardMouseEnter.bind(this));
            this.$discoCardTxtWrapper.on('mouseleave', {arrowState: this.discoArrowState, cardWrapper: this.$discoCardTxtWrapper}, this.cardMouseLeave.bind(this));
            this.$discoCardTxtWrapper.on('click',      {arrowState: this.discoArrowState, cardTxt: this.$discoCardTxt}, this.cardClick.bind(this));

            this.$hcyaCardTxtWrapper.on('mouseenter', {arrowState: this.hcyaArrowState, cardWrapper: this.$hcyaCardTxtWrapper}, this.cardMouseEnter.bind(this));
            this.$hcyaCardTxtWrapper.on('mouseleave', {arrowState: this.hcyaArrowState, cardWrapper: this.$hcyaCardTxtWrapper}, this.cardMouseLeave.bind(this));
            this.$hcyaCardTxtWrapper.on('click',      {arrowState: this.hcyaArrowState, cardTxt: this.$hcyaCardTxt}, this.cardClick.bind(this));

            this.$brevitestCardTxtWrapper.on('mouseenter', {arrowState: this.brevitestArrowState, cardWrapper: this.$brevitestCardTxtWrapper}, this.cardMouseEnter.bind(this));
            this.$brevitestCardTxtWrapper.on('mouseleave', {arrowState: this.brevitestArrowState, cardWrapper: this.$brevitestCardTxtWrapper}, this.cardMouseLeave.bind(this));
            this.$brevitestCardTxtWrapper.on('click',      {arrowState: this.brevitestArrowState, cardTxt: this.$brevitestCardTxt}, this.cardClick.bind(this));

            this.$fireworks.on('click', this.fireworks.bind(this));
        },
        render: function () {
            this.mainPageMargin = ($( window ).height() - this.$nav.outerHeight());
            this.$gap.css('height', this.mainPageMargin);
            this.$downArrowWrapper.effect( 'bounce', { times: 3 }, 1000);
        },
        windowScroll: function () {
            if (this.$window.scrollTop() > this.mainPageMargin) {
                document.styleSheets[3].disabled = false;
                this.bodyPaddingTop = parseFloat(this.$nav.outerHeight() + 20);
                this.$nav.addClass('navbar-fixed-top');
                this.$body.css('padding-top', this.bodyPaddingTop + 'px');
            } else {
                document.styleSheets[3].disabled = true;
                this.$nav.removeClass('navbar-fixed-top');
                this.$body.css('padding-top', 0);
            }

            if (this.$window.scrollTop() > ((3/4)*this.mainPageMargin)) {
                this.$gearWrapper.show();
            } else {
                this.$gearWrapper.hide();
            }

            if (this.$window.scrollTop() !== 0) {
                this.$downArrowWrapper.hide();
            } else {
                this.$downArrowWrapper.show();
                this.$downArrowWrapper.effect( 'bounce', { times: 3 }, 800);
            }
        },
        windowResize: function (e) {
            this.mainPageMargin = (this.$window.height() - this.$nav.outerHeight());
            this.$gap.css('height', this.mainPageMargin);
            $( "#force" ).empty();
            $( "#gear-wrapper" ).empty();
            forceLayout();
            gearLayout();
        },
        fireworks: function (e) {
            this.$fireworks.toggleClass('blueShadow');
            $("#force").empty();
            if (this.$fireworks.hasClass('blueShadow')) {
              $( '#name' ).html("<span style='color:red'>P</span><span style='color:white'>e</span><span style='color:blue'>t</span><span style='color:red'>e</span><span style='color:white'>r</span> <span style='color:blue'>D</span><span style='color:red'>u</span><span style='color:white'>l</span><span style='color:blue'>w</span><span style='color:red'>o</span><span style='color:white'>r</span><span style='color:blue'>t</span><span style='color:red'>h</span>");
              forceLayout(true);
            } else {
              $( '#name' ).html("Peter Dulworth");
              forceLayout(false);
            }
        },
        scrollToVal: function (e) {
            console.log(e.data.scrollTop);
            $('html, body').animate({
                scrollTop: e.data.scrollTop
            }, e.data.duration);
        },
        downArrowMouseEnter: function (e) {
            this.$downArrowWrapper.effect( 'bounce', { times: 3 }, 800);
        },
        cardMouseEnter: function (e) {
            $(e.data.arrowState.pos, e.data.arrowState.context).show();
            e.data.cardWrapper.toggleClass('cursor-hand');
        },
        cardMouseLeave: function (e) {
            $(e.data.arrowState.pos, e.data.arrowState.context).hide();
            e.data.cardWrapper.toggleClass('cursor-hand');
        },
        cardClick: function (e) {
            this.e = e.data;
            e.data.cardTxt.slideToggle(200, this.cardClickToggle.bind(this));
        },
        cardClickToggle: function () {
            if (this.e.cardTxt.is(':visible')) {
                this.e.arrowState.pos = '.card-header-arrow-up';
                this.e.arrowState.neg = '.card-header-arrow-down';
            }
            else {
                this.e.arrowState.pos = '.card-header-arrow-down';
                this.e.arrowState.neg = '.card-header-arrow-up';
            }
            $(this.e.arrowState.pos, this.e.arrowState.context).show();
            $(this.e.arrowState.neg, this.e.arrowState.context).hide();
        }
    };

    app.init();

})();