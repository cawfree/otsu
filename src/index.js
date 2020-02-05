import compose from "rippleware";

const histo = (data, bins) =>
  data.reduce((arr, e) => {
    arr[bins.indexOf(e)] += 1;
    return arr;
  }, [...Array(bins.length)].fill(0));

const width = histogram => histogram.reduce((e, i) => e + i, 0);

const bins = data => Array.from(new Set(data)).sort((e0, e1) => e0 - e1);

const weight = (data, total) => data.reduce((e, i) => e + i, 0) / total;

const mean = (histogram, bins) =>
  histogram.reduce((r, e, i) => r + e * bins[i], 0) / width(histogram);

const variance = (histogram, bins, mean) =>
  histogram.reduce(
    (r, e, i) => r + (bins[i] - mean) * (bins[i] - mean) * e,
    0
  ) / width(histogram);

const props = (hf, bf, total) => [
  weight(hf, total),
  variance(hf, bf, mean(hf, bf))
];

const cross = (wb, vb, wf, vf) => wb * vb + wf * vf;

const otsu = data => {
  const b = bins(data);
  const h = histo(data, b);
  const { length: total } = data;
  const vars = [...Array(b.length)].map((_, i) => {
    const [wb, vb] = props(h.slice(0, i), b.slice(0, i), total);
    const [wf, vf] = props(h.slice(i, h.length), b.slice(i, h.length), total);
    const x = cross(wb, vb, wf, vf);
    return !isNaN(x) ? x : Number.POSITIVE_INFINITY;
  });
  return b[vars.indexOf(Math.min(...vars))];
};

export default compose().use("[Number]", data => otsu(data));
