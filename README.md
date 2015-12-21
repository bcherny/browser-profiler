# browser-profiler

> simple real world browser profiler. measures an event, reloads the page for you, and reports results.

## usage

```html
<html>
  ...
  <!-- 1. include the script at the bottom of your body -->
  <script src="//raw.githubusercontent.com/bcherny/browser-profiler/master/index.js"></script>

  <!-- 2. set up the profiler -->
  <script>
    window.myProfiler = new Profiler('MY_PROFILE')
  </script>

  <!-- 3. tell the profiler when a run has finished -->
  <script>
    doSomeOperation()
    window.myProfiler.done()
  </script>
</body>
</html>
```

after 20 runs, your results will be logged out to the console:

```text
MY_PROFILE completed 20 runs! {
  stats: {
    mean: 227.84,
    stdev: 7.60
  },
  times: [
    225.01,
    228.84,
    ...
  ]
}
```

## tips for getting consistent profile results

- [ ] close devtools
- [ ] disable all Chrome extensions (or run in incognito and ensure that all extensions are disabled)
- [ ] ensure that your tab is running in its own window, without other tabs open (see why [here](https://www.chromium.org/developers/design-documents/compositor-thread-architecture))
- [ ] avoid interacting with your machine while the Profiler is running