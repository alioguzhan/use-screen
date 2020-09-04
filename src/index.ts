import { useLayoutEffect, useReducer } from 'react';

interface ViewPort {
  minWidth: number;
  maxWidth: number;
}

export const viewPorts: Record<string, ViewPort> = {
  mobile: {
    minWidth: 1,
    maxWidth: 767,
  },
  tablet: {
    minWidth: 768,
    maxWidth: 991,
  },
  computer: {
    minWidth: 992,
    maxWidth: 0,
  },
  largeScreen: {
    minWidth: 0,
    maxWidth: 1919,
  },
  wideScreen: {
    minWidth: 1920,
    maxWidth: 0,
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
  type:
    | 'setMobile'
    | 'setTablet'
    | 'setComputer'
    | 'setLarge'
    | 'setWide'
    | 'setWidth'
    | 'setHeight';
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
export const reducer = (state: State, action: ActionType): State => {
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
    /* istanbul ignore next line */
    default:
      return initialState;
  }
};
/**
 * Custom hook to check current screen size.
 *
 * `isMobile` is __true__ if screen __width < 768 px__
 *
 * `isTablet` is __true__ if screen __width <= 992 px__
 *
 * `isComputer` is __true__ if screen __width >= 992 px__
 *
 * `isLargeScreen` is __true__ if screen __width <= 1920 px__
 *
 * `isWideScreen` is __true__ if screen __width >= 1920 px__
 */
export default function useScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    /**
     * Metrics and categories are based on Semantic UI.
     * https://github.com/Semantic-Org/Semantic-UI-React/blob/128e95d3241eb024d4409e7d64d15ea254cf3ed6/src/addons/Responsive/Responsive.js#L47
     */
    const calculate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let actionType: ActionType;
      if (width <= viewPorts.mobile.maxWidth)
        actionType = { type: 'setMobile' };
      else if (width <= viewPorts.tablet.maxWidth)
        actionType = { type: 'setTablet' };
      else if (width <= viewPorts.largeScreen.maxWidth)
        actionType = { type: 'setLarge' };
      else actionType = { type: 'setWide' };

      dispatch({ ...actionType, value: width });

      if (width >= viewPorts.computer.minWidth)
        dispatch({ type: 'setComputer', value: width });

      dispatch({ type: 'setWidth', value: width });
      dispatch({ type: 'setHeight', value: height });
    };

    window.addEventListener('resize', calculate);
    calculate();
    return () => window.removeEventListener('resize', calculate);
  }, []);
  return state;
}
