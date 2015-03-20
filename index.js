

function interpolate(t, points, tangents, knots, derivative, result) {

  var n = points.length;    // number or points / tangents / knots
  var d = points[0].length; // vector dimensionality
  var v = result || new Array(d); // destination vector

  if(knots) {
    // find knot interval for t
    for(var i=0; i<n-1; i++) {
      if(t >= knots[i] && t <= knots[i+1]) {
        break;
      }
    }

    if(i === n-1) throw new Error('out of bounds');

    var i0 = i;
    var i1 = i + 1;
    var k0 = knots[i0];
    var k1 = knots[i1];
    var scale = k1 - k0;

    t = (t - k0) / scale;

  } else {

    var t = t * (n - 1); // rescale t to [0, n-1]
    var i0 = t|0;        // truncate
    var i1 = i0 + 1;

    if(i0 > n-1) throw new Error('out of bounds');
    if(i0 === n-1) i1 = i0;

    var scale = i1 - i0;

    t = (t - i0) / scale;
  }

  if(derivative) {
    var t2 = t * t;
    var h00 = 6 * t2 - 6 * t;
    var h10 = 3 * t2 - 4 * t + 1;
    var h01 = - 6 * t2 + 6 * t;
    var h11 = 3 * t2 - 2 * t;
  } else {
    var t2 = t * t;
    var it = 1 - t;
    var it2 = it * it;
    var tt = 2 * t;
    var h00 = (1 + tt) * it2;
    var h10 = t * it2;
    var h01 = t2 * (3 - tt);
    var h11 = t2 * (t - 1);
  }

  for(var i=0; i<d; i++) {
    v[i] = h00 * points[i0][i] + 
           h10 * tangents[i0][i] * scale +
           h01 * points[i1][i] +
           h11 * tangents[i1][i] * scale;
  }

  return v;
}


module.exports = interpolate;