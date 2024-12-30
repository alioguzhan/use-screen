import { useLayoutEffect, useReducer } from 'react';

export interface Viewport {
  min: number;
  max: number;
}

export type ViewportName = 'mobile' | 'tablet' | 'computer' | 'largeScreen' | 'wideScreen';

/** Viewport breakpoints */
export const Viewports: Record<ViewportName, Viewport> = {
  mobile: {
    min: 1,
    max: 768,
  },
  tablet: {
    min: 769,
    max: 1279,
  },
  computer: {
    min: 1280,
    max: 0,
  },
  largeScreen: {
    min: 1440,
    max: 1919,
  },
  wideScreen: {
    min: 1920,
    max: 0,
  },
};

interface State {
  isMobile: boolean;
  isTablet: boolean;
  isComputer: boolean;
  isLargeScreen: boolean;
  isWideScreen: boolean;
  screenWidth: number;
  screenHeight: number;
}

type ActionType = {
  type: 'setMobile' | 'setTablet' | 'setComputer' | 'setLarge' | 'setWide' | 'setWidth' | 'setHeight';
  value?: number;
};

export const initialState: State = {
  isMobile: false,
  isTablet: false,
  isComputer: false,
  isLargeScreen: false,
  isWideScreen: false,
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'setMobile':
      return { ...initialState, ...{ isMobile: true, width: action.value } };
    case 'setTablet':
      return { ...initialState, isTablet: true };
    case 'setComputer':
      return { ...state, isComputer: true };
    case 'setLarge':
      return { ...initialState, isLargeScreen: true };
    case 'setWide':
      return { ...initialState, isWideScreen: true };
    case 'setWidth':
      return { ...state, screenWidth: action.value as number };
    case 'setHeight':
      return { ...state, screenHeight: action.value as number };
    /* c8 ignore next 2 */
    default:
      return initialState;
  }
};
/**
 * Custom hook to check current screen size.
 *
 * `isMobile` is __true__ if screen __width <= 768 px__
 *
 * `isTablet` is __true__ if screen __width <= 1199 px__
 *
 * `isComputer` is __true__ if screen __width >= 1200 px__
 *
 * `isLargeScreen` is __true__ if screen __width <= 1920 px__
 *
 * `isWideScreen` is __true__ if screen __width >= 1920 px__
 */
export function useScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    const calculate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let actionType: ActionType;
      if (width <= Viewports.mobile.max) actionType = { type: 'setMobile' };
      else if (width <= Viewports.tablet.max) actionType = { type: 'setTablet' };
      else if (width <= Viewports.largeScreen.max) actionType = { type: 'setLarge' };
      else actionType = { type: 'setWide' };

      dispatch({ ...actionType, value: width });

      if (width >= Viewports.computer.min) dispatch({ type: 'setComputer', value: width });

      dispatch({ type: 'setWidth', value: width });
      dispatch({ type: 'setHeight', value: height });
    };

    window.addEventListener('resize', calculate);
    calculate();
    return () => window.removeEventListener('resize', calculate);
  }, []);
  return state;
}

export default useScreen;
