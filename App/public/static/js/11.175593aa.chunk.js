(window.webpackJsonp=window.webpackJsonp||[]).push([[11,0],{109:function(t,e,a){"use strict";a.r(e),a.d(e,"default",function(){return c});var n=a(36),l=a(0),i=a.n(l),o=a(1);function c(t){var e=t.name,a=Object(l.useState)(o.g()),c=Object(n.a)(a,1)[0],s=o.o(),r=s&&s[e],d=t.size?t.size:24,u=t.color?t.color:"#5c5c5c";return i.a.createElement("svg",{className:"_Icons_".concat(c,"_"),fill:u,height:d,viewBox:"0 0 24 24",width:d},i.a.createElement("path",{d:r||""}))}},128:function(t,e,a){"use strict";a.r(e);var n=a(36),l=a(0),i=a.n(l),o=a(16),c=a(37),s=(a(41),a(1)),r=(a(109),{}),d=function(){var t=Object(o.c)(function(t){return t.observeComponent}),e=Object(o.b)();return{observeChanges:t,close:function(t){r[t].isTitleDetail=!1,Object(c.b)(e,{id:t})},dispatch:e}};e.default=function(){d().observeChanges;var t=Object(c.j)().listWathDialog||{},e=Object.keys(t);return i.a.createElement(i.a.Fragment,null,e.map(function(e){var a=t[e];return a&&a.visible?i.a.createElement(u,{dlg:a,dg:e,content:a.content}):null}))};var u=function(t){var e=d(),a=(e.observeChanges,e.close),o=(e.dispatch,e._getVideosById,e._openPlayer,t.dg),c=t.dlg,u=t.content,m=s.m(),p=s.n(),v=Object(l.useState)(!1),b=Object(n.a)(v,2),f=b[0],w=b[1],g=Object(l.useState)(0),y=Object(n.a)(g,2),x=(y[0],y[1],Object(l.useState)(!1)),h=Object(n.a)(x,2),O=(h[0],h[1],Object(l.useState)(!1)),j=Object(n.a)(O,2),B=(j[0],j[1],c.data),I=(p.detailVideoByID||B.item,window.location.hash.split("?")[1]?window.location.hash.split("?")[1]:null),E=(s.u(I).title,B.dmz||{}),k=E.top,D=E.left,S=r&&r[o]&&r[o].lastScroll;"showing"===c.action&&S&&r[o].lastScroll;var _={width:0,transform:"translateX(".concat(D,"px) translateY(",1e3,"px) scaleX(0.4) scaleY(0.4) translateZ(0px)"),transition:"opacity 150ms ease, transform 150ms ease, -webkit-transform 150ms ease",top:0,left:0,opacity:0,boxShadow:"rgba(0, 0, 0, 0.75) 0px 3px 10px"};_.width="calc(98vmin - 17px)",_.transform="translateX(calc(50vw - (calc(98vmin - 17px) / 2))) translateY(calc( 52em)) scaleX(1) scaleY(1) translateZ(0px)",_.boxShadow="rgba(0, 0, 0, 0.75) 0px 3px 10px",_.transition="opacity 450ms ease, transform 450ms ease, -webkit-transform 450ms ease",_.marginBottom="2em",_.minWidth="350px",_.zIndex=c.zIndex||180,_.top=0,_.left=0,_.boxShadow="rgba(0, 0, 0, 0.75) 0px 3px 10px",c.display&&(_.transform="translateX(calc(50vw - (calc(98vmin - 17px) / 2))) translateY(calc( 2em)) scaleX(1) scaleY(1) translateZ(0px)",_.opacity=1);var T="".concat(m[74],"_").concat(o,"_d");r[o]||(r[o]={});var z=function(t){var e=document.getElementById("data_ui_".concat(m[93])),n=r[o].lastScroll;a(o,!1),r[o].isTitleDetail=!1;var l=r[o].timeOut;l&&(clearInterval(l),r[o].timeOut=null),t?(e.style.position="static",window.scrollTo(0,n),e.style.top=null,setTimeout(function(){s.B("detailVideoByID",null),s.B("seasonsbyVideoByID",null),s.B("similarList",null)},240)):p.route_history&&setTimeout(function(){e.style.position="static",window.scrollTo(0,n),e.style.top=null,s.B("detailVideoByID",null),s.B("seasonsbyVideoByID",null),s.B("similarList",null)},240)};Object(l.useEffect)(function(){if(!f){var e=document.getElementById("data_ui_".concat(m[93]));e.style.position="fixed";var a=s.k().scrollPosition;e.style.top=-1*a+"px",e.style.width="100%",window.scrollTo(0,0),r[o].lastScroll=a,w(!0),n=!0,"function"===typeof t.updTitleDetail&&t.updTitleDetail(n)}var n;s.z("click",null),w(!0)});var C=null;u&&(C=i.a.cloneElement(u,{modalId:o,closePop:z}));var N={minHeight:"70vh"};return c.data&&c.data.minHeight&&(N={minHeight:c.data.minHeight}),i.a.createElement("div",{id:T,className:"focus-trap-wrapper previewModal--wrapper detail-modal",tabindex:"-1"},i.a.createElement("div",{tabIndex:"-1",style:{opacity:.857}},i.a.createElement("div",{className:"previewModal--backDrop trnsp2",tabindex:"-1","data-uia":"previewModal--backDrop",onClick:function(){return function(t){var e=s.k().click,a=document.getElementById(T+"dialog"),n=r[o].timeOut;if(e&&e.target&&a){var l=e.target;n&&l.tagName&&a&&a.contains(l)||(z(),clearInterval(n),r[o].timeOut=null)}}()}})),i.a.createElement("div",{id:T+"dialog",role:"dialog","aria-modal":"true",tabindex:"-1",className:"previewModal--container  detail-modal",style:_},i.a.createElement("div",{className:"spaceTransparent",style:N,onClick:function(){return z()}}),C))}}}]);
//# sourceMappingURL=11.175593aa.chunk.js.map