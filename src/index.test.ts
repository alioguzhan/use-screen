/* eslint-disable no-undef */
import { renderHook, act } from '@testing-library/react-hooks';
import useScreen, { initialState, viewPorts } from './index';

window.resizeTo = (width, height) => {
  Object.assign(window, {
    innerWidth: width,
    innerHeight: height,
  }).dispatchEvent(new Event('resize'));
};
const resizeWindow = (width: number, height: number): void => {
  window.resizeTo(width, height);
};

test('should return the result object', () => {
  const { result } = renderHook(() => useScreen());
  expect(
    Object.keys(initialState).every((k) =>
      Object.keys(result.current).includes(k)
    )
  ).toBe(true);
});

test('should respond to window resize', () => {
  const { result } = renderHook(() => useScreen());
  expect(result.current.screenWidth).toBe(window.innerWidth);
  expect(result.current.screenHeight).toBe(window.innerHeight);
  act(() => {
    resizeWindow(1071, 1453);
  });
  expect(result.current.screenWidth).toBe(1071);
  expect(result.current.screenHeight).toBe(1453);
});

test('should set isMobile to true', () => {
  const { result } = renderHook(() => useScreen());
  expect(result.current.isMobile).toBeFalsy();
  act(() => {
    resizeWindow(760, 800);
  });
  expect(result.current.isMobile).toBeTruthy();
  expect(result.current.isComputer).toBeFalsy();
});

test('should set isTablet to true', () => {
  const { result } = renderHook(() => useScreen());
  expect(result.current.isTablet).toBeFalsy();
  act(() => {
    resizeWindow(viewPorts.tablet.minWidth, 800);
  });
  expect(result.current.isTablet).toBeTruthy();
  expect(result.current.isMobile).toBeFalsy();
});

test('should set isComputer to true', () => {
  const { result } = renderHook(() => useScreen());
  expect(result.current.isComputer).toBeFalsy();
  act(() => {
    resizeWindow(viewPorts.computer.minWidth, 800);
  });
  expect(result.current.isComputer).toBeTruthy();
  expect(result.current.isMobile).toBeFalsy();
  expect(result.current.isTablet).toBeFalsy();
});

test('should set isLargeScreen to true', () => {
  const { result } = renderHook(() => useScreen());
  act(() => {
    resizeWindow(viewPorts.largeScreen.maxWidth, 800);
  });
  expect(result.current.isLargeScreen).toBeTruthy();
  expect(result.current.isComputer).toBeTruthy();
  expect(result.current.isMobile).toBeFalsy();
  expect(result.current.isTablet).toBeFalsy();
});

test('should set isWideScreen to true', () => {
  const { result } = renderHook(() => useScreen());
  expect(result.current.isWideScreen).toBeFalsy();
  act(() => {
    resizeWindow(viewPorts.wideScreen.minWidth, 800);
  });
  expect(result.current.isWideScreen).toBeTruthy();
  expect(result.current.isComputer).toBeTruthy();
  expect(result.current.isMobile).toBeFalsy();
  expect(result.current.isTablet).toBeFalsy();
  expect(result.current.isLargeScreen).toBeFalsy();
});
