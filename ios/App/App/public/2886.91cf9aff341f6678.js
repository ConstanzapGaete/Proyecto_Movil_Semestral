"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2886],{2886:(b,g,a)=>{a.r(g),a.d(g,{RecuperarPageModule:()=>M});var d=a(177),r=a(4341),t=a(4742),u=a(70),f=a(467),e=a(3953),m=a(7979);const P=[{path:"",component:(()=>{var o;class c{constructor(n,i,l,p){this.f=n,this.alertController=i,this.router=l,this.servicioAppService=p,this.formulario=this.f.group({usuario:new r.MJ("",r.k0.required),password:new r.MJ("",r.k0.required)})}ngOnInit(){}restablecer(){var n=this;return(0,f.A)(function*(){const i=n.formulario.value;n.formulario.invalid?yield(yield n.alertController.create({header:"Datos incompletos",message:"Tienes que llenar todos los datos",buttons:["Aceptar"]})).present():n.servicioAppService.verificarUsuarioExistente(i.usuario)?yield(yield n.alertController.create({header:"Usuario existente",message:"El usuario ya existe, elige otro nombre de usuario.",buttons:["Aceptar"]})).present():(n.servicioAppService.agregarUsuario(i.usuario,i.password),yield(yield n.alertController.create({header:"Usuario creado",message:"El usuario se ha creado correctamente.",buttons:[{text:"Aceptar",handler:()=>{n.router.navigate(["/login"])}}]})).present())})()}}return(o=c).\u0275fac=function(n){return new(n||o)(e.rXU(r.ok),e.rXU(t.hG),e.rXU(u.Ix),e.rXU(m.R))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-recuperar"]],decls:29,vars:1,consts:[[3,"keyup.enter","formGroup"],["label","Nombre de usuario","labelPlacement","floating","placeholder","Usuario","formControlName","usuario"],["label","Contrase\xf1a","labelPlacement","floating","placeholder","Contrase\xf1a","formControlName","password","type","password"],["expand","full",3,"click"],[1,"ion-no-border"],[1,"footer-content"],[1,"footer-links"],["href","#"],[1,"social-icons"],["name","logo-facebook"],["name","logo-twitter"],["name","logo-instagram"],[1,"copyright"]],template:function(n,i){1&n&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Nuevo usuario"),e.k0s()()(),e.j41(4,"ion-content")(5,"ion-card")(6,"ion-card-content")(7,"form",0),e.bIt("keyup.enter",function(){return i.restablecer()}),e.j41(8,"ion-item"),e.nrm(9,"ion-input",1),e.k0s(),e.j41(10,"ion-item"),e.nrm(11,"ion-input",2),e.k0s(),e.j41(12,"ion-button",3),e.bIt("click",function(){return i.restablecer()}),e.EFF(13," Crear Nuevo usuario "),e.k0s()()()()(),e.j41(14,"ion-footer",4)(15,"div",5)(16,"div",6)(17,"a",7),e.EFF(18,"Acerca de"),e.k0s(),e.j41(19,"a",7),e.EFF(20,"Contacto"),e.k0s(),e.j41(21,"a",7),e.EFF(22,"Pol\xedtica de privacidad"),e.k0s()(),e.j41(23,"div",8),e.nrm(24,"ion-icon",9)(25,"ion-icon",10)(26,"ion-icon",11),e.k0s(),e.j41(27,"div",12),e.EFF(28,"\xa9 2024 Duoc UC. Todos los derechos reservados."),e.k0s()()()),2&n&&(e.R7$(7),e.Y8G("formGroup",i.formulario))},dependencies:[r.qT,r.BC,r.cb,t.Jm,t.b_,t.I9,t.W9,t.M0,t.eU,t.iq,t.$w,t.uz,t.BC,t.ai,t.Gw,r.j4,r.JD],styles:["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: rgb(33, 33, 160);--color: #ebd300f8}.form-container[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:20px}h2[_ngcontent-%COMP%]{color:#2121a0;font-size:24px;margin-bottom:10px}p[_ngcontent-%COMP%]{color:#666;margin-bottom:20px}.form-input[_ngcontent-%COMP%]{margin-bottom:15px;--background: #f4f5f8;--border-color: #d7d8da;--border-radius: 8px;--padding-start: 16px}.form-input[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#2121a0}.error-message[_ngcontent-%COMP%]{font-size:12px;margin-top:5px;padding-left:16px}ion-button[type=submit][_ngcontent-%COMP%]{margin-top:20px;--background: rgb(33, 33, 160);--color: #ebd300f8}.form-footer[_ngcontent-%COMP%]{margin-top:20px;text-align:center}.form-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#2121a0;text-decoration:none;font-weight:700}ion-footer[_ngcontent-%COMP%]{background:linear-gradient(135deg,#2121a0,#2d2db4);padding:20px 0}ion-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:0 16px}ion-footer[_ngcontent-%COMP%]   .footer-links[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-wrap:wrap;margin-bottom:15px}ion-footer[_ngcontent-%COMP%]   .footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#ebd300f8;text-decoration:none;margin:0 10px;font-size:14px;transition:opacity .3s ease}ion-footer[_ngcontent-%COMP%]   .footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.8}ion-footer[_ngcontent-%COMP%]   .social-icons[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:15px}ion-footer[_ngcontent-%COMP%]   .social-icons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:24px;color:#ebd300f8;margin:0 10px;cursor:pointer;transition:opacity .3s ease}ion-footer[_ngcontent-%COMP%]   .social-icons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]:hover{opacity:.8}ion-footer[_ngcontent-%COMP%]   .copyright[_ngcontent-%COMP%]{color:#ebd300f8;font-size:12px;text-align:center}@media (min-width: 768px){.form-container[_ngcontent-%COMP%]{max-width:500px}}"]}),c})()}];let C=(()=>{var o;class c{}return(o=c).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[u.iI.forChild(P),u.iI]}),c})(),M=(()=>{var o;class c{}return(o=c).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[d.MD,r.YN,t.bv,C,r.X1]}),c})()}}]);