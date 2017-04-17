$(function(){ // on dom ready

var node_d;

if( $(window).width() < 500) {
  node_d = 20
  $('#cy').css('padding', '0vh 4vw 20vh 4vw')
  $('#down-arrow').hide()
}
else {
  node_d = 30
}

console.log('w', $(window).width(), $(window).height())

var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: true,
  autounselectify: true,
  zoomingEnabled: true,
  userZoomingEnabled: false,
  userPanningEnabled: false,
  autoungrabify: true, // can't move nodes

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        //'content': 'data(id)',
        'background-color': '#ddd',
        'width': node_d,
        'height': node_d
      })
    .selector('edge')
      .css({
        'width': 0,
        'line-color': '#ddd',
        'opacity': 0,
        'curve-style': 'bezier'
      })
    .selector('.highlighted')
      .css({
        // 'background-color': '#61bffc',
        'background-color': '#6baed6',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'source-arrow-color': '#61bffc',
        'opacity': 1
      })
    .selector('.source-node-highlighted')
      .css({
        'background-color': '#ff6961',
      })
    .selector('.red')
      .css({
        // 'background-color': '#ff6961',
        'background-color': '#d66bae',
        'opacity': 0.5
      })
    .selector('.blue')
      .css({
        'background-color': '#61bffc',
        'transition-property': 'background',
        'transition-duration': '0.1s'
      })
    .selector('.err')
      .css({
        'line-color': '#f00',
        'target-arrow-color': '#f00',
        'source-arrow-color': '#f00',
        'transition-property': 'line-color, target-arrow-color, source-arrow-color',
        'transition-duration': '0.1s'
      })
    .selector('.green')
      .css({
        'background-color': '#77dd77',
        'line-color': '#77dd77',
        'target-arrow-color': '#77dd77',
        'source-arrow-color': '#77dd77',
        'transition-property': 'line-color, target-arrow-color, source-arrow-color',
        'transition-duration': '0.1s',
        'opacity': 0.5
      })
    .selector('.visited_node')
      .css({
        'background-color': '#eaeaea',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'source-arrow-color': '#61bffc'
      })
    .selector('.visited_edge')
      .css({
        'line-color': '#eee',
        'opacity': 0
      }),

  elements: { nodes: [], edges: [] },

  layout: {
    name: 'grid',
    directed: false,
    roots: '#a',
    padding: 0
  }
});

var g_rows = 13
var g_cols = 22

g_nodes = []
g_edges = []

var add_nodes = function(nodes) {
  for(var i = 0; i < nodes.length; i++) {
    cy.add({ group: 'nodes', data: { id: nodes[i] } });
  }
}

var add_edges = function(edges) {
  for(var i = 0; i < edges.length; i++) {
    cy.add({
      group: 'edges', data: { id: edges[i][0]+edges[i][1], source: edges[i][0], target: edges[i][1], weight: edges[i][2] } });
  }
}

var render_graph = function(graph, nodes) {
  cy.layout({
    name: graph,
    directed: false,
    padding: 0,
    avoidOverlap: true,
    cols: g_cols,
    rows: g_rows,
    minNodeSpacing: 0
  });
}

for (i = 0; i < g_rows * g_cols; i++) {
  g_nodes[i] = i
}

add_nodes(g_nodes)

for(i=0; i < g_cols; i++) {
  for(j=0; j < g_rows - 1; j++) {
    cy.add({
      group: 'edges',
      data: {
        id: 'e' + String(i + j * g_cols) + String(i + (j + 1) * g_cols),
        source: i + j * g_cols,
        target: i + (j + 1) * g_cols
      }
    })
  }
}

for(i=0; i < g_cols * g_rows; i += g_cols) {
  for(j=0; j < g_cols - 1; j++) {
    cy.add({
      group: 'edges',
      data: {
        id: 'e' + String(i+j) + String(i+j+1),
        source: i + j,
        target: i + j + 1
      }
    })
  }
}

var color = function(nodes_to_color) {
  for (i=0; i < nodes_to_color.length; i++) {
    cy.$("#" + String(nodes_to_color[i])).addClass('highlighted')
  }
}

add_edges(g_edges)

var node_initials = [202, 180, 158, 136, 114, 92, 70, 71, 72, 95, 117, 138, 137, 207, 208, 209, 188, 166, 143, 142, 119, 97, 76, 77, 78, 80, 81, 82, 102, 124, 146, 168, 190,212, 213, 214, 193, 171, 149, 127, 105]

render_graph('grid', g_nodes)

var is_directed = false

var find_edge = function(node1, node2) {
  if (cy.edges("[source='" + node1 + "'][target='" + node2 + "']").length == 1) {
    return cy.edges("[source='" + node1 + "'][target='" + node2 + "']")
  }
  else if (cy.edges("[source='" + node2 + "'][target='" + node1 + "']").length == 1) {
    return cy.edges("[source='" + node2 + "'][target='" + node1 + "']")
  }
  else {
    return false
  }
}

var find_edges = function(nodes) {
  for (i=0; i < nodes.length; i++) {
    for (j=0; j < nodes.length; j++) {
      if (i != j) {
        if (find_edge(nodes[i], nodes[j]) != false) {
          find_edge(nodes[i], nodes[j]).addClass('highlighted')
        }
      }
    }
  }
}

var dfs_start_nodes = ['0', '285', '264', '21']
var search_counter = 0

var highlightNextEle = function(){
  if (i == (2 * g_rows * g_cols) - 1) {
    rand_0_1 = Math.random()
    if( rand_0_1 < 0.33 ) {
      start_node = cy.$('#' + dfs_start_nodes[Math.floor(Math.random() * dfs_start_nodes.length)])
      dfs_bfs = cy.elements().dfs(start_node, function(){}, is_directed);
    } else {
      rand_start_node = Math.floor(Math.random() * 285.0)
      start_node = cy.$('#' +  rand_start_node)
      dfs_bfs = cy.elements().bfs(start_node, function(){}, is_directed);
    }
    i=0
    search_counter++
    setTimeout(highlightNextEle, 10)
  }
  else {
    if( i < dfs_bfs.path.length ){
      if (node_initials.includes(parseInt(dfs_bfs.path[i].id()))) { // if the node is one of the nodes in the name
        dfs_bfs.path[i].addClass('highlighted');
      }
      else {
        if (dfs_bfs.path[i].id()[0] == 'e') {
          dfs_bfs.path[i].toggleClass('visited_edge');
        }
        else {
          if ( search_counter % 4 == 0 ) {
            dfs_bfs.path[i].removeClass('red');
            dfs_bfs.path[i].addClass('visited_node');
          }
          else if ( search_counter % 4 == 1 ) {
            dfs_bfs.path[i].removeClass('visited_node');
            dfs_bfs.path[i].addClass('green');
          }
          else if ( search_counter % 4 == 2 ) {
            dfs_bfs.path[i].removeClass('green');
            dfs_bfs.path[i].addClass('visited_node');
          }
          else if ( search_counter % 4 == 3 ){
            dfs_bfs.path[i].removeClass('visited_node');
            dfs_bfs.path[i].addClass('red');
          }
        }
      }
      i++;
      setTimeout(highlightNextEle, 1);
    }
  }
};

var remove_highlight = function(){
  cy.elements().removeClass('source-node-highlighted');
  cy.elements().removeClass('highlighted');
  cy.elements().removeClass('red');
  cy.elements().removeClass('blue');
  cy.elements().removeClass('err');
  cy.elements().removeClass('green');
};

start_node = cy.$('#164')
dfs_bfs = cy.elements().bfs(start_node, function(){}, is_directed);

i=0
setTimeout(highlightNextEle, 10)

}); // on dom ready