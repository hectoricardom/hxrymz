(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{126:function(e,t,a){},133:function(e,t,a){"use strict";a.r(t);var n=a(37),o=a(0),i=a.n(o),c=a(16),r=a(1),l=a(44),d=a(24),s=a(10),m=(a(126),Object(s.a)(function(){return a.e(2).then(a.bind(null,116))})),u=Object(s.a)(function(){return a.e(3).then(a.bind(null,112))}),f=Object(s.a)(function(){return a.e(20).then(a.bind(null,128))});t.default=Object(l.a)(function(e){var t=function(){Object(c.c)(function(e){return e.observeChanges});var e=Object(c.c)(function(e){return e.forms}),t=(Object(c.c)(function(e){return e.rdxOK}),Object(c.c)(function(e){return e.goDark})),a=Object(c.b)();return{dispatch:a,updKV:function(e,t){a({type:"UPD_KEY_VALUE",kv:{key:e,value:t}}),a({type:"UPD_KEY_VALUE",kv:{key:"observeChanges",value:r.f()}})},goDark:t,forms:e,updForms:function(t,n,o){var i=e;i[t]||(i[t]={}),i[t][n]=o,a({type:"UPD_KEY_VALUE",kv:{key:"forms",value:i}}),a({type:"UPD_KEY_VALUE",kv:{key:"observeChanges",value:r.f()}})},_updFormObs:function(){a({type:"UPD_KEY_VALUE",kv:{key:"observeForms",value:r.f()}})},_generateToken:function(e,t){Object(d.h)(e,a,t)},_verifyToken:function(e,t){Object(d.m)(e,a,t)}}}(),a=t.dispatch,l=t._updFormObs,s=(t.forms,t.updForms,t._generateToken),v=t._verifyToken,g=r.m(),b=(r.l(),Object(o.useState)(!1)),_=Object(n.a)(b,2),p=_[0],E=_[1],k=Object(o.useState)(!1),h=Object(n.a)(k,2),y=(h[0],h[1],Object(o.useState)(!1)),O=Object(n.a)(y,2),w=O[0],N=O[1],j=r.k("Logins")||{},C=g.loginProfile||{},T=C.code,x=C.phonecode,L=C.errorCode,S=C.errorMsg;Object(o.useEffect)(function(){p||(E(!0),setTimeout(function(){window.scrollTo(0,0),N(!0);var e=window.localStorage.getItem("_email_");e&&r.z("Logins",{email:e});var t=window.localStorage.getItem("_codeValidation_");if(t&&t>(new Date).getTime()){var n=window.localStorage.getItem("_codeValidationPhone_");C.code=!0,C.phonecode=n,r.A("loginProfile",C)}l(),a({type:"UPD_KEY_VALUE",kv:{key:"observeChanges",value:r.f()}})},650))});var P=function(e){var t=j?j.email:null;t&&s({params:{email:t},query:"generateToken"},"loginProfile")},U=function(e){var t=e||(j?j.code:null);t&&v({params:{code:t},query:"verifyToken"},"vTkn")},A=r.i(),D=("Android"===A.os||"iPhone"===A.os||g.outerWidth,{en:"Enter the 6-digit code sent to your phone number ending in ".concat(x),es:"Introdusca el codigo de 6 digitos enviado a su telefono terminado en ".concat(x)});return i.a.createElement("div",{className:"loadingLoging ".concat(L?"_error":"")},p?i.a.createElement("div",{className:"c-tabs-content","is-in-viewport":"".concat(w)},i.a.createElement("div",{className:"left_Section left_SectionTextMedia left_SectionTextMedias lSectionNoPadding center_Tabs_Section","aria-hidden":!0,"aria-labelledby":"",key:"8543845",role:"tabpanel"},i.a.createElement("div",{className:"--auto--margin grid--middle u-grid--override center_Tab_Content_Slide  desktop--6-12 tablet--8-12 mobile--11-12"},i.a.createElement("div",{className:"grid__item desktop--4-12 tablet--11-12 --auto--margin"},i.a.createElement("div",{className:"left_Section__text cascade-text desktop--10-12 tablet--8-12 mobile--12-12 --auto--margin"},i.a.createElement("h3",{className:"beta cascade-text__item white-Color-Text","btn-dt-id":"".concat(r.a.encode("datePickbutton".concat(984823)))},"".concat(L?S:T?"Introducir el c\xf3digo de verificaci\xf3n":"Login")),i.a.createElement("div",{className:"text-normal cascade-text__item  white-backColor"},i.a.createElement("div",{className:"OptionContM islogin active_",style:{minWidth:"100%"}},i.a.createElement("div",{className:"_w100  _dsplFlx spaceAround"},i.a.createElement("div",{className:"text-description"},L?S:T?D.es:"Le enviaremos un codigo")),i.a.createElement("div",{className:"_w100  _dsplFlx spaceAround"},i.a.createElement("div",{className:"email--login"},i.a.createElement(m,{icon:"more_vert",form:"Login",field:T?"code":"email",keyCode:49,background:L?"#e53935":"#ff7817",color:"#fff",inputColor:"#fff",placeholder:T?"Code":"Email",OnChange:function(e){return function(e,t){var a=j;if(T){var n=e.toUpperCase();a[t]=n,n.length>5&&U(n)}else a[t]=e;r.z("Logins",a),l()}(e,T?"code":"email")},validations:{email:{reqired:!0,email:!0},code:{reqired:!0,uppercase:!0}}[T?"code":"email"],initvalue:j[T?"code":"email"]}))),i.a.createElement("div",{className:"_w100  _dsplFlx spaceAround MrgTp95"},i.a.createElement("div",{className:"paddField"},i.a.createElement(f,{title:T?"Verify Code":"Login",theme:"gray",icon:"send",clickEvent:function(){T?U():P()}}))),T?i.a.createElement("div",{className:"center--padding--btn-login"},i.a.createElement("div",{className:"center--Container grayStyle",onClick:function(e){},style:{"--color-tab--base--hover":"#777"}},i.a.createElement("div",{className:"hoverDiv grayBck "}),i.a.createElement("span",{className:"text2D grayBck"},"Try a diferent Email"))):null))))))):null,w?null:i.a.createElement("div",{className:!0},i.a.createElement(u,{stroke:"#fff",height:120,width:120})))})}}]);
//# sourceMappingURL=13.092d6e3d.chunk.js.map