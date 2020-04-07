Array.prototype.alphanumSort = function(caseInsensitive) {
    console.log(this);
  for (let z = 0, t; (t = this[z]); z++) {
    this[z] = [];
    var x = 0,
      y = -1,
      n = 0,
      i,
      j;

    while ((i = (j = t.charAt(x++)).charCodeAt(0))) {
      var m = i == 46 || (i >= 48 && i <= 57);
      if (m !== n) {
        this[z][++y] = "";
        n = m;
      }
      this[z][y] += j;
    }
  }

  this.sort(function(a, b) {
    for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
      if (caseInsensitive) {
        aa = aa.toLowerCase();
        bb = bb.toLowerCase();
      }
      if (aa !== bb) {
        var c = Number(aa),
          d = Number(bb);
        if (c == aa && d == bb) {
          return c - d;
        } else return aa > bb ? 1 : -1;
      }
    }
    return a.length - b.length;
  });

  for (let z = 0; z < this.length; z++) this[z] = this[z].join("");
};
