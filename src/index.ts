import { useEffect, useReducer } from 'react'

interface State {
    isMobile: boolean,
    isTablet: boolean,
    isComputer: boolean,
    isLargeScreen: boolean,
    isWideScreen: boolean,
    width: number
}

type ActionType = "setMobile" | "setTablet" | "setComputer" | "setLarge" | "setWide"


const initialState: State = {
    isMobile: false,
    isTablet: false,
    isComputer: false,
    isLargeScreen: false,
    isWideScreen: false,
    width: window.innerWidth
}
const reducer = (state: State, action: ActionType) => {
    switch (action) {
        case 'setMobile':
            return { ...initialState, isMobile: true }
        case 'setTablet':
            return { ...initialState, isTablet: true }
        case 'setComputer':
            return { ...state, isComputer: true }
        case 'setLarge':
            return { ...initialState, isLargeScreen: true }
        case 'setWide':
            return { ...initialState, isWideScreen: true }
        default:
            return initialState
    }
}
/**
 * Custom hook to check current screen size.
 *
 * `isMobile` is __true__ if screen __width < 768 px__
 *
 * `isTablet` is __true__ if screen __width < 992 px__
 *
 * `isComputer` is __true__ if screen __width >= 992 px__
 *
 * `isLargeScreen` is __true__ if screen __width < 1920 px__
 *
 * `isWideScreen` is __true__ if screen __width >= 1920 px__
 */
export default function useScreen() {
    const [state, dispatch] = useReducer(reducer, initialState)

    /**
     * Metrics and categories are based on Semantic UI.
     * https://github.com/Semantic-Org/Semantic-UI-React/blob/128e95d3241eb024d4409e7d64d15ea254cf3ed6/src/addons/Responsive/Responsive.js#L47
     */
    const _calculate = (width: number) => {
        if (width < 768) dispatch('setMobile')
        else if (width < 992) dispatch('setTablet')
        else if (width < 1920) dispatch('setLarge')
        else if (width >= 1920) dispatch('setWide')
        if (width >= 992) dispatch('setComputer')
    }
    useEffect(() => {
        window.onresize = () => {
            const width = window.innerWidth
            _calculate(width)
        }
    }, [])
    return state
}