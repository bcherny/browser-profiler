function Profiler (name) {
  this.name = name

  // lazy-create a store
  if (!window.localStorage[name]) {
    this.save({
      times: []
    });
  }

  // get times
  var store = JSON.parse(window.localStorage[name]);

  this.done = function (value) {

    // store time
    store.times.push(
      value
    );

    // save it
    this.save(store);

    // trigger a new run?
    if (store.times.length < Profiler.NUM_RUNS) {
      setTimeout(function(){
        window.location.reload(true); // don't reload from cache
      }, 3000);
    }

    // we're done, let's compute some stats
    else {
      store.stats = {
        mean: Profiler.mean(Profiler.stripOutliers(store.times)),
        stdev: Profiler.sampleStdev(store.times)
      };

      this.save(store);

      console.log(this.name, 'completed', Profiler.NUM_RUNS, 'runs!', store);
    }

  }
}

Profiler.prototype.save = function (data) {
  window.localStorage[this.name] = JSON.stringify(data);
}

Profiler.NUM_RUNS = 20

Profiler.sampleStdev = function (array) {

  const _array = Profiler.stripOutliers(array);
  const _mean = Profiler.mean(_array);

  return Math.sqrt(
    _array.map(function (n) {
      return Math.pow(n - _mean, 2);
    }).reduce(function (a, b) {
      return a + b;
    }) / (_array.length - 1)
  );

}

Profiler.median = function (array) {
  return array.sort()[Math.ceil(array.length/2)]
}

Profiler.mean = function (array) {
  return Profiler.sum(array)/array.length
}

Profiler.stripOutliers = function (array) {
  const m = Profiler.median(array)
  return array.filter(a => Math.abs(a-m) < m*2)
}

Profiler.sum = function (array) {
  return array.reduce(function(a, b) {
    return a + b;
  });
}