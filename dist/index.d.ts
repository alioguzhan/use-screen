interface ViewPort {
    minWidth: number;
    maxWidth: number;
}
export declare const viewPorts: Record<string, ViewPort>;
interface State {
    isMobile: boolean;
    isTablet: boolean;
    isComputer: boolean;
    isLargeScreen: boolean;
    isWideScreen: boolean;
    screenWidth: number;
    screenHeight: number;
}
declare type ActionType = {
    type: 'setMobile' | 'setTablet' | 'setComputer' | 'setLarge' | 'setWide' | 'setWidth' | 'setHeight';
    value?: number;
};
export declare const initialState: State;
export declare const reducer: (state: State, action: ActionType) => State;
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
export default function useScreen(): State;
export {};
