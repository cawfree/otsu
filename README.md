# otsu
[Otsu's Method](https://en.wikipedia.org/wiki/Thresholding_(image_processing)) is way of implementing automatic thresholding. It is a binarization algorithm which can be used to select the optimal threshold between foreground and background quantities based on finding the minimum point of [cross variance](). This is particularly useful when performing segmentation in [image processing]().

<a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</a>

<br />
<br />

<p align="center">
  <img src="./public/image.jpg" width="512" height="384" />
</p>

You can find an awesome description of the algorithm, which inspired this repository, [here](http://www.labbookpages.co.uk/software/imgProc/otsuThreshold.html).

## 🚀 Getting Started

Using [`npm`]():

```bash
npm install --save otsu
```

Using [`yarn`]():

```bash
yarn add otsu
```
## ✍️ Usage

It's really simple to find the threshold of your image. All you have to do is supply the data!

In the example below, we have a one-dimensional array of intensity data. Most greyscale image formats, such as [MNIST](http://yann.lecun.com/exdb/mnist/), can be fed directly into otsu this way. However, images that consist of multiple attributes per pixel (such as `(r,g,b)`) will first require pre-processing.

```javascript
import otsu from 'otsu';

const intensity = [255, 0, 128, 4, 95 ...];

const t = otsu(image);

console.log(t); // i.e. 128

const bw = image.map(e => (e > t ? 1 : 0));
```

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)


<p align="center">
  <a href="https://www.buymeacoffee.com/cawfree">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy @cawfree a coffee" width="232" height="50" />
  </a>
</p>
