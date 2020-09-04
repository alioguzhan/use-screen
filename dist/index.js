'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var viewPorts = {
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
var initialState = {
    isMobile: false,
    isTablet: false,
    isComputer: false,
    isLargeScreen: false,
    isWideScreen: false,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'setMobile':
            return __assign(__assign({}, initialState), { isMobile: true, width: action.value });
        case 'setTablet':
            return __assign(__assign({}, initialState), { isTablet: true });
        case 'setComputer':
            return __assign(__assign({}, state), { isComputer: true });
        case 'setLarge':
            return __assign(__assign({}, initialState), { isLargeScreen: true });
        case 'setWide':
            return __assign(__assign({}, initialState), { isWideScreen: true });
        case 'setWidth':
            return __assign(__assign({}, state), { screenWidth: action.value });
        case 'setHeight':
            return __assign(__assign({}, state), { screenHeight: action.value });
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
function useScreen() {
    var _a = react.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    react.useLayoutEffect(function () {
        /**
         * Metrics and categories are based on Semantic UI.
         * https://github.com/Semantic-Org/Semantic-UI-React/blob/128e95d3241eb024d4409e7d64d15ea254cf3ed6/src/addons/Responsive/Responsive.js#L47
         */
        var calculate = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var actionType;
            if (width <= viewPorts.mobile.maxWidth)
                actionType = { type: 'setMobile' };
            else if (width <= viewPorts.tablet.maxWidth)
                actionType = { type: 'setTablet' };
            else if (width <= viewPorts.largeScreen.maxWidth)
                actionType = { type: 'setLarge' };
            else
                actionType = { type: 'setWide' };
            dispatch(__assign(__assign({}, actionType), { value: width }));
            if (width >= viewPorts.computer.minWidth)
                dispatch({ type: 'setComputer', value: width });
            dispatch({ type: 'setWidth', value: width });
            dispatch({ type: 'setHeight', value: height });
        };
        window.addEventListener('resize', calculate);
        calculate();
        return function () { return window.removeEventListener('resize', calculate); };
    }, []);
    return state;
}

exports.default = useScreen;
exports.initialState = initialState;
exports.reducer = reducer;
exports.viewPorts = viewPorts;
//# sourceMappingURL=index.js.map
