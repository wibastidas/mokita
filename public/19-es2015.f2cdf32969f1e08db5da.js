(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{jYoP:function(e,o,n){"use strict";n.r(o),n.d(o,"CustomerDetailPageModule",(function(){return G}));var t=n("ofXK"),i=n("3Pt+"),s=n("TEn/"),r=n("PCNd"),c=n("tyNb"),a=n("mrSG"),l=n("wd/R"),m=n("IzEk"),b=n("fXoL"),d=n("UrgT"),u=n("lGQG"),g=n("3LUQ"),p=n("6c4d"),f=n("ccOi"),h=n("b1s6");function y(e,o){1&e&&b.Jb(0,"ion-progress-bar",12)}function N(e,o){1&e&&b.Jb(0,"app-skeleton")}function M(e,o){1&e&&(b.Nb(0,"div",15),b.nc(1," El cliente no tiene pr\xe9stamos asociados. "),b.Mb())}function v(e,o){if(1&e&&(b.Lb(0),b.mc(1,M,2,0,"div",14),b.Kb()),2&e){const e=b.Xb(2);b.yb(1),b.ec("ngIf",!e.sales||0==e.sales.length)}}function I(e,o){if(1&e){const e=b.Ob();b.Nb(0,"ion-button",21),b.Vb("click",(function(){b.jc(e);const o=b.Xb().$implicit;return b.Xb(3).goSaleDetail(o)})),b.nc(1,"Ver m\xe1s"),b.Mb()}}function C(e,o){if(1&e){const e=b.Ob();b.Nb(0,"ion-item-options",22),b.Nb(1,"ion-item-option",23),b.Vb("click",(function(){b.jc(e);const o=b.Xb().$implicit;return b.Xb(3).deleteSaleConfirm(o)})),b.Jb(2,"ion-icon",24),b.Mb(),b.Mb()}}function S(e,o){if(1&e&&(b.Nb(0,"ion-item-sliding",17),b.Nb(1,"ion-item"),b.Nb(2,"ion-label"),b.Nb(3,"h2"),b.nc(4),b.Mb(),b.Nb(5,"h3"),b.nc(6),b.Yb(7,"currency"),b.Mb(),b.Nb(8,"p",18),b.nc(9),b.Mb(),b.Mb(),b.mc(10,I,2,0,"ion-button",19),b.Mb(),b.mc(11,C,3,0,"ion-item-options",20),b.Mb()),2&e){const e=o.$implicit,n=b.Xb(3);b.yb(4),b.pc("Estado: ",e.estado,""),b.yb(2),b.pc("Monto: ",b.bc(7,6,e.amount,"$","symbol","1.2-2"),""),b.yb(3),b.qc("Cuotas: ",e.numeroCuotas," x ",e.montoCuota," "),b.yb(1),b.ec("ngIf",n.roleAutorization.canReadSale(n.authSvc.getLoggedUser())),b.yb(1),b.ec("ngIf",n.roleAutorization.canDeleteSale(n.authSvc.getLoggedUser()))}}function F(e,o){if(1&e&&(b.Lb(0),b.mc(1,S,12,11,"ion-item-sliding",16),b.Kb()),2&e){const e=b.Xb(2);b.yb(1),b.ec("ngForOf",e.sales)}}function w(e,o){if(1&e&&(b.Nb(0,"ion-list",13),b.mc(1,v,2,1,"ng-container",3),b.mc(2,F,2,1,"ng-container",3),b.Mb()),2&e){const e=b.Xb();b.yb(1),b.ec("ngIf",!e.loadingLoansInformation),b.yb(1),b.ec("ngIf",e.sales&&e.sales.length>0)}}function O(e,o){if(1&e&&(b.Nb(0,"div",43),b.nc(1),b.Mb()),2&e){const e=b.Xb().$implicit;b.yb(1),b.pc(" ",e.message," ")}}function X(e,o){if(1&e&&(b.Lb(0),b.mc(1,O,2,1,"div",42),b.Kb()),2&e){const e=o.$implicit,n=b.Xb(2);b.yb(1),b.ec("ngIf",n.customerForm.get("name").hasError(e.type)&&(n.customerForm.get("name").dirty||n.customerForm.get("name").touched))}}function L(e,o){if(1&e&&(b.Nb(0,"div",43),b.nc(1),b.Mb()),2&e){const e=b.Xb().$implicit;b.yb(1),b.pc(" ",e.message," ")}}function q(e,o){if(1&e&&(b.Lb(0),b.mc(1,L,2,1,"div",42),b.Kb()),2&e){const e=o.$implicit,n=b.Xb(2);b.yb(1),b.ec("ngIf",n.customerForm.get("lastName").hasError(e.type)&&(n.customerForm.get("lastName").dirty||n.customerForm.get("lastName").touched))}}function z(e,o){if(1&e&&(b.Nb(0,"div",43),b.nc(1),b.Mb()),2&e){const e=b.Xb().$implicit;b.yb(1),b.pc(" ",e.message," ")}}function E(e,o){if(1&e&&(b.Lb(0),b.mc(1,z,2,1,"div",42),b.Kb()),2&e){const e=o.$implicit,n=b.Xb(2);b.yb(1),b.ec("ngIf",n.customerForm.get("document").hasError(e.type)&&(n.customerForm.get("document").dirty||n.customerForm.get("document").touched))}}function J(e,o){if(1&e&&(b.Nb(0,"div",43),b.nc(1),b.Mb()),2&e){const e=b.Xb().$implicit;b.yb(1),b.pc(" ",e.message," ")}}function $(e,o){if(1&e&&(b.Lb(0),b.mc(1,J,2,1,"div",42),b.Kb()),2&e){const e=o.$implicit,n=b.Xb(2);b.yb(1),b.ec("ngIf",n.customerForm.get("phoneNumber").hasError(e.type)&&(n.customerForm.get("phoneNumber").dirty||n.customerForm.get("phoneNumber").touched))}}function A(e,o){if(1&e&&(b.Nb(0,"div",43),b.nc(1),b.Mb()),2&e){const e=b.Xb().$implicit;b.yb(1),b.pc(" ",e.message," ")}}function x(e,o){if(1&e&&(b.Lb(0),b.mc(1,A,2,1,"div",42),b.Kb()),2&e){const e=o.$implicit,n=b.Xb(2);b.yb(1),b.ec("ngIf",n.customerForm.get("address").hasError(e.type)&&(n.customerForm.get("address").dirty||n.customerForm.get("address").touched))}}function k(e,o){if(1&e&&(b.Nb(0,"div",43),b.nc(1),b.Mb()),2&e){const e=b.Xb().$implicit;b.yb(1),b.pc(" ",e.message," ")}}function j(e,o){if(1&e&&(b.Lb(0),b.mc(1,k,2,1,"div",42),b.Kb()),2&e){const e=o.$implicit,n=b.Xb(2);b.yb(1),b.ec("ngIf",n.customerForm.get("reference").hasError(e.type)&&(n.customerForm.get("reference").dirty||n.customerForm.get("reference").touched))}}function B(e,o){if(1&e&&(b.Nb(0,"ion-select-option",46),b.nc(1),b.Mb()),2&e){const e=o.$implicit;b.fc("value",e.uid),b.yb(1),b.pc("",e.displayName||e.email," ")}}function P(e,o){if(1&e&&(b.Nb(0,"ion-item"),b.Nb(1,"ion-label"),b.nc(2,"Seleccionar Cobrador"),b.Mb(),b.Nb(3,"ion-select",44),b.mc(4,B,2,2,"ion-select-option",45),b.Mb(),b.Mb()),2&e){const e=b.Xb(2);b.yb(4),b.ec("ngForOf",e.cobradores)}}function D(e,o){if(1&e&&(b.Nb(0,"div",15),b.Nb(1,"ion-button",47),b.nc(2,"Actualizar"),b.Mb(),b.Mb()),2&e){const e=b.Xb(2);b.yb(1),b.ec("disabled",e.customerForm.invalid)}}function U(e,o){if(1&e){const e=b.Ob();b.Nb(0,"ion-list"),b.Nb(1,"form",25),b.Vb("ngSubmit",(function(){return b.jc(e),b.Xb().updateCustomer()})),b.Nb(2,"ion-list-header",26),b.nc(3," Informaci\xf3n Personal "),b.Mb(),b.Nb(4,"ion-item"),b.Nb(5,"ion-label",27),b.nc(6,"Nombre: "),b.Mb(),b.Jb(7,"ion-input",28),b.Jb(8,"ion-icon",29),b.Mb(),b.Nb(9,"div",30),b.mc(10,X,2,1,"ng-container",31),b.Mb(),b.Nb(11,"ion-item"),b.Nb(12,"ion-label",27),b.nc(13,"Apellido: "),b.Mb(),b.Jb(14,"ion-input",32),b.Jb(15,"ion-icon",33),b.Mb(),b.Nb(16,"div",30),b.mc(17,q,2,1,"ng-container",31),b.Mb(),b.Nb(18,"ion-item"),b.Nb(19,"ion-label",27),b.nc(20,"C\xe9dula: "),b.Mb(),b.Jb(21,"ion-input",34),b.Jb(22,"ion-icon",35),b.Mb(),b.Nb(23,"div",30),b.mc(24,E,2,1,"ng-container",31),b.Mb(),b.Nb(25,"ion-list-header",26),b.nc(26," Datos de Contacto "),b.Mb(),b.Nb(27,"ion-item"),b.Nb(28,"ion-label",27),b.nc(29,"Celular: "),b.Mb(),b.Jb(30,"ion-input",36),b.Jb(31,"ion-icon",37),b.Mb(),b.Nb(32,"div",30),b.mc(33,$,2,1,"ng-container",31),b.Mb(),b.Nb(34,"ion-item"),b.Nb(35,"ion-label",27),b.nc(36,"Direcci\xf3n: "),b.Mb(),b.Jb(37,"ion-input",38),b.Jb(38,"ion-icon",39),b.Mb(),b.Nb(39,"div",30),b.mc(40,x,2,1,"ng-container",31),b.Mb(),b.Nb(41,"ion-item"),b.Nb(42,"ion-label",27),b.nc(43,"Referencia: "),b.Mb(),b.Jb(44,"ion-input",40),b.Jb(45,"ion-icon",41),b.Mb(),b.Nb(46,"div",30),b.mc(47,j,2,1,"ng-container",31),b.Mb(),b.mc(48,P,5,1,"ion-item",3),b.mc(49,D,3,1,"div",14),b.Mb(),b.Mb()}if(2&e){const e=b.Xb();b.yb(1),b.ec("formGroup",e.customerForm),b.yb(9),b.ec("ngForOf",e.validation_messages.name),b.yb(7),b.ec("ngForOf",e.validation_messages.lastName),b.yb(7),b.ec("ngForOf",e.validation_messages.document),b.yb(9),b.ec("ngForOf",e.validation_messages.phoneNumber),b.yb(7),b.ec("ngForOf",e.validation_messages.address),b.yb(7),b.ec("ngForOf",e.validation_messages.reference),b.yb(1),b.ec("ngIf",e.roleAutorization.canEditCustomerVendor(e.authSvc.getLoggedUser())),b.yb(1),b.ec("ngIf",e.roleAutorization.canEditCustomer(e.authSvc.getLoggedUser()))}}const _=[{path:"",component:(()=>{class e{constructor(e,o,n,t,s,r,c,a,m,b){this.modalCtrl=e,this.customersService=o,this.formBuilder=n,this.route=t,this.alertController=s,this.router=r,this.authSvc=c,this.alertService=a,this.roleAutorization=m,this.salesService=b,this.isAdmin=!1,this.loadingCustomerInformation=!1,this.loadingLoansInformation=!1,this.validation_messages={name:[{type:"required",message:"El nombre es requerido."}],lastName:[{type:"required",message:"El apellido es requerido."}],document:[{type:"required",message:"La c\xe9dula es requerida."}],phoneNumber:[{type:"required",message:"El celular es requerido."}],address:[{type:"required",message:"La direcci\xf3n es requerida."}],email:[{type:"required",message:"El correo es requerido."},{type:"pattern",message:"Este no es un email v\xe1lido."}],reference:[{type:"required",message:"La referencia es requerida."}]},this.customerId=this.route.snapshot.paramMap.get("id"),console.log("customerId: ",this.customerId),this.type="loansInformation",this.customerForm=this.formBuilder.group({name:new i.b("",i.m.compose([i.m.required])),lastName:new i.b("",i.m.compose([i.m.required])),document:new i.b({value:"",disabled:!0},i.m.compose([i.m.required])),phoneNumber:new i.b("",i.m.compose([i.m.required])),address:new i.b("",i.m.compose([i.m.required])),email:new i.b("",i.m.compose([i.m.email,i.m.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])),reference:new i.b("",i.m.compose([])),createdAt:new i.b(l().format("ll")),createdBy:"",adminId:"",cobradorId:"",id:new i.b("")})}ngOnInit(){this.isAdmin=Object.assign({},this.authSvc.getLoggedUser().roles).hasOwnProperty("admin"),this.isAdmin&&this.customersService.getVendedoresByAdmin(this.authSvc.getLoggedUser().uid).subscribe(e=>{this.cobradores=e.map(e=>Object.assign({id:e.payload.doc.id},e.payload.doc.data())),console.log("this.cobradores: ",this.cobradores)}),this.loadingCustomerInformation=!0,this.customersService.getCustomerById(this.customerId).subscribe(e=>{this.loadingCustomerInformation=!1,e.id=this.customerId,this.customer=e,this.customerForm.setValue(e),this.getSalesByCustomerId()})}getSalesByCustomerId(){this.loadingLoansInformation=!0,this.salesService.getSalesByCustomerId(this.customer.id).pipe(Object(m.a)(1)).subscribe(e=>Object(a.a)(this,void 0,void 0,(function*(){this.loadingLoansInformation=!1,this.sales=e.map(e=>Object.assign({id:e.payload.doc.id},e.payload.doc.data())),console.log("this.sales: ",this.sales)})))}ngOnDestroy(){}updateCustomer(){this.customersService.updateCustomer(this.customerForm.value).then(e=>e),this.alertService.presentToast("Cliente Actualizado!.",2e3,"top","primary")}segmentChanged(e){console.log("segmentChanged ev:  ",e.detail.value)}deleteSale(e){console.log("deleteSale: ",e),this.salesService.deleteSale(e.id).then(e=>this.getSalesByCustomerId())}goSaleDetail(e){this.router.navigateByUrl("/sale-detail/"+e.id)}deleteSaleConfirm(e){return Object(a.a)(this,void 0,void 0,(function*(){const o=yield this.alertController.create({cssClass:"my-custom-class",header:"Eliminar!",message:"Eliminar <strong>pr\xe9stamo</strong>",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:e=>{console.log("Cancelar")}},{text:"Ok",handler:()=>{this.deleteSale(e)}}]});yield o.present()}))}}return e.\u0275fac=function(o){return new(o||e)(b.Ib(s.T),b.Ib(d.a),b.Ib(i.a),b.Ib(c.a),b.Ib(s.b),b.Ib(c.g),b.Ib(u.a),b.Ib(g.a),b.Ib(p.a),b.Ib(f.a))},e.\u0275cmp=b.Cb({type:e,selectors:[["app-customer-detail"]],decls:22,vars:8,consts:[["slot","start"],["fullscreen","",1,"customer-detail-page"],["type","indeterminate",4,"ngIf"],[4,"ngIf"],[3,"translucent"],[3,"ngModel","ionChange","ngModelChange"],["value","loansInformation"],["value","customerInformation"],[3,"fullscreen"],[3,"ngSwitch"],["class","ion-padding","color","light",4,"ngSwitchCase"],[4,"ngSwitchCase"],["type","indeterminate"],["color","light",1,"ion-padding"],["class","ion-text-center",4,"ngIf"],[1,"ion-text-center"],["class","loan-item",4,"ngFor","ngForOf"],[1,"loan-item"],[1,"ion-text-capitalize"],["fill","outline","slot","end",3,"click",4,"ngIf"],["side","end",4,"ngIf"],["fill","outline","slot","end",3,"click"],["side","end"],["color","danger",3,"click"],["slot","icon-only","name","trash"],[1,"new-customer-page",3,"formGroup","ngSubmit"],[1,"ios","hydrated"],["position","floating","color","primary"],["type","text","formControlName","name"],["size","small","name","person-outline","color","primary","slot","end",1,"ion-align-self-center"],[1,"validation-errors"],[4,"ngFor","ngForOf"],["type","text","formControlName","lastName"],["size","small","name","person-circle-outline","color","primary","slot","end",1,"ion-align-self-center"],["type","number","formControlName","document"],["size","small","name","wallet-outline","color","primary","slot","end",1,"ion-align-self-center"],["type","tel","formControlName","phoneNumber"],["size","small","name","phone-portrait-outline","color","primary","slot","end",1,"ion-align-self-center"],["type","text","formControlName","address"],["size","small","name","map-outline","color","primary","slot","end",1,"ion-align-self-center"],["type","text","formControlName","reference"],["size","small","name","reader-outline","color","primary","slot","end",1,"ion-align-self-center"],["class","error-message ion-padding-start",4,"ngIf"],[1,"error-message","ion-padding-start"],["okText","Seleccionar","cancelText","Cancelar","formControlName","cobradorId"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["fill","outline","expand","round","type","submit",3,"disabled"]],template:function(e,o){1&e&&(b.Nb(0,"ion-header"),b.Nb(1,"ion-toolbar"),b.Nb(2,"ion-title"),b.nc(3,"Detalle del Cliente"),b.Mb(),b.Nb(4,"ion-buttons",0),b.Jb(5,"ion-back-button"),b.Mb(),b.Mb(),b.Mb(),b.Nb(6,"ion-content",1),b.mc(7,y,1,0,"ion-progress-bar",2),b.mc(8,N,1,0,"app-skeleton",3),b.Nb(9,"ion-header",4),b.Nb(10,"ion-toolbar"),b.Nb(11,"ion-segment",5),b.Vb("ionChange",(function(e){return o.segmentChanged(e)}))("ngModelChange",(function(e){return o.type=e})),b.Nb(12,"ion-segment-button",6),b.Nb(13,"ion-label"),b.nc(14,"Pr\xe9stamos"),b.Mb(),b.Mb(),b.Nb(15,"ion-segment-button",7),b.Nb(16,"ion-label"),b.nc(17,"Datos Personales"),b.Mb(),b.Mb(),b.Mb(),b.Mb(),b.Mb(),b.Nb(18,"ion-content",8),b.Nb(19,"div",9),b.mc(20,w,3,2,"ion-list",10),b.mc(21,U,50,9,"ion-list",11),b.Mb(),b.Mb(),b.Mb()),2&e&&(b.yb(7),b.ec("ngIf",o.loadingLoansInformation),b.yb(1),b.ec("ngIf",o.loadingLoansInformation),b.yb(1),b.ec("translucent",!0),b.yb(2),b.ec("ngModel",o.type),b.yb(7),b.ec("fullscreen",!0),b.yb(1),b.ec("ngSwitch",o.type),b.yb(1),b.ec("ngSwitchCase","loansInformation"),b.yb(1),b.ec("ngSwitchCase","customerInformation"))},directives:[s.s,s.Q,s.P,s.i,s.e,s.f,s.p,t.l,s.G,s.X,i.h,i.k,s.H,s.A,t.n,t.o,s.D,h.a,s.B,t.k,s.z,s.v,s.h,s.y,s.x,s.t,i.n,i.i,i.d,s.C,s.u,s.Y,i.c,s.U,s.I,s.J],pipes:[t.d],styles:[".customer-detail-page[_ngcontent-%COMP%]   .loan-item[_ngcontent-%COMP%]{border-left:solid;margin-top:15px;margin-bottom:15px}"]}),e})()}];let K=(()=>{class e{}return e.\u0275mod=b.Gb({type:e}),e.\u0275inj=b.Fb({factory:function(o){return new(o||e)},imports:[[c.j.forChild(_)],c.j]}),e})(),G=(()=>{class e{}return e.\u0275mod=b.Gb({type:e}),e.\u0275inj=b.Fb({factory:function(o){return new(o||e)},imports:[[t.c,i.e,s.R,K,i.l,r.a]]}),e})()}}]);