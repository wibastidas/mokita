!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"+iOL":function(n,r,i){"use strict";i.r(r),i.d(r,"RegisterPageModule",(function(){return m}));var o=i("ofXK"),a=i("3Pt+"),s=i("TEn/"),c=i("tyNb"),u=i("mrSG"),b=i("fXoL"),l=i("lGQG");function f(e,t){1&e&&(b.Nb(0,"a",10),b.nc(1,"\xbfYa tienes una cuenta? "),b.Mb())}var p,h,d,g=[{path:"",component:(p=function(){function n(t,r){e(this,n),this.authSvc=t,this.router=r,this.isNewUserCobrador=null}var r,i,o;return r=n,(i=[{key:"ngOnInit",value:function(){this.getCurrentUser()}},{key:"getCurrentUser",value:function(){this.authSvc.getLoggedUser()&&Object.assign({},this.authSvc.getLoggedUser().roles).hasOwnProperty("admin")&&(this.isNewUserCobrador=!0)}},{key:"onRegister",value:function(e,t,n){return Object(u.a)(this,void 0,void 0,regeneratorRuntime.mark((function r(){var i,o,a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,i=null,n&&(i=this.authSvc.getLoggedUser().uid),r.next=5,this.authSvc.registerUser(e.value,t.value,n,i);case 5:(o=r.sent)&&(a=this.authSvc.isEmailVerified(o),this.redirectUser(a)),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),console.log("Error",r.t0);case 12:case"end":return r.stop()}}),r,this,[[0,9]])})))}},{key:"redirectUser",value:function(e){this.router.navigate(e?["/"]:["verify-email"])}}])&&t(r.prototype,i),o&&t(r,o),n}(),p.\u0275fac=function(e){return new(e||p)(b.Ib(l.a),b.Ib(c.g))},p.\u0275cmp=b.Cb({type:p,selectors:[["app-register"]],decls:26,vars:1,consts:[["slot","start"],["lines","full"],["position","floating"],["type","text","required",""],["email",""],["type","password","required",""],["password",""],["type","submit","expand","block",3,"click"],[1,"ion-text-end"],["routerLink","/login",4,"ngIf"],["routerLink","/login"]],template:function(e,t){if(1&e){var n=b.Ob();b.Nb(0,"ion-header"),b.Nb(1,"ion-toolbar"),b.Nb(2,"ion-title"),b.nc(3,"Crear una cuenta"),b.Mb(),b.Nb(4,"ion-buttons",0),b.Jb(5,"ion-back-button"),b.Mb(),b.Mb(),b.Mb(),b.Nb(6,"ion-content"),b.Nb(7,"form"),b.Nb(8,"ion-item",1),b.Nb(9,"ion-label",2),b.nc(10,"Correo:"),b.Mb(),b.Jb(11,"ion-input",3,4),b.Mb(),b.Nb(13,"ion-item",1),b.Nb(14,"ion-label",2),b.nc(15,"Contrase\xf1a"),b.Mb(),b.Jb(16,"ion-input",5,6),b.Mb(),b.Nb(18,"ion-row"),b.Nb(19,"ion-col"),b.Nb(20,"ion-button",7),b.Vb("click",(function(){b.jc(n);var e=b.hc(12),r=b.hc(17);return t.onRegister(e,r,t.isNewUserCobrador)})),b.nc(21,"Crear"),b.Mb(),b.Mb(),b.Mb(),b.Mb(),b.Nb(22,"ion-row"),b.Nb(23,"ion-col"),b.Nb(24,"p",8),b.mc(25,f,2,0,"a",9),b.Mb(),b.Mb(),b.Mb(),b.Mb()}2&e&&(b.yb(25),b.ec("ngIf",!t.user))},directives:[s.s,s.Q,s.P,s.i,s.e,s.f,s.p,a.n,a.i,a.j,s.v,s.A,s.u,s.Y,s.F,s.o,s.h,o.l,c.i,s.W],styles:[""]}),p)}],v=((d=function t(){e(this,t)}).\u0275mod=b.Gb({type:d}),d.\u0275inj=b.Fb({factory:function(e){return new(e||d)},imports:[[c.j.forChild(g)],c.j]}),d),m=((h=function t(){e(this,t)}).\u0275mod=b.Gb({type:h}),h.\u0275inj=b.Fb({factory:function(e){return new(e||h)},imports:[[o.c,a.e,s.R,v]]}),h)}}])}();