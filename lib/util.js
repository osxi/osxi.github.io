function normalizeCoords(pair) {
  // x < y (bad-- let's flip it around)
  if (pair[0] < pair[1]) {
    return [pair[1], pair[0]]
  // x > y (good)
  } else {
    return pair;
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function centerCoords(pairs) {
  var x_min, x_max, y_min, y_max;
  var x_coords = $.map(pairs, function(i) { return normalizeCoords(i)[0] });
  var y_coords = $.map(pairs, function(i) { return normalizeCoords(i)[1] });
  var x_center, y_center, center;

  x_min = Math.min.apply(Math, x_coords);
  y_min = Math.min.apply(Math, y_coords);
  x_max = Math.max.apply(Math, x_coords);
  y_max = Math.max.apply(Math, y_coords);

  x_center = x_min + ((x_max - x_min) / 2);
  y_center = y_min + ((y_max - y_min) / 2);
  center = [x_center, y_center];

  // console.log('pairs: ' + pairs);
  // console.log('length: ' + pairs.length);
  // console.log('first pair: ' + normalizeCoords(pairs[0]));
  // console.log('x_coords: ' + x_coords);
  // console.log('x_min: ' + x_min);
  // console.log('x_max: ' + x_max);
  // console.log('y_coords: ' + y_coords);
  // console.log('y_max: ' + y_max);
  // console.log('center: ' + center);

  return [center];
}
