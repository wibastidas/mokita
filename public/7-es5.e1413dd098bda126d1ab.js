(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{xaHa:function(e,t,n){"use strict";n.r(t),n.d(t,"createSwipeBackGesture",(function(){return i}));var r=n("OMvp"),a=(n("y08P"),n("iWo5")),i=function(e,t,n,i,o){var c=e.ownerDocument.defaultView;return Object(a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(e){return e.startX<=50&&t()},onStart:n,onMove:function(e){i(e.deltaX/c.innerWidth)},onEnd:function(e){var t=c.innerWidth,n=e.deltaX/t,a=e.velocityX,i=a>=0&&(a>.2||e.deltaX>t/2),u=(i?1-n:n)*t,s=0;if(u>5){var d=u/Math.abs(a);s=Math.min(d,540)}o(i,n<=0?.01:Object(r.e)(0,n,.9999),s)}})}}}]);