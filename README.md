# use-screen

> Custom React hook for screen and device information

[![NPM](https://img.shields.io/npm/v/use-screen.svg)](https://www.npmjs.com/package/use-screen)
[![npm](https://img.shields.io/npm/dm/use-screen.svg)](https://www.npmjs.com/package/use-screen)
[![codecov](https://codecov.io/gh/alioguzhan/use-screen/branch/master/graph/badge.svg?token=htwLgAlLBc)](https://codecov.io/gh/alioguzhan/use-screen)
[![Github](https://github.com/alioguzhan/use-screen/workflows/build/badge.svg)](https://github.com/alioguzhan/use-screen/actions)

## Install

```bash
npm install use-screen
```

Or with yarn:

```bash
yarn add use-screen
```

## Usage

```js
import useScreen from 'use-screen';

const { isMobile, isWideScreen, screenWidth } = useScreen();

// use screen width and other variables as you like
```

See the website to see how it works: [https://alioguzhan.github.io/use-screen/](https://alioguzhan.github.io/use-screen/)

There is also a working live example as a sandbox:

[![Edit use-screen-hook](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-screen-hook-80toq?fontsize=14&hidenavigation=1&theme=dark)

## Return Value

```ts
interface State {
  isMobile: boolean; // < 768px
  isTablet: boolean; // < 1280px
  isComputer: boolean; // > 1280px
  isLargeScreen: boolean; // < 1920px
  isWideScreen: boolean; // > 1920px
  screenWidth: number; // current screen width (innerWidth)
  screenHeight: number; // current screen height (innerHeight)
}
```

## License

MIT © [alioguzhan](https://github.com/alioguzhan)
