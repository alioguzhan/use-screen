import { useReducer as l, useLayoutEffect as c } from "react";
const n = {
  mobile: {
    min: 1,
    max: 768
  },
  tablet: {
    min: 769,
    max: 1279
  },
  computer: {
    min: 1280,
    max: 0
  },
  largeScreen: {
    min: 1440,
    max: 1919
  },
  wideScreen: {
    min: 1920,
    max: 0
  }
}, i = {
  isMobile: !1,
  isTablet: !1,
  isComputer: !1,
  isLargeScreen: !1,
  isWideScreen: !1,
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight
}, o = (r, e) => {
  switch (e.type) {
    case "setMobile":
      return { ...i, isMobile: !0, width: e.value };
    case "setTablet":
      return { ...i, isTablet: !0 };
    case "setComputer":
      return { ...r, isComputer: !0 };
    case "setLarge":
      return { ...i, isLargeScreen: !0 };
    case "setWide":
      return { ...i, isWideScreen: !0 };
    case "setWidth":
      return { ...r, screenWidth: e.value };
    case "setHeight":
      return { ...r, screenHeight: e.value };
    /* c8 ignore next 2 */
    default:
      return i;
  }
};
function m() {
  const [r, e] = l(o, i);
  return c(() => {
    const a = () => {
      const t = window.innerWidth, u = window.innerHeight;
      let s;
      t <= n.mobile.max ? s = { type: "setMobile" } : t <= n.tablet.max ? s = { type: "setTablet" } : t <= n.largeScreen.max ? s = { type: "setLarge" } : s = { type: "setWide" }, e({ ...s, value: t }), t >= n.computer.min && e({ type: "setComputer", value: t }), e({ type: "setWidth", value: t }), e({ type: "setHeight", value: u });
    };
    return window.addEventListener("resize", a), a(), () => window.removeEventListener("resize", a);
  }, []), r;
}
export {
  n as Viewports,
  m as default,
  i as initialState,
  m as useScreen
};
//# sourceMappingURL=index.js.map
