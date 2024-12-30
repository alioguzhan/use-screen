import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import useScreen, { initialState, Viewports } from './index';

window.resizeTo = (width, height) => {
  window.innerWidth = width || window.innerWidth;
  window.innerHeight = height || window.innerHeight;
  window.dispatchEvent(new Event('resize'));
};

const resizeWindow = (width: number, height: number): void => {
  window.resizeTo(width, height);
};

test('should return the result object', () => {
  const { result } = renderHook(() => useScreen());
  const t = Object.keys(initialState).every((k) => Object.keys(result.current).indexOf(k) > -1);
  expect(t).toBe(true);
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
    resizeWindow(Viewports.tablet.min, 800);
  });
  expect(result.current.isTablet).toBeTruthy();
  expect(result.current.isMobile).toBeFalsy();
});

test('should set isComputer to true', () => {
  const { result } = renderHook(() => useScreen());
  expect(result.current.isComputer).toBeFalsy();
  act(() => {
    resizeWindow(Viewports.computer.min, 800);
  });
  expect(result.current.isComputer).toBeTruthy();
  expect(result.current.isMobile).toBeFalsy();
  expect(result.current.isTablet).toBeFalsy();
});

test('should set isLargeScreen to true', () => {
  const { result } = renderHook(() => useScreen());
  act(() => {
    resizeWindow(Viewports.largeScreen.max, 800);
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
    resizeWindow(Viewports.wideScreen.min, 800);
  });
  expect(result.current.isWideScreen).toBeTruthy();
  expect(result.current.isComputer).toBeTruthy();
  expect(result.current.isMobile).toBeFalsy();
  expect(result.current.isTablet).toBeFalsy();
  expect(result.current.isLargeScreen).toBeFalsy();
});
