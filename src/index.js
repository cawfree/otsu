import compose from "rippleware";

const histo = (data, bins) =>
  data.reduce((arr, e) => {
    arr[bins.indexOf(e)] += 1;
    return arr;
  }, [...Array(bins.length)].fill(0));

const width = (hist, s, e) => {
  let v = 0;
  for (let i = s; i < e; i += 1) {
    v += hist[i];
  }
  return v;
};

const bins = data => Array.from(new Set(data)).sort((e0, e1) => e0 - e1);

const weight = (hist, s, e, total) => {
  let v = 0;
  for (let i = s; i < e; i += 1) {
    v += hist[i];
  }
  return v / total;
};

const mean = (hist, bins, s, e, width) => {
  let v = 0;
  for (let i = s; i < e; i += 1) {
    v += hist[i] * bins[i];
  }
  return v * width;
};

const variance = (hist, bins, s, e, mean, width) => {
  let v = 0;
  for (let i = s; i < e; i += 1) {
    const d = bins[i] - mean;
    v += d * d * hist[i];
  }
  return v * width;
};

const props = (hist, bins, s, e, total) => {
  const w = 1 / width(hist, s, e);
  return [
    weight(hist, s, e, total),
    variance(hist, bins, s, e, mean(hist, bins, s, e, w), w),
  ];
};

const cross = (wb, vb, wf, vf) => wb * vb + wf * vf;

const otsu = data => {
  const b = bins(data);
  const h = histo(data, b);
  const { length: total } = data;
  const vars = [...Array(b.length)].map((_, i) => {
    const [wb, vb] = props(h, b, 0, i, total);
    const [wf, vf] = props(h, b, i, h.length, total);
    const x = cross(wb, vb, wf, vf);
    return !isNaN(x) ? x : Number.POSITIVE_INFINITY;
  });
  return b[vars.indexOf(Math.min(...vars))];
};

export default compose().use("[Number]", data => otsu(data));
