export interface Viewport {
    min: number;
    max: number;
}
export type ViewportName = 'mobile' | 'tablet' | 'computer' | 'largeScreen' | 'wideScreen';
/** Viewport breakpoints */
export declare const Viewports: Record<ViewportName, Viewport>;
interface State {
    isMobile: boolean;
    isTablet: boolean;
    isComputer: boolean;
    isLargeScreen: boolean;
    isWideScreen: boolean;
    screenWidth: number;
    screenHeight: number;
}
export declare const initialState: State;
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
export declare function useScreen(): State;
export default useScreen;
