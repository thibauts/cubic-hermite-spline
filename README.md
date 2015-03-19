cubic-hermite-spline
====================
### Cubic Hermite spline interpolation

[Cubic Hermite spline](http://en.wikipedia.org/wiki/Cubic_Hermite_spline) interpolation of points / tangeants in any dimension with optional derivative computation. The interpolator can also take a knot-like vector as an optional parameter, which may be useful to enforce time at control points when used for position / velocity interpolation.


Install
-------

```bash
$ npm install cubic-hermite-spline
```

Example
-------

Basic usage

```javascript
var hermite = require('cubic-hermite-spline');

var points = [
  [-1, 0],
  [ 0, 0],
  [ 1, 0]
];

var tangents = [
  [1, 1],
  [0, 1],
  [1, 1]
];

for(var t=0; t<1; t+=0.01) {
  var point = hermite(t, points, tangents);
  var tangent = hermite(t, points, tangents, null, true);
}
```

<img src="http://i.imgur.com/vqyUHxF.png" />


With a knot vector

```javascript
var hermite = require('cubic-hermite-spline');

var points = [
  [-1, 0],
  [ 0, 0],
  [ 1, 0]
];

var tangents = [
  [1, 1],
  [0, 1],
  [1, 1]
];

var knots = [
  0, 1.5, 2
];

for(var t=0; t<1; t+=0.01) {
  var point = hermite(t, points, tangents);
  var tangent = hermite(t, points, tangents, knots, true);
}
```

<img src="http://i.imgur.com/v5FRZNT.png" />


Usage
-----

### `hermite(t, points, tangents[, knots, derivative, result])`

Computes the interpolation at `t` for the provided set of points and tangents, and optional knots.

* `t` position along the curve: in the [0, 1] range for regular use, and [0, last-knot-value] when using knots
* `points` vectors to interpolate
* `tangents` tangents at provided points
* `knots` enforced values of `t` at provided points
* `derivative` if true return the tangeant at `t` instead of the position
* `result` preallocated array in which the result will be stored (avoid GC)

**Returns** the interpolated vector