import { useEffect, useReducer } from 'react'

interface ViewPort {
  minWidth: number,
  maxWidth: number
}

export const viewPorts = {
  mobile: <ViewPort>{
    minWidth: 1,
    maxWidth: 767
  },
  tablet: <ViewPort>{
    minWidth: 768,
    maxWidth: 991
  },
  computer: <ViewPort>{
    minWidth: 992,
    maxWidth: 0
  },
  largeScreen: <ViewPort>{
    minWidth: 0,
    maxWidth: 1919
  },
  wideScreen: <ViewPort>{
    minWidth: 1920,
    maxWidth: 0
  }
}
interface State {
  isMobile: boolean,
  isTablet: boolean,
  isComputer: boolean,
  isLargeScreen: boolean,
  isWideScreen: boolean,
  width: number
}

type ActionType = {
  type: 'setMobile' | 'setTablet' | 'setComputer' | 'setLarge' | 'setWide' | 'setWidth',
  value?: number | undefined
}

export const initialState: State = {
  isMobile: false,
  isTablet: false,
  isComputer: false,
  isLargeScreen: false,
  isWideScreen: false,
  width: window.innerWidth
}
export const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case 'setMobile':
      return { ...initialState, ...{ isMobile: true, width: action.value } }
    case 'setTablet':
      return { ...initialState, isTablet: true }
    case 'setComputer':
      return { ...state, isComputer: true }
    case 'setLarge':
      return { ...initialState, isLargeScreen: true }
    case 'setWide':
      return { ...initialState, isWideScreen: true }
    case 'setWidth':
      return { ...state, width: action.value }
    /* istanbul ignore next line */
    default:
      return initialState
  }
}
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
export default function useScreen () {
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
                         * Metrics and categories are based on Semantic UI.
                         * https://github.com/Semantic-Org/Semantic-UI-React/blob/128e95d3241eb024d4409e7d64d15ea254cf3ed6/src/addons/Responsive/Responsive.js#L47
                         */
  const _calculate = (width: number) => {
    let actionType: ActionType
    if (width <= viewPorts.mobile.maxWidth) actionType = { type: 'setMobile' }
    else if (width <= viewPorts.tablet.maxWidth) actionType = { type: 'setTablet' }
    else if (width <= viewPorts.largeScreen.maxWidth) actionType = { type: 'setLarge' }
    else actionType = { type: 'setWide' }

    dispatch({ ...actionType, value: width })

    if (width >= viewPorts.computer.minWidth) dispatch({ type: 'setComputer', value: width })

    dispatch({ type: 'setWidth', value: width })
  }
  useEffect(() => {
    window.onresize = () => {
      const width = window.innerWidth
      _calculate(width)
    }
  }, [])
  return state
}
