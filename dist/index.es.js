import{useReducer as e,useLayoutEffect as t}from"react";
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
***************************************************************************** */var i=function(){return(i=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},r={mobile:{minWidth:1,maxWidth:767},tablet:{minWidth:768,maxWidth:991},computer:{minWidth:992,maxWidth:0},largeScreen:{minWidth:0,maxWidth:1919},wideScreen:{minWidth:1920,maxWidth:0}},n={isMobile:!1,isTablet:!1,isComputer:!1,isLargeScreen:!1,isWideScreen:!1,screenWidth:window.innerWidth,screenHeight:window.innerHeight},a=function(e,t){switch(t.type){case"setMobile":return i(i({},n),{isMobile:!0,width:t.value});case"setTablet":return i(i({},n),{isTablet:!0});case"setComputer":return i(i({},e),{isComputer:!0});case"setLarge":return i(i({},n),{isLargeScreen:!0});case"setWide":return i(i({},n),{isWideScreen:!0});case"setWidth":return i(i({},e),{screenWidth:t.value});case"setHeight":return i(i({},e),{screenHeight:t.value});default:return n}};function s(){var s=e(a,n),d=s[0],o=s[1];return t((function(){var e=function(){var e,t=window.innerWidth,n=window.innerHeight;e=t<=r.mobile.maxWidth?{type:"setMobile"}:t<=r.tablet.maxWidth?{type:"setTablet"}:t<=r.largeScreen.maxWidth?{type:"setLarge"}:{type:"setWide"},o(i(i({},e),{value:t})),t>=r.computer.minWidth&&o({type:"setComputer",value:t}),o({type:"setWidth",value:t}),o({type:"setHeight",value:n})};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),d}export default s;export{n as initialState,a as reducer,r as viewPorts};
//# sourceMappingURL=index.es.js.map
