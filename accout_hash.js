const _0x2ad34a=_0x2df8;(function(_0x411fd1,_0x130dff){const _0x4af51d=_0x2df8,_0x3785bd=_0x411fd1();while(!![]){try{const _0x2d159d=-parseInt(_0x4af51d(0x20c))/0x1+-parseInt(_0x4af51d(0x220))/0x2+-parseInt(_0x4af51d(0x21b))/0x3+parseInt(_0x4af51d(0x230))/0x4*(parseInt(_0x4af51d(0x228))/0x5)+-parseInt(_0x4af51d(0x1f7))/0x6*(parseInt(_0x4af51d(0x217))/0x7)+-parseInt(_0x4af51d(0x229))/0x8+-parseInt(_0x4af51d(0x207))/0x9*(-parseInt(_0x4af51d(0x231))/0xa);if(_0x2d159d===_0x130dff)break;else _0x3785bd['push'](_0x3785bd['shift']());}catch(_0x43385f){_0x3785bd['push'](_0x3785bd['shift']());}}}(_0x4621,0x7f922));import{initializeApp}from'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';import{getDatabase,set,ref,update}from'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';import{getAnalytics}from'https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js';import{getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword}from'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';const firebaseConfig={'apiKey':_0x2ad34a(0x214),'authDomain':_0x2ad34a(0x213),'databaseURL':_0x2ad34a(0x1f9),'projectId':'travel-booking-f3ed4','storageBucket':_0x2ad34a(0x1fa),'messagingSenderId':_0x2ad34a(0x21d),'appId':_0x2ad34a(0x1f8),'measurementId':_0x2ad34a(0x215)},app=initializeApp(firebaseConfig),analytics=getAnalytics(app),database=getDatabase(app),auth=getAuth();var islogin=sessionStorage[_0x2ad34a(0x219)]('login');if(islogin==0x1){const accout=document[_0x2ad34a(0x1fc)](_0x2ad34a(0x206)),user=document[_0x2ad34a(0x1fc)](_0x2ad34a(0x20d));accout[_0x2ad34a(0x210)][_0x2ad34a(0x22a)](_0x2ad34a(0x209)),user[_0x2ad34a(0x210)][_0x2ad34a(0x211)](_0x2ad34a(0x209));}else{const accout=document[_0x2ad34a(0x1fc)]('.header__topbar__account');accout[_0x2ad34a(0x210)][_0x2ad34a(0x211)]('hide');const user=document['querySelector']('.header__topbar__user');user[_0x2ad34a(0x210)][_0x2ad34a(0x22a)](_0x2ad34a(0x209));}const handleLogout=document['querySelector'](_0x2ad34a(0x20b)),logout=handleLogout['querySelector'](_0x2ad34a(0x226));logout[_0x2ad34a(0x232)](_0x2ad34a(0x201),()=>{const _0x465d1c=_0x2ad34a;sessionStorage[_0x465d1c(0x1fb)](),location[_0x465d1c(0x22d)]();});function getUser(_0x4b72da){const _0x3d0f39=_0x2ad34a;fetch(apiUser)[_0x3d0f39(0x20e)](function(_0x8fc97c){const _0x4b50a1=_0x3d0f39;return _0x8fc97c[_0x4b50a1(0x234)]();})[_0x3d0f39(0x20e)](_0x4b72da)[_0x3d0f39(0x1f4)](function(){});}const signUpform=document['querySelector']('.registerform'),formGroup=signUpform[_0x2ad34a(0x1fc)]('.auth-form'),signUp=signUpform['querySelector'](_0x2ad34a(0x22c)),apiUser=_0x2ad34a(0x208);var nameRegex=/^[a-zA-Z0-9\-]+$/,emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;signUp[_0x2ad34a(0x232)](_0x2ad34a(0x201),()=>{const _0x46f41e=_0x2ad34a,_0xec5111=signUpform[_0x46f41e(0x1fc)](_0x46f41e(0x1fd))['value'],_0x2d3fc5=signUpform[_0x46f41e(0x1fc)](_0x46f41e(0x20a))[_0x46f41e(0x222)],_0x14b488=signUpform[_0x46f41e(0x1fc)](_0x46f41e(0x221))['value'];if(nameRegex[_0x46f41e(0x1f5)](_0xec5111)==![]){formGroup[_0x46f41e(0x1fc)](_0x46f41e(0x233))['innerText']=_0x46f41e(0x225);return;}else formGroup['querySelector'](_0x46f41e(0x233))[_0x46f41e(0x1fe)]='';if(emailRegex['test'](_0x2d3fc5)==![]){formGroup[_0x46f41e(0x1fc)]('.messageEmail')['innerText']='Email\x20không\x20hợp\x20lệ';return;}else formGroup[_0x46f41e(0x1fc)](_0x46f41e(0x204))[_0x46f41e(0x1fe)]='';if(nameRegex[_0x46f41e(0x1f5)](_0x14b488)==![]){formGroup['querySelector'](_0x46f41e(0x200))[_0x46f41e(0x1fe)]='Password\x20không\x20hợp\x20lệ';return;}else formGroup[_0x46f41e(0x1fc)](_0x46f41e(0x200))['innerText']='';var _0x1c9dd7={'username':_0xec5111,'email':_0x2d3fc5,'password':_0x14b488,'block':0x0};getUser(function(_0x76a711){_0x76a711['map'](_0x26ddc4=>{const _0x245740=_0x2df8;if(_0x26ddc4['email']==_0x2d3fc5)formGroup['querySelector']('.messageEmail')[_0x245740(0x1fe)]=_0x245740(0x1ff);});}),createUserWithEmailAndPassword(auth,_0x2d3fc5,_0x14b488)[_0x46f41e(0x20e)](_0x3433e3=>{const _0x20453a=_0x46f41e,_0x57a907=_0x3433e3['user'];set(ref(database,_0x20453a(0x22f)+_0x57a907['uid']),{'username':_0xec5111,'email':_0x2d3fc5}),fetch(apiUser,{'method':'POST','headers':{'content-type':_0x20453a(0x22e)},'body':JSON[_0x20453a(0x202)](_0x1c9dd7)})[_0x20453a(0x20e)](function(_0xd19fbe){const _0x41a4cb=_0x20453a;_0xd19fbe[_0x41a4cb(0x234)]();})[_0x20453a(0x20e)](),signUpform[_0x20453a(0x1fc)](_0x20453a(0x1fd))[_0x20453a(0x222)]='',signUpform[_0x20453a(0x1fc)](_0x20453a(0x20a))[_0x20453a(0x222)]='',signUpform[_0x20453a(0x1fc)]('.password')[_0x20453a(0x222)]='',alert(_0x20453a(0x22b)),location[_0x20453a(0x22d)]();})[_0x46f41e(0x1f4)](_0x2d0e77=>{const _0x3c200d=_0x46f41e,_0x3656a0=_0x2d0e77[_0x3c200d(0x21c)],_0x123d5f=_0x2d0e77[_0x3c200d(0x1f6)];});});function _0x4621(){const _0x54a367=['user','catch','test','message','1685868HOspqD','1:157649672876:web:a5287e61e2f2a124f95d09','https://travel-booking-f3ed4-default-rtdb.firebaseio.com','travel-booking-f3ed4.appspot.com','clear','querySelector','.username','innerText','Email\x20đã\x20tồn\x20tại','.messagePasswork','click','stringify','.loginform','.messageEmail','block','.header__topbar__account','21654207acFgpN','https://travel-api-hiennguyen.herokuapp.com/api/customer','hide','.email','.header__topbar__user__list','790870RzWsmI','.header__topbar__user','then','setItem','classList','remove','uid','travel-booking-f3ed4.firebaseapp.com','AIzaSyCzr_whzBIUOJESw6QXi-pteqSZt6X7YdU','G-LEB7S5JC19','email','7CSYtEr','filter','getItem','login','1518759ZDePhL','code','157649672876','.btn_signin','.messagePassword','1719798mESvGQ','.password','value','Email\x20không\x20tồn\x20tại','password','User\x20name\x20không\x20hợp\x20lệ','.logout','Vui\x20lòng\x20kiểm\x20tra\x20lại\x20mật\x20khẩu','2537005RRufWE','3682360lYWncJ','add','Created','.btn_signup','reload','application/json','user/','8tgMgcr','10pBEUGv','addEventListener','.messageUsername','json'];_0x4621=function(){return _0x54a367;};return _0x4621();}const signInform=document[_0x2ad34a(0x1fc)](_0x2ad34a(0x203)),signIn=signInform[_0x2ad34a(0x1fc)](_0x2ad34a(0x21e)),formLogin=signInform['querySelector']('.auth-form');function _0x2df8(_0x12982f,_0x4d8aa1){const _0x4621a8=_0x4621();return _0x2df8=function(_0x2df8cd,_0x420e2b){_0x2df8cd=_0x2df8cd-0x1f4;let _0xac99=_0x4621a8[_0x2df8cd];return _0xac99;},_0x2df8(_0x12982f,_0x4d8aa1);}signIn[_0x2ad34a(0x232)]('click',()=>{const _0x41156e=_0x2ad34a,_0x185453=signInform[_0x41156e(0x1fc)](_0x41156e(0x20a))[_0x41156e(0x222)],_0x141325=signInform[_0x41156e(0x1fc)](_0x41156e(0x221))[_0x41156e(0x222)];getUser(function(_0x4e0826){const _0x2ccbdf=_0x41156e;if(!_0x4e0826[0x0])formLogin['querySelector'](_0x2ccbdf(0x204))[_0x2ccbdf(0x1fe)]=_0x2ccbdf(0x223);else{const _0x23a770=_0x4e0826[_0x2ccbdf(0x218)](_0x52da52=>{const _0x259118=_0x2ccbdf;return _0x52da52[_0x259118(0x216)]==_0x185453;});!_0x23a770[0x0]?formLogin['querySelector'](_0x2ccbdf(0x204))['innerText']='Email\x20không\x20tồn\x20tại':formLogin[_0x2ccbdf(0x1fc)](_0x2ccbdf(0x204))[_0x2ccbdf(0x1fe)]='';if(_0x23a770[0x0][_0x2ccbdf(0x224)]==_0x141325)formLogin['querySelector'](_0x2ccbdf(0x21f))[_0x2ccbdf(0x1fe)]='';else formLogin[_0x2ccbdf(0x1fc)](_0x2ccbdf(0x21f))['innerText']=_0x2ccbdf(0x227);_0x23a770[0x0]['email']==_0x185453&&_0x23a770[0x0]['password']==_0x141325&&(_0x23a770[0x0][_0x2ccbdf(0x205)]==0x1&&(location['reload'](),alert('Tài\x20khoản\x20của\x20bạn\x20đã\x20bị\x20khóa\x20vui\x20lòng\x20liên\x20hệ\x20quản\x20trị\x20viên')));}}),signInWithEmailAndPassword(auth,_0x185453,_0x141325)['then'](_0x315831=>{const _0x138dbf=_0x41156e,_0x38ef7a=_0x315831[_0x138dbf(0x235)];let _0x2c10be=new Date();update(ref(database,'user/'+_0x38ef7a[_0x138dbf(0x212)]),{'last_login':_0x2c10be}),signInform['querySelector']('.email')[_0x138dbf(0x222)]='',signInform[_0x138dbf(0x1fc)](_0x138dbf(0x221))[_0x138dbf(0x222)]='',sessionStorage[_0x138dbf(0x20f)](_0x138dbf(0x21a),0x1),sessionStorage[_0x138dbf(0x20f)](_0x138dbf(0x216),_0x185453),location[_0x138dbf(0x22d)]();})[_0x41156e(0x1f4)](_0xca27e5=>{const _0x242baf=_0x41156e,_0x203a7a=_0xca27e5['code'],_0x2fd846=_0xca27e5[_0x242baf(0x1f6)];});});