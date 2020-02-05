import compose from 'rippleware';

// not image, just *data*; we should be able to compute an otsu of *anything*
const histogram = (data, bins) => data
  .reduce(
    (arr, e) => {
      arr[bins.indexOf(e)] += 1;
      return arr;
    },
    [...Array(bins.length)]
      .fill(0),
  );

// TODO: Determine number of classes. How should this be passed?
// TODO: What is controled by the number of classes?
const otsu = (data, n = 2) => {
  const bins = Array
    .from(new Set(data))
    .sort((e0, e1) => (e0 - e1)); // lowest-to-highest
  const hist = histogram(data, bins);

  console.log(bins);
  console.log(hist);
};

export default compose()
  .use(
    '[Number]', data => otsu(data),
  );
