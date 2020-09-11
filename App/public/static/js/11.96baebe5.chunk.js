(window.webpackJsonp=window.webpackJsonp||[]).push([[11,0],{109:function(n,t,e){"use strict";e.r(t),e.d(t,"default",function(){return r});var a=e(36),o=e(1),c=e.n(o),i=e(2);function r(n){var t=n.name,e=Object(o.useState)(i.f()),r=Object(a.a)(e,1)[0],s=i.m(),l=s&&s[t],d=n.size?n.size:24,b=n.color?n.color:"#5c5c5c";return c.a.createElement("svg",{className:"_Icons_".concat(r,"_"),fill:b,height:d,viewBox:"0 0 24 24",width:d},c.a.createElement("path",{d:l||""}))}},117:function(n,t,e){"use strict";e.r(t);var a=e(36),o=e(1),c=e.n(o),i=e(16),r=e(2),s=e(109);t.default=function(n){var t=function(){var n=Object(i.c)(function(n){return n.observeChanges}),t=(Object(i.c)(function(n){return n.observeForms}),Object(i.c)(function(n){return n.navigations})),e=Object(i.b)();return{observeChanges:n,updForms:function(n,t,a){var o=r.j(n)||{};o[t]=a,r.v(n,o),e({type:"UPD_KEY_VALUE",kv:{key:"observeForms",value:r.f()}})},navigations:t}}(),e=(t.forms,t.observeChanges,t.updForms),b=r.l(),u=r.k(),f=b.maskClassName,m=l(f),p=n.placeholder,x=n.index,v=n.keyCode,g=n.field,h=n.form,w=n.background,k=n.color,y=n.inputColor,z=Object(o.useState)(""),N=Object(a.a)(z,2),O=N[0],j=N[1],H=Object(o.useState)(!1),E=Object(a.a)(H,2),_=E[0],C=E[1],X=Object(o.useState)(!1),I=Object(a.a)(X,2),A=I[0],F=I[1],S=Object(o.useState)({v:!0}),W=Object(a.a)(S,2),L=W[0],B=W[1],J=Object(o.useState)(null),q=Object(a.a)(J,2),V=q[0],D=q[1],P=v||r.g(),Z=u&&u[P]?u[P]:r.f(),$=p||"label",M=Object(o.useState)(!1),K=Object(a.a)(M,2),Q=K[0],R=K[1],T=r.j(h)||{},U=n.initvalue?n.initvalue:T&&T[g]?T[g]:null,Y=function(t){var e=n.validations,a=n.placeholder,o={v:!0,m:""};e&&(t?(e.minLength&&t.toString().length<e.minLength&&(o={v:!1,m:"Minimum ".concat(e.minLength," characters required")}),e.maxLength&&t.toString().length>e.maxLength&&(o={v:!1,m:"Maximum characters are ".concat(e.maxLength)}),e.email&&(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||(o={v:!1,m:"email not valid"})),e.ssn&&(/^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(t)||(o={v:!1,m:"ssn not valid"})),e.phone&&(isNaN(t)?o={v:!1,m:"phone not valid"}:(t=parseInt(t.toString()),/^[\dX]{3}-?[\dX]{3}-?[\dX]{4}$/.test(t)||(o={v:!1,m:"phone not valid"}))),e.date&&(/^(\d{2})(\/)(\d{2})(\/)(\d{4})$/.test(t)||(o={v:!1,m:"date not valid"})),e.ip&&(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(t)||(o={v:!1,m:"invalid IP address"})),e.number&&(isNaN(t)?o={v:!1,m:"number not valid"}:(t=parseFloat(t.toString()),e.minValue&&t<e.minValue&&(o={v:!1,m:"value must be at least ".concat(e.minValue)}),e.maxValue&&t>e.maxValue&&(o={v:!1,m:"value greater than maximum allowed"}))),e.uppercase&&(t=t.toString().toUpperCase()),e.lowercase&&(t=t.toString().toLowerCase()),e.card&&(d.test(t)||(o={v:!1,m:"card not valid"}))):e.required&&(o={v:!1,m:"".concat(a," required")})),function(n){var t=document.getElementById("".concat(Z,"_input"));t&&(t.value=n)}(t),j(t),B(o),"function"===typeof n.OnChange&&n.OnChange(t)};Object(o.useEffect)(function(t){if(A||(n.initvalue?setTimeout(function(){Y(U||"",j,n,e,B),F(!0)},75):F(!0)),U!==V)if(D(U),U){if(!V){var a=U||"";setTimeout(function(){Y(a,j,n,e,B)},80)}}else{var o=U||"";setTimeout(function(){Y(o,j,n,e,B)},80)}});var G=!1,nn=U||O||"";nn.toString().length>0&&(G=!0);var tn=!1;L.v||(tn=!0,L.m?$=L.m:$+=" required");var en="._".concat(Z,"_.").concat(f.N3Hzgf," .").concat(f.AxOyFc,".labelActive{ -webkit-transform: scale(.75) translateY(-39px); transform: scale(.75) translateY(-39px);} "),an={color:tn?"firebrick":_?k||"#1a38e8":"#80868b"},on={border:tn?"2px solid firebrick":_?"2px solid "+(k||"#1a38e8"):"1px solid #dadce0"},cn=!!_||!!G||!!tn,rn="text";n.validations&&(n.validations.number&&(rn="number"),n.validations.email&&(rn="email"),n.validations.password&&(Q||(rn="password")));var sn=_?{}:{value:nn};w&&(an.background=w);var ln={};return y&&(ln.color=y),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{id:"".concat(Z),className:"_".concat(Z,"_ ").concat(f.N3Hzgf," ").concat(f.rFrNMe," ").concat(f.jjwyfe," ").concat(_?f.u3bW4e:""," ").concat(G?f.CDELXb:""," ").concat(tn?f.INVALID:""," _input")},c.a.createElement("div",{className:"".concat(f.aCsJod," ").concat(f.oJeWuf)},c.a.createElement("div",{className:"".concat(f.aXBtI," ").concat(f.Wic03c),style:on},c.a.createElement("div",{className:"".concat(f.Xb9hP)},c.a.createElement("input",Object.assign({type:rn,className:"".concat(f.whsOnd," ").concat(f.zHQkBf),id:"".concat(Z,"_input"),tabIndex:x,dir:"ltr",style:ln},sn,{onChange:function(n){return function(n){var t=n.target.value?n.target.value:"";setTimeout(function(){Y(t)},20)}(n)},onFocus:function(n){C(!0)},onKeyUp:function(t){return function(t){"function"===typeof n.submitKeyEnter&&13===t.keyCode&&n.submitKeyEnter()}(t)},onBlur:function(t){return function(){var t=n.form,a=n.field;e(t,a,O),C(!1)}()}})),cn&&c.a.createElement("style",null,en),c.a.createElement("div",{className:"".concat(f.AxOyFc," ").concat(f.snByac," labelActive"),style:an},$),n.validations&&n.validations.password&&c.a.createElement("div",{className:"visibility_passW",onClick:function(){return R(!Q)}},c.a.createElement(s.default,{name:Q?"visibility_off_outline":"visibility_on_outline"}))),!1,!1)),c.a.createElement("style",null,m)))};var l=function(n){return"\n\n    .visibility_passW{\n      padding-top: 12px;\n      color: rgb(128, 134, 139);\n    }\n\n    .".concat(n.N3Hzgf," .").concat(n.oJeWuf," {\n        height: 56px;\n        padding-top: 0;\n    }\n\n    .").concat(n.rFrNMe,".sdJrJc>.").concat(n.aCsJod," {\n        padding-top: 24px;\n    }\n\n    .").concat(n.aCsJod," {\n      height: 40px;\n      position: relative;\n      vertical-align: top;\n    }\n\n    .").concat(n.N3Hzgf," .").concat(n.Wic03c," {\n    -webkit-align-items: center;\n    align-items: center;\n    position: static;\n    top: 0;\n    border-radius:4px;\n    border: 1px solid #e1e1e1;\n    }\n\n    .").concat(n.aXBtI," {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    position: relative;\n    top: 14px;\n    }\n\n\n    .").concat(n.whsOnd," {\n    -webkit-box-flex: 1;\n    box-flex: 1;\n    -webkit-flex-grow: 1;\n    flex-grow: 1;\n    -webkit-flex-shrink: 1;\n    flex-shrink: 1;\n    background-color: transparent;\n    border: none;\n    display: block;\n    font: 400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;\n    height: 24px;\n    line-height: 24px;\n    margin: 0;\n    min-width: 0%;\n    outline: none;\n    padding: 0;\n    z-index: 0;\n    }\n\n\n    .").concat(n.AxOyFc," {\n    -webkit-transform-origin: bottom left;\n    transform-origin: bottom left;\n    -webkit-transition: all .3s cubic-bezier(0.4,0,0.2,1);\n    transition: all .3s cubic-bezier(0.4,0,0.2,1);\n    -webkit-transition-property: color,bottom,transform;\n    transition-property: color,bottom,transform;\n    color: rgba(0,0,0,0.38);\n    font: 400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;\n    font-size: 16px;\n    pointer-events: none;\n    position: absolute;\n    bottom: 3px;\n    left: 0;\n    width: 100%;\n    }\n\n\n    .").concat(n.Xb9hP," {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-flex: 1;\n        box-flex: 1;\n        -webkit-flex-grow: 1;\n        flex-grow: 1;\n        -webkit-flex-shrink: 1;\n        flex-shrink: 1;\n        min-width: 0%;\n        position: relative;\n    }\n\n    .").concat(n.Xb9hP,"::after,\n    .").concat(n.Xb9hP,"::before {\n      color: #202124;\n    }\n      \n\n\n    .").concat(n.N3Hzgf," .").concat(n.zHQkBf," {\n    -webkit-border-radius: 4px;\n    border-radius: 4px;\n    color: #202124;\n    font-size: 16px;\n    height: 28px;\n    margin: 1px 1px 0 1px;\n    padding: 13px 15px;\n    z-index: 1;\n    }\n\n    .").concat(n.jjwyfe," .").concat(n.zHQkBf,", .").concat(n.jjwyfe," .MQL3Ob {\n    direction: ltr;\n    text-align: left;\n    }\n    .").concat(n.N3Hzgf," .").concat(n.AxOyFc," {\n    font-family: roboto,arial,sans-serif;\n    }\n\n    .").concat(n.N3Hzgf," .").concat(n.AxOyFc," {\n    background: #fff;\n    bottom: 17px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    color: #80868b;\n    font-size: 16px;\n    font-weight: 400;\n    left: 8px;\n    max-width: -webkit-calc(100% - (2*8px));\n    max-width: calc(100% - (2*8px));\n    overflow: hidden;\n    padding: 0 8px;\n    text-overflow: ellipsis;\n    -webkit-transition: transform 150ms cubic-bezier(0.4,0,0.2,1),opacity 150ms cubic-bezier(0.4,0,0.2,1);\n    transition: transform 150ms cubic-bezier(0.4,0,0.2,1),opacity 150ms cubic-bezier(0.4,0,0.2,1);\n    white-space: nowrap;\n    width: auto;\n    z-index: 1;\n    }\n\n\n\n    .").concat(n.N3Hzgf,".").concat(n.u3bW4e," .").concat(n.whsOnd,":not([disabled]):focus~.").concat(n.AxOyFc,"{\n      color: #1a38e8;\n    }\n\n\n    .").concat(n.N3Hzgf,".").concat(n.u3bW4e," .").concat(n.Wic03c,"{\n      border: 2px solid #1a38e8;\n    }\n   \n    .").concat(n.N3Hzgf,".").concat(n.INVALID," .").concat(n.Wic03c,"{\n      border: 2px solid firebrick;\n    }\n   \n   \n\n    .").concat(n.N3Hzgf," .").concat(n.mIZh1c,", .").concat(n.N3Hzgf,".").concat(n.k0tWj," .").concat(n.mIZh1c," {\n        height: 100%;\n    }\n\n    .").concat(n.N3Hzgf," .").concat(n.mIZh1c,", \n    .").concat(n.N3Hzgf," .").concat(n.cXrdqd,"\n    {\n    background-color: transparent;\n    }\n\n    .").concat(n.N3Hzgf," .").concat(n.mIZh1c," {\n    border: 1px solid #dadce0;\n    -webkit-border-radius: 4px;\n    border-radius: 4px;\n    bottom: 0;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    }\n\n\n\n    .").concat(n.N3Hzgf,".").concat(n.u3bW4e," .").concat(n.cXrdqd," {\n      border: 2px solid #1a73e8;\n    }\n   \n  .").concat(n.N3Hzgf,".").concat(n.u3bW4e," .").concat(n.cXrdqd,", .N3Hzgf.IYewr .").concat(n.cXrdqd," {\n    -webkit-animation: none;\n    animation: none;\n    opacity: 1;\n  }\n\n\n\n")},d=/^(?:9[0-9]{12}(?:[0-9]{3})?)$/}}]);
//# sourceMappingURL=11.96baebe5.chunk.js.map