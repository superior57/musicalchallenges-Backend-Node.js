webpackJsonp(["main"], {

    /***/
    "./config.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return CONFIG; });
        var CONFIG = {
            // API_ENDPOINT: 'http://localhost:4001/admin/',
            API_ENDPOINT: 'http://192.168.207.136:4001/admin/',
        };


        /***/
    }),

    /***/
    "./src/$$_lazy_route_resource lazy recursive":
    /***/
        (function(module, exports) {

        function webpackEmptyAsyncContext(req) {
            // Here Promise.resolve().then() is used instead of new Promise() to prevent
            // uncatched exception popping up in devtools
            return Promise.resolve().then(function() {
                throw new Error("Cannot find module '" + req + "'.");
            });
        }
        webpackEmptyAsyncContext.keys = function() { return []; };
        webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
        module.exports = webpackEmptyAsyncContext;
        webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

        /***/
    }),

    /***/
    "./src/app/about/about.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/about/about.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\" style=\"background-color:#fff;margin-left:0\">\n    <div class=\"container\">\n        <div class=\"content\">\n            <div class=\"row\">\n                <div class=\"span16 \">\n                    <div class=\"page-header\">\n                        <h2 style=\"text-decoration-color: red;\">{{pagetitle}}</h2>\n                    </div>\n                    <div class=\"panel-body\" style=\"word-break:break-word\" [innerHTML]=\"pagecontent\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

        /***/
    }),

    /***/
    "./src/app/about/about.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };






        var AboutComponent = /** @class */ (function() {
            function AboutComponent(http, _appservice, _message, _router, broadcaster) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this._router = _router;
                this.broadcaster = broadcaster;
                this.pagetitle = '';
                this.pagecontent = '';
            }
            AboutComponent.prototype.ngOnInit = function() {
                var _this = this;
                var obj = { page: "about" };
                this._appservice.getCmsPage(obj).subscribe(function(Response) {
                    console.log(Response);
                    _this.pagetitle = 'About Us';
                    _this.pagecontent = Response.response_data.content;
                }, function(Error) {});
            };
            AboutComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'about',
                    styles: [__webpack_require__("./src/app/about/about.component.css")],
                    template: __webpack_require__("./src/app/about/about.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ],
                    __WEBPACK_IMPORTED_MODULE_5__broadcaster__["a" /* Broadcaster */ ]
                ])
            ], AboutComponent);
            return AboutComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/adduser/adduser.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/adduser/adduser.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\">\n    <!-- Content Header (Page header) -->\n    <section class=\"content-header\">\n        <h1>\n            Data Tables\n            <small>advanced tables</small>\n        </h1>\n        <ol class=\"breadcrumb\">\n            <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n            <li><a href=\"#\">Tables</a></li>\n            <li class=\"active\">Data tables</li>\n        </ol>\n    </section>\n\n    <!-- Main content -->\n    <!-- Main content -->\n    <section class=\"content\">\n        <div class=\"row\">\n            <!-- left column -->\n            <div class=\"col-md-6\">\n                <!-- general form elements -->\n                <div class=\"box box-primary\">\n                    <div class=\"box-header with-border\">\n                        <h3 class=\"box-title\">Quick Example</h3>\n                    </div>\n                    <!-- /.box-header -->\n                    <!-- form start -->\n                    <form role=\"form\" (ngSubmit)=\"submitForm()\" [formGroup]=\"adduserForm\" novalidate>\n                        <div class=\"box-body\">\n                            <div class=\"form-group\">\n                                <label for=\"exampleInputEmail1\">Name</label>\n                                <input type=\"text\" class=\"form-control\" formControlName=\"name\" placeholder=\"Enter name\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"exampleInputEmail1\">Email address</label>\n                                <input type=\"email\" class=\"form-control\" formControlName=\"email\" placeholder=\"Enter email\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"exampleInputPassword1\">Password</label>\n                                <input type=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"Password\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"exampleInputFile\">Picture</label>\n                                <input type=\"file\" formControlName=\"file\">\n\n                                <p class=\"help-block\">Example block-level help text here.</p>\n                            </div>\n                            <div class=\"checkbox\">\n                                <label>\n                    <input type=\"checkbox\"> Check me out\n                  </label>\n                            </div>\n                        </div>\n                        <!-- /.box-body -->\n\n                        <div class=\"box-footer\">\n                            <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n                        </div>\n                    </form>\n                </div>\n                <!-- /.box -->\n            </div>\n            <!-- /.col -->\n        </div>\n        <!-- /.row -->\n    </section>\n    <!-- /.content -->\n</div>\n<!-- /.content-wrapper -->"

        /***/
    }),

    /***/
    "./src/app/adduser/adduser.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return AdduserComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__forms_CustomValidators__ = __webpack_require__("./src/app/forms/CustomValidators.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };





        var AdduserComponent = /** @class */ (function() {
            function AdduserComponent(formBuilder, router, userService) {
                this.formBuilder = formBuilder;
                this.router = router;
                this.userService = userService;
                this.userdet = null;
                this.data = null;
                this.userdet = JSON.parse(localStorage.getItem("loggedinuser"));
                console.log(this.userdet);
                if (this.userdet !== null) {
                    this.router.navigate(['/adduser']);
                    // console.log(this.userService.makeRequest());
                    // this.userService.makeRequest().subscribe(data => {
                    //   this.data = data.data;
                    //   console.log(data);
                    // });
                    //this.email = this.userdet.email;       
                    //console.log(this.email);          
                } else
                    this.router.navigate(['/login']);
                //  this.navCtrl.push(Page1);
            }
            AdduserComponent.prototype.ngOnInit = function() {
                this.adduserForm = this.formBuilder.group({
                    name: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].required]],
                    email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].required, __WEBPACK_IMPORTED_MODULE_2__forms_CustomValidators__["a" /* default */ ].validateEmail]],
                    password: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].minLength(6)]],
                    file: ['', []]
                });
            };
            AdduserComponent.prototype.submitForm = function() {
                var _this = this;
                console.log(this.adduserForm);
                if (this.adduserForm.valid == true) {
                    this.userService.addUser(this.adduserForm.value).subscribe(function(data) {
                        _this.data = data;
                        console.log(data);
                    });
                    //this.router.navigate(['/']);
                    //location.reload();
                }
            };
            AdduserComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'adduser',
                    styles: [__webpack_require__("./src/app/adduser/adduser.component.css")],
                    template: __webpack_require__("./src/app/adduser/adduser.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */ ], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */ ], __WEBPACK_IMPORTED_MODULE_4__userservice_user_service__["a" /* UserService */ ]])
            ], AdduserComponent);
            return AdduserComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/app.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"wrapper\">\n    <header class=\"main-header\" *ngIf=\"userdet\">\n        <!-- Logo -->\n        <a [routerLink]=\"['/home']\" class=\"logo\">\n            <!-- mini logo for sidebar mini 50x50 pixels -->\n            <span class=\"logo-mini\">Musical Challenge</span>\n            <!-- logo for regular state and mobile devices -->\n            <span class=\"logo-lg\"><b>Musical</b> Admin</span>\n        </a>\n        <!-- Header Navbar: style can be found in header.less -->\n        <nav class=\"navbar navbar-static-top\">\n            <!-- Sidebar toggle button-->\n            <a href=\"javascript:;\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </a>\n            <div class=\"navbar-custom-menu\">\n                <ul class=\"nav navbar-nav\">\n                    <li class=\"dropdown user user-menu\">\n                        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                            <img src=\"../../assets/images/small.png\" class=\"user-image\" alt=\"User Image\">\n                            <span class=\"hidden-xs\">Welcome Admin</span>\n                        </a>\n                        <ul class=\"dropdown-menu\">\n                            <li class=\"user-footer\">\n                                <div class=\"pull-left\">\n                                    <a [routerLink]=\"['/Changepassword']\" class=\"btn btn-default btn-flat\">Change Password</a>\n                                </div>\n                                <div class=\"pull-right\">\n                                    <a (click)=\"logoutUser()\" class=\"btn btn-default btn-flat\">Sign out</a>\n                                </div>\n                            </li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n    </header>\n    <!-- Left side column. contains the logo and sidebar -->\n    <aside class=\"main-sidebar\" *ngIf=\"userdet\">\n        <!-- sidebar: style can be found in sidebar.less -->\n        <section class=\"sidebar\">\n            <!-- Sidebar user panel -->\n            <div class=\"user-panel\">\n                <div class=\"pull-left image\">\n                    <img src=\"../../assets/images/small.png\" class=\"img-circle\" alt=\"User Image\">\n                </div>\n                <div class=\"pull-left info\">\n                    <p>Admin</p>\n                    <i class=\"fa fa-circle text-success\"></i> online\n                </div>\n            </div>\n\n            <!-- sidebar menu: : style can be found in sidebar.less -->\n            <ul class=\"sidebar-menu\">\n                <li class=\"header\">MAIN NAVIGATION</li>\n                <li class=\"treeview\">\n                    <a [routerLink]=\"['/home']\">\n                        <i class=\"fa fa-dashboard\"></i> <span>User Management</span>\n                        <span class=\"pull-right-container\">\n             </span>\n                    </a>\n                </li>\n                <li class=\"treeview\">\n                    <a [routerLink]=\"['/category']\">\n                        <i class=\"fa fa-th\"></i> <span>Category Management</span>\n                    </a>\n                </li>\n                <li class=\"treeview\">\n                    <a [routerLink]=\"['/music']\">\n                        <i class=\"fa fa-th\"></i> <span>Music Management</span>\n                    </a>\n                </li>\n                <li class=\"treeview\">\n                    <a [routerLink]=\"['/cms']\">\n                        <i class=\"fa fa-th\"></i> <span>CMS Management</span>\n                    </a>\n                </li>\n                <li class=\"treeview\">\n                    <a [routerLink]=\"['/json-creator']\">\n                        <i class=\"fa fa-plus-circle\"></i> <span>Lyrics Json Creator</span>\n                    </a>\n                </li>\n                <li class=\"treeview\">\n                    <a href=\"javascript:;\" (click)=\"logoutUser()\">\n                        <i class=\"fa fa-sign-out\"></i>\n                        <span>Logout</span>\n                    </a>\n                </li>\n\n            </ul>\n            <!-- <button (notify)=\"onNotify($event)\"></button> -->\n        </section>\n        <!-- /.sidebar -->\n    </aside>\n    <main>\n        <router-outlet></router-outlet>\n    </main>\n    <footer class=\"main-footer\" *ngIf=\"userdet\">\n        <div class=\"pull-right hidden-xs\">\n            <b>Version</b> 0.0.1\n        </div>\n        <strong>Powered by &copy; 2017-2018 <a href=\"http://www.brainiuminfotech.com/\">Brainium Information Technologies Pvt. Ltd.</a></strong> All rights reserved.\n    </footer>\n\n</div>"

        /***/
    }),

    /***/
    "./src/app/app.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_src_toast_manager__ = __webpack_require__("./node_modules/ng2-toastr/src/toast-manager.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_src_toast_manager__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };


        //import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';




        var AppComponent = /** @class */ (function() {
            function AppComponent(router, broadcaster, toastr, vRef, location) {
                this.router = router;
                this.broadcaster = broadcaster;
                this.toastr = toastr;
                this.location = location;
                this.childTitle = 'This text is passed to child';
                this.userdet = null;
                this.currentpath = null;
                this.isloggedin = null;
                this.toastr.setRootViewContainerRef(vRef);
            }
            AppComponent.prototype.ngOnInit = function() {
                var tokenchk = localStorage.getItem("admintoken");
                if (tokenchk == null) {
                    this.userdet = false;
                    // this.router.navigate(['/']);
                } else {
                    this.userdet = true;
                    this.router.navigate(['/home']);
                }
            };
            AppComponent.prototype.logoutUser = function() {
                this.userdet = false;
                localStorage.removeItem("admintoken");
                localStorage.clear();
                this.router.navigate(['/login']);
            };
            AppComponent.prototype.onNotify = function($event) {
                this.userdet = true;
                console.log('event');
                console.log('event');
            };
            __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
                __metadata("design:type", Object)
            ], AppComponent.prototype, "userdet", void 0);
            AppComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'app-root',
                    template: __webpack_require__("./src/app/app.component.html"),
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ], __WEBPACK_IMPORTED_MODULE_4__broadcaster__["a" /* Broadcaster */ ],
                    __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_src_toast_manager__["ToastsManager"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"],
                    __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"]
                ])
            ], AppComponent);
            return AppComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/app.module.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__app_routes__ = __webpack_require__("./src/app/app.routes.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__filter_pipe__ = __webpack_require__("./src/app/filter.pipe.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_12__subcategories_subcategories_component__ = __webpack_require__("./src/app/subcategories/subcategories.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_13__about_about_component__ = __webpack_require__("./src/app/about/about.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14__privacy_privacy_component__ = __webpack_require__("./src/app/privacy/privacy.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_15__terms_terms_component__ = __webpack_require__("./src/app/terms/terms.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_16__help_help_component__ = __webpack_require__("./src/app/help/help.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_17__guide_guide_component__ = __webpack_require__("./src/app/guide/guide.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_18__faq_faq_component__ = __webpack_require__("./src/app/faq/faq.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_19__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_20__adduser_adduser_component__ = __webpack_require__("./src/app/adduser/adduser.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_21__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_22__contact_contact_component__ = __webpack_require__("./src/app/contact/contact.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_23__cms_cms_component__ = __webpack_require__("./src/app/cms/cms.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_24__json_creator_json_creator_component__ = __webpack_require__("./src/app/json-creator/json-creator.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_25__changepassword_changepassword_component__ = __webpack_require__("./src/app/changepassword/changepassword.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_26__forgotpassword_forgotpassword_component__ = __webpack_require__("./src/app/forgotpassword/forgotpassword.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_27__categories_categories_component__ = __webpack_require__("./src/app/categories/categories.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_28__karaoke_karaoke_component__ = __webpack_require__("./src/app/karaoke/karaoke.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_29__guards_index__ = __webpack_require__("./src/app/guards/index.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_30_ng2_toastr_ng2_toastr__ = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_30_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_ng2_toastr_ng2_toastr__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_31_ng2_truncate__ = __webpack_require__("./node_modules/ng2-truncate/dist/index.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_32_ng2_ckeditor__ = __webpack_require__("./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };

































        // import { LoaderComponent } from './loader/loader.component';
        // import { LoaderService } from './loader/loader.service';
        var AppModule = /** @class */ (function() {
            function AppModule() {}
            AppModule = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */ ], __WEBPACK_IMPORTED_MODULE_10__filter_pipe__["a" /* SearchPipe */ ],
                        __WEBPACK_IMPORTED_MODULE_13__about_about_component__["a" /* AboutComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_19__home_home_component__["a" /* HomeComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_21__login_login_component__["a" /* LoginComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_22__contact_contact_component__["a" /* ContactComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_20__adduser_adduser_component__["a" /* AdduserComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_25__changepassword_changepassword_component__["a" /* ChangepasswordComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_26__forgotpassword_forgotpassword_component__["a" /* ForgotpasswordComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_27__categories_categories_component__["a" /* CategoryComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_12__subcategories_subcategories_component__["a" /* SubCategoryComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_28__karaoke_karaoke_component__["a" /* karaokeComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_23__cms_cms_component__["a" /* CmsComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_24__json_creator_json_creator_component__["a" /* JsonCreatorComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_14__privacy_privacy_component__["a" /* PrivacyComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_15__terms_terms_component__["a" /* TermsnConditionsComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_16__help_help_component__["a" /* HelpComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_18__faq_faq_component__["a" /* FaqComponent */ ],
                        __WEBPACK_IMPORTED_MODULE_17__guide_guide_component__["a" /* GuideComponent */ ]
                    ],
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["BrowserModule"], __WEBPACK_IMPORTED_MODULE_30_ng2_toastr_ng2_toastr__["ToastModule"].forRoot(),
                        __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormsModule */ ],
                        __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* ReactiveFormsModule */ ], __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */ ],
                        __WEBPACK_IMPORTED_MODULE_8__angular_http__["c" /* HttpModule */ ],
                        __WEBPACK_IMPORTED_MODULE_32_ng2_ckeditor__["a" /* CKEditorModule */ ],
                        __WEBPACK_IMPORTED_MODULE_31_ng2_truncate__["a" /* TruncateModule */ ],
                        __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */ ].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_routes__["a" /* rootRouterConfig */ ], { useHash: true })
                    ],
                    providers: [
                        __WEBPACK_IMPORTED_MODULE_9__broadcaster__["a" /* Broadcaster */ ],
                        __WEBPACK_IMPORTED_MODULE_4__userservice_user_service__["a" /* UserService */ ], __WEBPACK_IMPORTED_MODULE_5__userservice_message_services__["a" /* MessageService */ ],
                        __WEBPACK_IMPORTED_MODULE_29__guards_index__["a" /* AuthGuard */ ],
                    ],
                    bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */ ]]
                })
            ], AppModule);
            return AppModule;
        }());



        /***/
    }),

    /***/
    "./src/app/app.routes.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return rootRouterConfig; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__about_about_component__ = __webpack_require__("./src/app/about/about.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__adduser_adduser_component__ = __webpack_require__("./src/app/adduser/adduser.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__changepassword_changepassword_component__ = __webpack_require__("./src/app/changepassword/changepassword.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__forgotpassword_forgotpassword_component__ = __webpack_require__("./src/app/forgotpassword/forgotpassword.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__categories_categories_component__ = __webpack_require__("./src/app/categories/categories.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__subcategories_subcategories_component__ = __webpack_require__("./src/app/subcategories/subcategories.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__karaoke_karaoke_component__ = __webpack_require__("./src/app/karaoke/karaoke.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__guards_index__ = __webpack_require__("./src/app/guards/index.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__cms_cms_component__ = __webpack_require__("./src/app/cms/cms.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__json_creator_json_creator_component__ = __webpack_require__("./src/app/json-creator/json-creator.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_12__contact_contact_component__ = __webpack_require__("./src/app/contact/contact.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_13__privacy_privacy_component__ = __webpack_require__("./src/app/privacy/privacy.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14__terms_terms_component__ = __webpack_require__("./src/app/terms/terms.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_15__help_help_component__ = __webpack_require__("./src/app/help/help.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_16__faq_faq_component__ = __webpack_require__("./src/app/faq/faq.component.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_17__guide_guide_component__ = __webpack_require__("./src/app/guide/guide.component.ts");


















        var rootRouterConfig = [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'home', component: __WEBPACK_IMPORTED_MODULE_1__home_home_component__["a" /* HomeComponent */ ], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */ ]] },
            { path: 'contact', component: __WEBPACK_IMPORTED_MODULE_12__contact_contact_component__["a" /* ContactComponent */ ] },
            { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__login_login_component__["a" /* LoginComponent */ ] },
            { path: 'adduser', component: __WEBPACK_IMPORTED_MODULE_3__adduser_adduser_component__["a" /* AdduserComponent */ ] },
            { path: 'Changepassword', component: __WEBPACK_IMPORTED_MODULE_4__changepassword_changepassword_component__["a" /* ChangepasswordComponent */ ] },
            { path: 'forgotpassword/:id', component: __WEBPACK_IMPORTED_MODULE_5__forgotpassword_forgotpassword_component__["a" /* ForgotpasswordComponent */ ] },
            { path: 'category', component: __WEBPACK_IMPORTED_MODULE_6__categories_categories_component__["a" /* CategoryComponent */ ], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */ ]] },
            { path: 'subcategory', component: __WEBPACK_IMPORTED_MODULE_7__subcategories_subcategories_component__["a" /* SubCategoryComponent */ ], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */ ]] },
            { path: 'music', component: __WEBPACK_IMPORTED_MODULE_8__karaoke_karaoke_component__["a" /* karaokeComponent */ ], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */ ]] },
            { path: 'cms', component: __WEBPACK_IMPORTED_MODULE_10__cms_cms_component__["a" /* CmsComponent */ ], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */ ]] },
            { path: 'json-creator', component: __WEBPACK_IMPORTED_MODULE_11__json_creator_json_creator_component__["a" /* JsonCreatorComponent */ ], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */ ]] },
            { path: 'about', component: __WEBPACK_IMPORTED_MODULE_0__about_about_component__["a" /* AboutComponent */ ] },
            { path: 'privacy', component: __WEBPACK_IMPORTED_MODULE_13__privacy_privacy_component__["a" /* PrivacyComponent */ ] },
            { path: 'terms', component: __WEBPACK_IMPORTED_MODULE_14__terms_terms_component__["a" /* TermsnConditionsComponent */ ] },
            { path: 'help', component: __WEBPACK_IMPORTED_MODULE_15__help_help_component__["a" /* HelpComponent */ ] },
            { path: 'faq', component: __WEBPACK_IMPORTED_MODULE_16__faq_faq_component__["a" /* FaqComponent */ ] },
            { path: 'guide', component: __WEBPACK_IMPORTED_MODULE_17__guide_guide_component__["a" /* GuideComponent */ ] },
        ];


        /***/
    }),

    /***/
    "./src/app/broadcaster.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return Broadcaster; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");



        var Broadcaster = /** @class */ (function() {
            function Broadcaster() {
                this._eventBus = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
            }
            Broadcaster.prototype.broadcast = function(key, data) {
                this._eventBus.next({ key: key, data: data });
            };
            Broadcaster.prototype.on = function(key) {
                return this._eventBus.asObservable()
                    .filter(function(event) { return event.key === key; })
                    .map(function(event) { return event.data; });
            };
            return Broadcaster;
        }());



        /***/
    }),

    /***/
    "./src/app/categories/categories.component.css":
    /***/
        (function(module, exports) {

        module.exports = " .adduser {\r\n     float: right;\r\n }"

        /***/
    }),

    /***/
    "./src/app/categories/categories.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\">\r\n    </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">Category Management</h5>\r\n                        <button title=\"Add new user\" id=\"modal-219933\" pull-right class=\"btn btn-xs btn-danger adduser\" (click)=\"add()\" href=\"#modal-container-219933\" data-toggle=\"modal\">\r\n                            <i class=\"fa fa-user\"></i>\r\n                            Add Category</button>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-1\"><label>Search:</label></div>\r\n                            <div class=\"col-sm-2\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"search\" class=\"form-control\" title=\"Enter Category name\" placeholder=\"Keyword\" [(ngModel)]=\"keyword\" />\r\n                                </div>\r\n                            </div>\r\n                            <!--     <div class=\"col-sm-2\">\r\n                                <input type=\"search\" class=\"form-control\" title=\"Enter user email\" placeholder=\"User Email\" [(ngModel)]=\"search.email\" />\r\n                            </div>\r\n                            <div class=\"col-sm-1\">\r\n                                <select id=\"\" [(ngModel)]=\"search.dob\" class=\"form-control\">\r\n                                                <option [disabled]=\"true\" value=\"\">year</option>\r\n                                                <option  *ngFor=\"let list of dobyear\" value=\"{{list}}\">  {{list}}</option>        \r\n                                            </select>\r\n                            </div>\r\n                            <div class=\"col-sm-1\">\r\n                                <select id=\"\" [(ngModel)]=\"search.gender\" class=\"form-control\">\r\n                                                <option [disabled]=\"true\" value=\"\">Gender</option>\r\n                                                <option value=\"Male\">Male</option>\r\n                                                <option value=\"Female\">Female</option>\r\n                                            </select>\r\n                            </div> -->\r\n\r\n                            <!--  <div class=\"col-sm-2\">\r\n                                <button title=\"Search\" class=\"btn btn-info\" (click)=\"ngOnInit()\"><i class=\"fa fa-search\"></i> Search</button>\r\n                                <button title=\"Clear Search\" class=\"btn btn-dark\" (click)=\"clear()\">   <i class=\"fa fa-remove\"></i>  clear</button>\r\n                            </div> -->\r\n                        </div>\r\n\r\n                        <div class=\"table-responsive\">\r\n                            <table class=\"table table-bordered  table-condensed table-hover\">\r\n                                <thead>\r\n                                    <tr>\r\n\r\n                                        <th>\r\n                                            Name\r\n                                        </th>\r\n                                        <th>\r\n                                            <small> Created</small>\r\n                                        </th>\r\n                                        <th>\r\n                                            Action\r\n                                        </th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of data | search:'cat_name,type':keyword\">\r\n\r\n                                        <td>{{item.cat_name}}\r\n                                            <!--  <span *ngIf=\"item.isBlocked==false\" title=\"Active Users\" class=\"text-success fa fa-check-circle\"> </span>\r\n                                            <span *ngIf=\"item.isBlocked==true\" title=\"Blocked Users\" class=\"text-danger fa fa-ban\"> </span> --></td>\r\n\r\n                                        <td><small>{{item.createdAt|date}}</small></td>\r\n                                        <td>\r\n                                            <button title=\"Edit user\" id=\"modal-219933\" class=\"btn btn-xs btn-success\" (click)=\"getCat(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Edit</button>\r\n                                            <button title=\"Delete user\" class=\"btn btn-xs btn-danger\" (click)=\"delete(item)\">Delete</button>\r\n                                            <!-- <button title=\"Delete user\" id=\"modal-219934\" class=\"btn btn-xs btn-danger\" (click)=\"deleteCat(item)\" href=\"#modal-container-219934\" data-toggle=\"modal\"><i class=\"fa fa-trash-o\"></i></button> -->\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                                <tfoot>\r\n                                    <tr>\r\n                                    </tr>\r\n                                </tfoot>\r\n                            </table>\r\n                            <!-- <button class=\"btn btn-xs btn-info\" (click)=\"loadmore()\"> <i class=\"fa fa-repeat\"></i>  load more</button> -->\r\n                        </div>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->\r\n<div class=\"modal fade\" id=\"modal-container-219933\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                            ×\r\n                        </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-12\">\r\n\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Category Name</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"cat.cat_name\" />\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n                            Close\r\n                        </button>\r\n                <button type=\"button\" (click)=\"updateData()\" class=\"btn btn-primary\">\r\n                            Save changes\r\n                        </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

        /***/
    }),

    /***/
    "./src/app/categories/categories.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };





        var CategoryComponent = /** @class */ (function() {
            function CategoryComponent(http, _appservice, _message, location) {
                //this.search.email = ''        
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this.location = location;
                this.cat = {};
            }
            CategoryComponent.prototype.ngOnInit = function() {
                var _this = this;
                // console.log(this.search)
                this.cat = {};
                var catarr = [],
                    query;
                this.size = 10;
                this.number = 1;
                this.admintoken = localStorage.getItem('admintoken');
                var obj = {};
                this._appservice.getAllCategories(obj).subscribe(function(Response) {
                    console.log(Response);
                    if (Response.success) {
                        var result = Response.response_data;
                        for (var index = 0; index < result.length; index++) {
                            var catarrval = {};
                            catarrval['cat_name'] = result[index].cat_name;
                            catarrval['isDeleted'] = result[index].isDeleted;
                            catarrval['createdAt'] = result[index].createdAt;
                            catarrval['cat_id'] = result[index]._id;
                            catarr.push(catarrval);
                        }
                        _this.data = catarr;
                        console.log(catarr);
                    } else {
                        _this._message.showWarning(Response.message);
                        localStorage.removeItem("admintoken");
                        localStorage.clear();
                        location.reload();
                    }
                }, function(Error) {});
            };
            CategoryComponent.prototype.getCat = function(str) {
                console.log(str);
                this.edit = true;
                this.pagetitle = 'Edit Category';
                this.cat = str;
            };
            CategoryComponent.prototype.updateData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                isSplChar_name = !re.test(this.cat.cat_name);
                if (this.cat.cat_name == '' || this.cat.cat_name == undefined) {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                if (this.cat.cat_name.trim() == '') {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                if (this.edit == true && flag == 0) {
                    this._appservice.updateCatData(this.cat, this.admintoken)
                        .subscribe(function(Response) {
                            console.log(Response);
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                            } else {
                                _this._message.showWarning(Response.response_message);
                                localStorage.clear();
                                location.reload();
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else if (this.edit == false && flag == 0) {
                    console.log(this.cat);
                    this._appservice.addCategory(this.cat)
                        .subscribe(function(Response) {
                            console.log(Response);
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                                _this.ngOnInit();
                            } else {
                                _this._message.showWarning(Response.response_code + ':' + Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else {}
            };
            CategoryComponent.prototype.add = function() {
                this.edit = false;
                this.pagetitle = 'Add Category';
                this.cat = {};
                // this._appservice.getCountries().subscribe((response) => {
                //     this.countries = response.data;
                //     console.log(response.data);
                // }, (error) => {
                //     console.log(error);
                // });
            };
            CategoryComponent.prototype.delete = function(str) {
                console.log(str);
                this.cat = str;
                this.edit = true;
                this.deleteData();
            };
            CategoryComponent.prototype.deleteData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                isSplChar_name = !re.test(this.cat.cat_name);
                this._appservice.deleteCatData(this.cat, this.admintoken)
                    .subscribe(function(Response) {
                        console.log(Response);
                        if (Response.response_code == 2000) {
                            _this._message.showSuccess(Response.response_message);
                            _this.ngOnInit();
                        } else {
                            _this._message.showWarning(Response.response_message);
                            localStorage.clear();
                            location.reload();
                        }
                    }, function(Error) {
                        _this._message.showError(Error.message);
                    });
            };
            CategoryComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'categories',
                    styles: [__webpack_require__("./src/app/categories/categories.component.css")],
                    template: __webpack_require__("./src/app/categories/categories.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]
                ])
            ], CategoryComponent);
            return CategoryComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/changepassword/changepassword.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/changepassword/changepassword.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\">\r\n    </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">Change Password</h5>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n                        <form class=\"col-xs-6\">\r\n                            <div class=\"form-group\">\r\n                                <label>New Password:</label>\r\n                                <input type=\"password\" name=\"password\" placeholder=\"New Password\" class=\"form-control\" [(ngModel)]=\"updatePasswordData.password\">\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label>Confirm New Password:</label>\r\n                                <input type=\"password\" name=\"repassword\" placeholder=\"Confirm New Password\" class=\"form-control\" [(ngModel)]=\"updatePasswordData.repassword\">\r\n                            </div>\r\n                            <button type=\"button\" class=\"btn btn-primary\" (click)=\"updatePassword()\">Change Password</button>\r\n                        </form>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->"

        /***/
    }),

    /***/
    "./src/app/changepassword/changepassword.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* unused harmony export UpdatePasswordData */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return ChangepasswordComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };




        var UpdatePasswordData = /** @class */ (function() {
            function UpdatePasswordData() {}
            return UpdatePasswordData;
        }());

        var ChangepasswordComponent = /** @class */ (function() {
            function ChangepasswordComponent(http, _appservice, _message) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
            }
            ChangepasswordComponent.prototype.ngOnInit = function() {
                this.admintoken = localStorage.getItem('admintoken');
                this.updatePasswordData = {
                    password: '',
                    repassword: ''
                };
            };
            ChangepasswordComponent.prototype.updatePassword = function() {
                var _this = this;
                if (this.updatePasswordData.password == '') {
                    var errorMessage = 'Please enter a password';
                    this._message.showError(errorMessage);
                } else if (this.updatePasswordData.password.length < 6) {
                    var errorMessage = 'Password must be minimum 6 characters';
                    this._message.showError(errorMessage);
                } else if (this.updatePasswordData.password != this.updatePasswordData.repassword) {
                    var errorMessage = 'Both password must match';
                    this._message.showError(errorMessage);
                } else {
                    this._appservice.updatePassword(this.updatePasswordData, this.admintoken)
                        .subscribe(function(Response) {
                            if (Response.success) {
                                _this._message.showSuccess(Response.message);
                            } else {
                                _this._message.showWarning(Response.message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                }
            };
            ChangepasswordComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'changepassword',
                    styles: [__webpack_require__("./src/app/changepassword/changepassword.component.css")],
                    template: __webpack_require__("./src/app/changepassword/changepassword.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__["a" /* MessageService */ ]
                ])
            ], ChangepasswordComponent);
            return ChangepasswordComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/cms/cms.component.css":
    /***/
        (function(module, exports) {

        module.exports = " .image {\r\n     cursor: pointer;\r\n }\r\n \r\n input[type='file'] {\r\n     opacity: 0\r\n }\r\n \r\n .listname {\r\n     cursor: pointer;\r\n     list-style: none;\r\n }\r\n \r\n .listname .highlight {\r\n     color: red;\r\n }\r\n \r\n .loader {\r\n     border: 16px solid #f3f3f3;\r\n     border-radius: 50%;\r\n     border-top: 16px solid #3498db;\r\n     width: 5px;\r\n     height: 5px;\r\n     -webkit-animation: spin .5s linear infinite;\r\n     animation: spin .5s linear infinite;\r\n }\r\n \r\n .adduser {\r\n     float: right;\r\n     margin-right: 10px;\r\n }\r\n \r\n @-webkit-keyframes spin {\r\n     0% {\r\n         -webkit-transform: rotate(0deg);\r\n     }\r\n     100% {\r\n         -webkit-transform: rotate(360deg);\r\n     }\r\n }\r\n \r\n @keyframes spin {\r\n     0% {\r\n         -webkit-transform: rotate(0deg);\r\n                 transform: rotate(0deg);\r\n     }\r\n     100% {\r\n         -webkit-transform: rotate(360deg);\r\n                 transform: rotate(360deg);\r\n     }\r\n }"

        /***/
    }),

    /***/
    "./src/app/cms/cms.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\">\r\n    </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">Cms Page Management</h5>\r\n                        <button title=\"Add new user\" id=\"modal-219933\" pull-right class=\"btn btn-xs btn-success adduser\" (click)=\"adduser()\" href=\"#modal-container-219933\" data-toggle=\"modal\">\r\n                            <i class=\"fa fa-user\"></i>\r\n                            Add Cms Page</button>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n\r\n                        <!-- <div class=\"row\">\r\n                            <div class=\"col-sm-2\">\r\n                                <input type=\"search\" class=\"form-control\" title=\"Enter first name\" placeholder=\"User first name\" [(ngModel)]=\"search.fname\" />\r\n                            </div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n                                <input type=\"search\" class=\"form-control\" title=\"Enter last name\" placeholder=\"User last name\" [(ngModel)]=\"search.lname\" />\r\n                            </div>\r\n                            <div class=\"col-sm-2\">\r\n                                <input type=\"search\" class=\"form-control\" title=\"Enter user email\" placeholder=\"User Email\" [(ngModel)]=\"search.email\" />\r\n                            </div>\r\n                            <div class=\"col-sm-2\">\r\n                                <button title=\"Search\" class=\"btn btn-info\" (click)=\"ngOnInit()\"><i class=\"fa fa-search\"></i> Search</button>\r\n                                <button title=\"Clear Search\" class=\"btn btn-dark\" (click)=\"clear()\">   <i class=\"fa fa-remove\"></i>  clear</button>\r\n                            </div>\r\n                        </div> -->\r\n\r\n                        <div class=\"table-responsive\">\r\n                            <table class=\"table table-bordered  table-condensed table-hover\">\r\n                                <thead>\r\n                                    <tr>\r\n\r\n                                        <th>\r\n                                            Topic Name\r\n                                        </th>\r\n\r\n\r\n\r\n                                        <th>\r\n                                            <small> Created</small>\r\n                                        </th>\r\n                                        <th>\r\n                                            Action\r\n                                        </th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of data\">\r\n\r\n                                        <td>{{item.keyword}}</td>\r\n\r\n                                        <td><small>{{item.createdAt|date}}</small></td>\r\n                                        <td> <button title=\"Edit user\" id=\"modal-219933\" class=\"btn btn-xs btn-success\" (click)=\"getcmspage(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Edit</button>\r\n                                            <!-- <button title=\"Delete user\" id=\"modal-219934\" class=\"btn btn-xs btn-danger\" (click)=\"deletecmspage(item)\" href=\"#modal-container-219934\" data-toggle=\"modal\"><i class=\"fa fa-trash-o\"></i></button> -->\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                                <tfoot>\r\n                                    <tr>\r\n                                    </tr>\r\n                                </tfoot>\r\n                            </table>\r\n                            <button class=\"btn btn-xs btn-info\" (click)=\"loadmore()\"> <i class=\"fa fa-repeat\"></i>  load more</button>\r\n                        </div>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->\r\n<div class=\"modal fade\" id=\"modal-container-219933\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                            ×\r\n                        </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-12\">\r\n                        <!--[readonly]=\"true\"-->\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Page Keywords</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"cms.keyword\" />\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">\r\n\t\t\t\t\t\t\t\t\tPage Description \r\n\t\t\t\t\t\t\t\t</label>\r\n                            <!-- <textarea  [(ngModel)]='cms.content' rows=\"30\" cols=\"90\">                             \r\n</textarea> -->\r\n                            <!-- <ckeditor\r\n\t\t\t\t\t\t\t\t\t[(ngModel)]='cms.content'\r\n\t\t\t\t\t\t\t\t\t[config]=\"{uiColor: '#99000'}\"\r\n\t\t\t\t\t\t\t\t\t[readonly]=\"false\"\r\n\t\t\t\t\t\t\t\t\t(change)=\"onChange($event)\"\r\n\t\t\t\t\t\t\t\t\t(ready)=\"onReady($event)\"\r\n\t\t\t\t\t\t\t\t\t(focus)=\"onFocus($event)\"\r\n\t\t\t\t\t\t\t\t\t(blur)=\"onBlur($event)\"\r\n\t\t\t\t\t\t\t\t\tdebounce=\"500\">\r\n\t\t\t\t\t\t\t\t</ckeditor> -->\r\n                            <ckeditor [(ngModel)]='cms.content' [config]=\"{uiColor: '#a4a3f7'}\" [readonly]=\"false\" debounce=\"500\">\r\n                            </ckeditor>\r\n                        </div>\r\n\r\n\r\n\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n                            Close\r\n                        </button>\r\n                <button type=\"button\" (click)=\"updateCmsData()\" class=\"btn btn-primary\">\r\n                            Save changes\r\n                        </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"modal fade\" id=\"modal-container-219934\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                                        ×\r\n                                    </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\" style=\"text-align: center;\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" (click)=\"deleteData()\" class=\"btn btn-primary\">\r\n                                        Delete\r\n                                    </button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">\r\n                                        Cancel\r\n                                    </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

        /***/
    }),

    /***/
    "./src/app/cms/cms.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return CmsComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };




        var CmsComponent = /** @class */ (function() {
            function CmsComponent(http, _appservice, _message) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this.search = {};
                this.cms = {};
                //this.search.email = ''
            }
            CmsComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.cms = {};
                var userarr = [],
                    query;
                this.size = 10;
                this.number = 1;
                this.admintoken = localStorage.getItem('admintoken');
                var obj = {
                    size: this.size,
                    number: this.number
                };
                this._appservice.getAllCms(obj).subscribe(function(Response) {
                    // console.log(Response);
                    var result = Response.response_data;
                    for (var index = 0; index < result.length; index++) {
                        var cmsarrval = {};
                        cmsarrval['keyword'] = result[index].keyword;
                        cmsarrval['content'] = result[index].content;
                        cmsarrval['createdAt'] = result[index].createdAt;
                        cmsarrval['_id'] = result[index]._id;
                        userarr.push(cmsarrval);
                    }
                    _this.data = userarr;
                }, function(Error) {});
            };
            CmsComponent.prototype.getcmspage = function(str) {
                this.edit = true;
                this.pagetitle = 'Edit ' + str.keyword + ' page';
                // console.log(str);
                this.cms = str;
            };
            CmsComponent.prototype.deletecmspage = function(str) {
                console.log(str);
                this.cms = str;
                this.pagetitle = 'Are you sure delete this music?';
                this.edit = true;
            };
            CmsComponent.prototype.deleteData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                // isSplChar_name = !re.test(this.cat.cat_name);
                this._appservice.deleteCms(this.cms, this.admintoken)
                    .subscribe(function(Response) {
                        console.log(Response);
                        if (Response.response_code == 2000) {
                            _this._message.showSuccess(Response.response_message);
                            _this.ngOnInit();
                        } else {
                            _this._message.showWarning(Response.response_message);
                            localStorage.clear();
                            location.reload();
                        }
                    }, function(Error) {
                        _this._message.showError(Error.message);
                    });
            };
            CmsComponent.prototype.updateCmsData = function() {
                var _this = this;
                console.log(this.cms);
                var flag = 0,
                    errorMessage, re, isSplChar_name, isSplChar_lname;
                re = /^([a-zA-Z ]+)$/;
                isSplChar_name = !re.test(this.cms.keyword);
                if (this.cms.keyword == '' || this.cms.keyword == undefined) {
                    errorMessage = 'Please enter keyword';
                    console.log(errorMessage);
                    flag = 1;
                    this._message.showError(errorMessage);
                    return false;
                }
                if (this.cms.content == '' || this.cms.content == undefined) {
                    errorMessage = 'Please enter description';
                    console.log(errorMessage);
                    flag = 1;
                    this._message.showError(errorMessage);
                    return false;
                }
                if (this.edit == true && flag == 0) {
                    console.log(this.cms);
                    this._appservice.updateCmsData(this.cms, this.admintoken)
                        .subscribe(function(Response) {
                            if (Response.response_code === 2000) {
                                _this._message.showSuccess(Response.response_message);
                            } else {
                                _this._message.showWarning(Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else if (this.edit == false && flag == 0) {
                    this._appservice.addCmsData(this.cms, this.admintoken)
                        .subscribe(function(Response) {
                            if (Response.response_code === 2000) {
                                _this._message.showSuccess(Response.response_message);
                                _this.ngOnInit();
                            } else {
                                _this._message.showWarning(Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else {}
            };
            CmsComponent.prototype.adduser = function() {
                this.edit = false;
                this.pagetitle = 'Add Cms Pages';
                this.cms = {};
            };
            CmsComponent.prototype.loadmore = function() {
                var _this = this;
                var userarr = [];
                this.number = this.number + 1;
                this.admintoken = localStorage.getItem('admintoken');
                var obj = {
                    size: this.size,
                    number: this.number
                };
                this._appservice.getAllCms(obj).subscribe(function(Response) {
                    var result = Response.response;
                    for (var index = 0; index < result.length; index++) {
                        var cmsarrval = {};
                        cmsarrval['keyword'] = result[index].keyword;
                        cmsarrval['content'] = result[index].content;
                        cmsarrval['createdAt'] = result[index].createdAt;
                        cmsarrval['_id'] = result[index]._id;
                        _this.data.push(cmsarrval);
                    }
                }, function(Error) {});
            };
            CmsComponent.prototype.clear = function() {
                this.ngOnInit();
            };
            CmsComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'cms',
                    styles: [__webpack_require__("./src/app/cms/cms.component.css")],
                    template: __webpack_require__("./src/app/cms/cms.component.html"),
                })
                // class Select
                ,
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__["a" /* MessageService */ ]
                ])
            ], CmsComponent);
            return CmsComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/contact/contact-component.css":
    /***/
        (function(module, exports) {

        module.exports = ".form-content {\n  width: 90%;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.form-content .sd-form-control {\n  display: block;\n  margin-bottom: 10px;\n  width: 100%;\n  padding: 10px;\n}\n.form-content textarea.sd-form-control {\n  max-width: 100%;\n}\n"

        /***/
    }),

    /***/
    "./src/app/contact/contact.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<h2>Contact Reactive Form</h2>\n\n<form (ngSubmit)=\"submitForm()\" [formGroup]=\"contactForm\" novalidate>\n  <div class=\"form-content\">\n    <label>\n      Name:\n      <input type=\"text\" formControlName=\"name\" class=\"sd-form-control\" placeholder=\"Enter your name.\">\n    </label>\n    <label>\n      Email:\n      <input type=\"email\" formControlName=\"email\" class=\"sd-form-control\" placeholder=\"Enter your email.\">\n    </label>\n    <label>\n      Content:\n      <textarea formControlName=\"content\" class=\"sd-form-control\" placeholder=\"Content here.\"></textarea>\n    </label>\n    <div class=\"form-submit\">\n      <button type=\"submit\">Submit</button>\n    </div>\n  </div>\n</form>\n\n<div class=\"form-value\">\n  Form value:\n  <pre>\n    {{contactForm.value | json}}\n  </pre>\n  <p>\n    Status: {{contactForm.status}}\n  </p>\n  <p>\n    Valid: {{contactForm.valid}}\n  </p>\n  <p>Submit then open console to see full form.</p>\n</div>\n\n"

        /***/
    }),

    /***/
    "./src/app/contact/contact.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return ContactComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__forms_CustomValidators__ = __webpack_require__("./src/app/forms/CustomValidators.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };



        var ContactComponent = /** @class */ (function() {
            function ContactComponent(formBuilder) {
                this.formBuilder = formBuilder;
            }
            ContactComponent.prototype.ngOnInit = function() {
                this.contactForm = this.formBuilder.group({
                    name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].required],
                    email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].required, __WEBPACK_IMPORTED_MODULE_2__forms_CustomValidators__["a" /* default */ ].validateEmail]],
                    content: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */ ].minLength(10)]]
                });
            };
            ContactComponent.prototype.submitForm = function() {
                console.log(this.contactForm);
            };
            ContactComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'app-contact',
                    template: __webpack_require__("./src/app/contact/contact.component.html"),
                    styles: [__webpack_require__("./src/app/contact/contact-component.css")]
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */ ]])
            ], ContactComponent);
            return ContactComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/faq/faq.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/faq/faq.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\" style=\"background-color:#fff; margin-left:0\">\r\n<div class=\"container\" >\r\n\t<div class=\"content\">\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"span16 \">\r\n\t\t\t\t\t<div class=\"page-header\">\r\n\t\t\t\t\t\t\t<h2 style=\"text-decoration-color: red;\" >{{pagetitle}}</h2>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"panel-body\" style=\"word-break:break-word\" [innerHTML]=\"pagecontent\">                \r\n\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

        /***/
    }),

    /***/
    "./src/app/faq/faq.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return FaqComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };






        var FaqComponent = /** @class */ (function() {
            function FaqComponent(http, _appservice, _message, _router, broadcaster) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this._router = _router;
                this.broadcaster = broadcaster;
                this.pagetitle = '';
                this.pagecontent = '';
            }
            FaqComponent.prototype.ngOnInit = function() {
                var _this = this;
                var obj = { page: "faq" };
                this._appservice.getCmsPage(obj).subscribe(function(Response) {
                    console.log(Response);
                    _this.pagetitle = 'FAQ';
                    _this.pagecontent = Response.response_data.content;
                }, function(Error) {});
            };
            FaqComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'faq',
                    styles: [__webpack_require__("./src/app/faq/faq.component.css")],
                    template: __webpack_require__("./src/app/faq/faq.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ],
                    __WEBPACK_IMPORTED_MODULE_5__broadcaster__["a" /* Broadcaster */ ]
                ])
            ], FaqComponent);
            return FaqComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/filter.pipe.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };

        // @Pipe({name: 'highlightPipe'})
        // export class HighlightPipe implements PipeTransform{
        //   transform(text:string, filter:string) : any{
        //     if(filter){
        //       text = text.replace(new RegExp('('+filter+')', 'gi'), '<b class="highlight">$1</b>');
        //     }
        //     return text;
        //   }
        // }
        var SearchPipe = /** @class */ (function() {
            function SearchPipe() {}
            SearchPipe.prototype.transform = function(value, keys, term) {
                if (!term)
                    return value;
                return (value || []).filter(function(item) { return keys.split(',').some(function(key) { return item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]); }); });
            };
            SearchPipe = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
                    name: 'search'
                })
            ], SearchPipe);
            return SearchPipe;
        }());



        /***/
    }),

    /***/
    "./src/app/forgotpassword/forgotpassword.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/forgotpassword/forgotpassword.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\">\r\n    </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">Change Password</h5>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n                        <form class=\"col-xs-6\">\r\n                            <div class=\"form-group\">\r\n                                <label>New Password:</label>\r\n                                <input type=\"password\" name=\"password\" placeholder=\"New Password\" class=\"form-control\" [(ngModel)]=\"forgotPasswordData.password\">\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label>Confirm New Password:</label>\r\n                                <input type=\"password\" name=\"repassword\" placeholder=\"Confirm New Password\" class=\"form-control\" [(ngModel)]=\"forgotPasswordData.repassword\">\r\n                            </div>\r\n                            <button type=\"button\" class=\"btn btn-primary\" (click)=\"updatePassword()\">Change Password</button>\r\n                        </form>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->"

        /***/
    }),

    /***/
    "./src/app/forgotpassword/forgotpassword.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* unused harmony export ForgotPasswordData */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotpasswordComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };





        var ForgotPasswordData = /** @class */ (function() {
            function ForgotPasswordData() {}
            return ForgotPasswordData;
        }());

        var ForgotpasswordComponent = /** @class */ (function() {
            function ForgotpasswordComponent(http, _appservice, _message, activatedRoute, _router) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this.activatedRoute = activatedRoute;
                this._router = _router;
            }
            ForgotpasswordComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.forgotPasswordData = {
                    id: '',
                    password: '',
                    repassword: ''
                };
                this.activatedRoute.params.subscribe(function(params) {
                    _this.forgotPasswordData.id = params['id'];
                });
            };
            ForgotpasswordComponent.prototype.updatePassword = function() {
                var _this = this;
                if (this.forgotPasswordData.password == '') {
                    var errorMessage = 'Please enter a password';
                    this._message.showError(errorMessage);
                } else if (this.forgotPasswordData.password.length < 6) {
                    var errorMessage = 'Password must be minimum 6 characters';
                    this._message.showError(errorMessage);
                } else if (this.forgotPasswordData.password != this.forgotPasswordData.repassword) {
                    var errorMessage = 'Both password must match';
                    this._message.showError(errorMessage);
                } else {
                    this._appservice.forgotPassword(this.forgotPasswordData)
                        .subscribe(function(Response) {
                            if (Response.success) {
                                _this._message.showSuccess(Response.message);
                                _this._router.navigate(['login']);
                            } else {
                                _this._message.showWarning(Response.message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                }
            };
            ForgotpasswordComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'forgotpassword',
                    styles: [__webpack_require__("./src/app/forgotpassword/forgotpassword.component.css")],
                    template: __webpack_require__("./src/app/forgotpassword/forgotpassword.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ]
                ])
            ], ForgotpasswordComponent);
            return ForgotpasswordComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/forms/CustomValidators.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        var CustomValidators = /** @class */ (function() {
            function CustomValidators() {}
            /**
             * sample from http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
             */
            CustomValidators.validateEmail = function(c) {
                var EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                return EMAIL_REGEXP.test(c.value) ? null : {
                    validateEmail: {
                        valid: false
                    }
                };
            };
            return CustomValidators;
        }());
        /* harmony default export */
        __webpack_exports__["a"] = (CustomValidators);


        /***/
    }),

    /***/
    "./src/app/guards/auth.guard.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };


        var AuthGuard = /** @class */ (function() {
            function AuthGuard(router) {
                this.router = router;
            }
            AuthGuard.prototype.canActivate = function(route, state) {
                if (localStorage.getItem('admintoken')) {
                    // logged in so return true
                    return true;
                }
                // not logged in so redirect to login page with the return url
                //this.router.navigate([''], { queryParams: { returnUrl: state.url }});
                this.router.navigate(['']);
                return false;
            };
            AuthGuard = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ]])
            ], AuthGuard);
            return AuthGuard;
        }());



        /***/
    }),

    /***/
    "./src/app/guards/index.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__auth_guard__ = __webpack_require__("./src/app/guards/auth.guard.ts");
        /* harmony namespace reexport (by used) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__auth_guard__["a"]; });



        /***/
    }),

    /***/
    "./src/app/guide/guide.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/guide/guide.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\" style=\"background-color:#fff;margin-left:0\">\r\n<div class=\"container\" >\r\n\t<div class=\"content\">\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"span16 \">\r\n\t\t\t\t\t<div class=\"page-header\">\r\n\t\t\t\t\t\t\t<h2 style=\"text-decoration-color: red;\" >{{pagetitle}}</h2>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"panel-body\" style=\"word-break:break-all\" [innerHTML]=\"pagecontent\">                \r\n\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

        /***/
    }),

    /***/
    "./src/app/guide/guide.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return GuideComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };






        var GuideComponent = /** @class */ (function() {
            function GuideComponent(http, _appservice, _message, _router, broadcaster) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this._router = _router;
                this.broadcaster = broadcaster;
                this.pagetitle = '';
                this.pagecontent = '';
            }
            GuideComponent.prototype.ngOnInit = function() {
                var _this = this;
                var obj = { page: "guide" };
                this._appservice.getCmsPage(obj).subscribe(function(Response) {
                    console.log(Response);
                    _this.pagetitle = 'guide';
                    _this.pagecontent = Response.response_data.content;
                }, function(Error) {});
            };
            GuideComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'guide',
                    styles: [__webpack_require__("./src/app/guide/guide.component.css")],
                    template: __webpack_require__("./src/app/guide/guide.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ],
                    __WEBPACK_IMPORTED_MODULE_5__broadcaster__["a" /* Broadcaster */ ]
                ])
            ], GuideComponent);
            return GuideComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/help/help.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/help/help.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\" style=\"background-color:#fff;margin-left:0\">\r\n<div class=\"container\" >\r\n\t<div class=\"content\">\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"span16 \">\r\n\t\t\t\t\t<div class=\"page-header\">\r\n\t\t\t\t\t\t\t<h2 style=\"text-decoration-color: red;\" >{{pagetitle}}</h2>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"panel-body\" style=\"word-break:break-word\" [innerHTML]=\"pagecontent\">                \r\n\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

        /***/
    }),

    /***/
    "./src/app/help/help.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return HelpComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };






        var HelpComponent = /** @class */ (function() {
            function HelpComponent(http, _appservice, _message, _router, broadcaster) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this._router = _router;
                this.broadcaster = broadcaster;
                this.pagetitle = '';
                this.pagecontent = '';
            }
            HelpComponent.prototype.ngOnInit = function() {
                var _this = this;
                var obj = { page: "help" };
                this._appservice.getCmsPage(obj).subscribe(function(Response) {
                    console.log(Response);
                    _this.pagetitle = 'Help';
                    _this.pagecontent = Response.response_data.content;
                }, function(Error) {});
            };
            HelpComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'help',
                    styles: [__webpack_require__("./src/app/help/help.component.css")],
                    template: __webpack_require__("./src/app/help/help.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ],
                    __WEBPACK_IMPORTED_MODULE_5__broadcaster__["a" /* Broadcaster */ ]
                ])
            ], HelpComponent);
            return HelpComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/home/home.component.css":
    /***/
        (function(module, exports) {

        module.exports = " .adduser {\r\n     float: right;\r\n }"

        /***/
    }),

    /***/
    "./src/app/home/home.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\">\r\n    </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">User Management</h5>\r\n                        <button title=\"Add new user\" id=\"modal-219933\" pull-right class=\"btn btn-xs btn-danger adduser\" (click)=\"adduser()\" href=\"#modal-container-219933\" data-toggle=\"modal\">\r\n                            <i class=\"fa fa-user\"></i>\r\n                            Add User</button>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-1\"><label>Search:</label></div>\r\n                            <div class=\"col-sm-2\">\r\n                                <input type=\"search\" class=\"form-control\" title=\"Enter user name\" placeholder=\"name,email,gender\" [(ngModel)]=\"keyword\" />\r\n                            </div>\r\n                            <!--     <div class=\"col-sm-2\">\r\n                                <input type=\"search\" class=\"form-control\" title=\"Enter user email\" placeholder=\"User Email\" [(ngModel)]=\"search.email\" />\r\n                            </div>\r\n                            <div class=\"col-sm-1\">\r\n                                <select id=\"\" [(ngModel)]=\"search.dob\" class=\"form-control\">\r\n                                                <option [disabled]=\"true\" value=\"\">year</option>\r\n                                                <option  *ngFor=\"let list of dobyear\" value=\"{{list}}\">  {{list}}</option>        \r\n                                            </select>\r\n                            </div>\r\n                            <div class=\"col-sm-1\">\r\n                                <select id=\"\" [(ngModel)]=\"search.gender\" class=\"form-control\">\r\n                                                <option [disabled]=\"true\" value=\"\">Gender</option>\r\n                                                <option value=\"Male\">Male</option>\r\n                                                <option value=\"Female\">Female</option>\r\n                                            </select>\r\n                            </div> -->\r\n\r\n                            <!-- <div class=\"col-sm-2\">\r\n                                <button title=\"Search\" class=\"btn btn-info\" (click)=\"ngOnInit()\"><i class=\"fa fa-search\"></i> Search</button>\r\n                                <button title=\"Clear Search\" class=\"btn btn-dark\" (click)=\"clear()\">   <i class=\"fa fa-remove\"></i>  clear</button>\r\n                            </div> -->\r\n                        </div>\r\n\r\n                        <div class=\"table-responsive\">\r\n                            <table class=\"table table-bordered  table-condensed table-hover\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>\r\n                                            <small>  Profile Image</small>\r\n                                        </th>\r\n                                        <th>\r\n                                            Name\r\n                                        </th>\r\n                                        <th>\r\n                                            Display Name\r\n                                        </th>\r\n                                        <th>\r\n                                            Email\r\n                                        </th>\r\n                                        <th>\r\n                                            Report Count\r\n                                        </th>\r\n                                        <th>\r\n                                            About\r\n                                        </th>\r\n                                        <th>\r\n                                            Gender\r\n                                        </th>\r\n\r\n                                        <th>\r\n                                            <small> Joined</small>\r\n                                        </th>\r\n                                        <th>\r\n                                            Action\r\n                                        </th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of data | search:'name,username,email,gender':keyword\">\r\n                                        <td>\r\n\r\n                                            <img class=\"img-rounded\" *ngIf=\"item.profileImage!=''\" [src]=\"item.profileImage\" width=\"30\" height=\"30\" />\r\n                                            <img class=\"img-rounded\" *ngIf=\"item.profileImage==''\" src=\"../../assets/images/avatar.png\" width=\"30\" />\r\n                                        </td>\r\n                                        <td>{{item.name}}\r\n                                            <!--  <span *ngIf=\"item.isBlocked==false\" title=\"Active Users\" class=\"text-success fa fa-check-circle\"> </span>\r\n                                            <span *ngIf=\"item.isBlocked==true\" title=\"Blocked Users\" class=\"text-danger fa fa-ban\"> </span> --></td>\r\n                                        <td>{{item.username}}</td>\r\n                                        <td>{{item.email}}</td>\r\n                                        <td>{{item.reportCount}}</td>\r\n                                        <td>{{item.aboutme}}</td>\r\n                                        <td>{{item.gender}}</td>\r\n\r\n                                        <td><small>{{item.createdAt|date}}</small></td>\r\n                                        <td>\r\n                                            <button title=\"Edit user\" id=\"modal-219933\" class=\"btn btn-xs btn-success\" (click)=\"getuser(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Edit</button>\r\n                                            <!-- <button title=\"Delete user\" class=\"btn btn-xs btn-danger\" (click)=\"delete(item)\">Delete</button> -->\r\n                                            <!-- <button title=\"Delete user\" id=\"modal-219934\" class=\"btn btn-xs btn-danger\" (click)=\"deleteUser(item)\" href=\"#modal-container-219934\" data-toggle=\"modal\"><i class=\"fa fa-trash-o\"></i></button> -->\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                                <tfoot>\r\n                                    <tr>\r\n                                    </tr>\r\n                                </tfoot>\r\n                            </table>\r\n                            <button class=\"btn btn-xs btn-info\" (click)=\"loadmore()\"> <i class=\"fa fa-repeat\"></i>  load more</button>\r\n                        </div>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->\r\n<div class=\"modal fade\" id=\"modal-container-219933\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                            ×\r\n                        </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-12\">\r\n                        <div class=\"col-sm-6\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\">Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"usr.name\" />\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\">Display Name</label>\r\n                                <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"usr.username\" />\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\">Email</label>\r\n                                <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"usr.email\" />\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\">Gender</label>\r\n                                <select class=\"form-control\" id=\"\" [(ngModel)]=\"usr.gender\">\r\n                                            <option [disabled]=\"true\" value=\"\">Select</option>\r\n                                            <option value=\"Male\">Male</option>\r\n                                            <option value=\"Female\">Female</option>\r\n                                        </select>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"col-sm-6\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\">About </label>\r\n                                <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"usr.aboutme\" />\r\n                            </div>\r\n                            <!--  <div class=\"form-group\">\r\n                                <label for=\"\">Year of birth</label>\r\n                                <select class=\"form-control\" id=\"\" [(ngModel)]=\"usr.dob\">\r\n                                            <option [disabled]=\"true\" value=\"\">Select</option>\r\n                                            <option  *ngFor=\"let list of dobyear\" value=\"{{list}}\">  {{list}}</option>        \r\n                                        </select>\r\n                            </div> -->\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\">Blocked</label>\r\n                                <select class=\"form-control\" id=\"\" [(ngModel)]=\"usr.isBlocked\">\r\n                                            <option value=\"true\">Yes</option>\r\n                                            <option value=\"false\">No</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n                            Close\r\n                        </button>\r\n                <button type=\"button\" (click)=\"updateUserData()\" class=\"btn btn-primary\">\r\n                            Save changes\r\n                        </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- <div class=\"modal fade\" id=\"modal-container-219934\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                                        ×\r\n                                    </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\" style=\"text-align: center;\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" (click)=\"deleteData()\" class=\"btn btn-primary\">\r\n                                        Delete\r\n                                    </button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">\r\n                                        Cancel\r\n                                    </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div> -->"

        /***/
    }),

    /***/
    "./src/app/home/home.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };


        //import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';



        var HomeComponent = /** @class */ (function() {
            function HomeComponent(http, _appservice, _message, router) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this.router = router;
                this.search = {};
                this.usr = {};
                this.search.name = '';
                this.search.email = '';
                this.search.gender = '';
            }
            HomeComponent.prototype.ngOnInit = function() {
                var _this = this;
                // console.log(this.search)
                this.usr = {};
                var date = new Date();
                var y = [];
                for (var index = 1900; index < date.getFullYear(); index++) {
                    y.push(index);
                }
                this.dobyear = y;
                var userarr = [],
                    query;
                this.size = 10;
                this.number = 1;
                this.admintoken = localStorage.getItem('admintoken');
                var obj = {
                    size: this.size,
                    number: this.number,
                    name: this.search.name,
                    email: this.search.email,
                    gender: this.search.gender
                };
                // console.log(obj)
                //console.log('aloke');
                this._appservice.getAllUser(obj, this.admintoken).subscribe(function(Response) {
                    // console.log(Response);
                    if (Response.success) {
                        var result = Response.response_data;
                        for (var index = 0; index < result.length; index++) {
                            var userarrval = {};
                            userarrval['profileImage'] = result[index].image_url;
                            userarrval['name'] = result[index].name;
                            userarrval['email'] = result[index].email;
                            userarrval['username'] = result[index].username;
                            userarrval['aboutme'] = result[index].aboutme;
                            userarrval['gender'] = result[index].gender;
                            userarrval['reportCount'] = result[index].reportCount;
                            userarrval['createdAt'] = result[index].createdAt;
                            userarrval['isBlocked'] = result[index].isBlocked;
                            userarrval['_id'] = result[index]._id;
                            userarr.push(userarrval);
                        }
                        _this.data = userarr;
                        //   console.log(userarr);
                    } else {
                        _this._message.showWarning(Response.response_message);
                        localStorage.removeItem("admintoken");
                        localStorage.clear();
                        location.reload();
                    }
                }, function(Error) {});
            };
            HomeComponent.prototype.getuser = function(str) {
                this.edit = true;
                this.pagetitle = 'Edit User';
                var date = new Date();
                var y = [];
                for (var index = 1900; index < date.getFullYear(); index++) {
                    y.push(index);
                }
                this.dobyear = y;
                this.usr = str;
            };
            HomeComponent.prototype.updateUserData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                isSplChar_name = !re.test(this.usr.name);
                if (this.usr.name == '' || this.usr.name == undefined) {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                if (this.usr.name.trim() == '') {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    // console.log(errorMessage);
                    return false;
                }
                if (isSplChar_name == true) {
                    errorMessage = 'Please enter characters only in name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    // console.log(errorMessage)
                    return false;
                }
                if (this.usr.email == '' || this.usr.email == undefined) {
                    errorMessage = 'Please enter email';
                    // console.log(errorMessage);
                    flag = 1;
                    this._message.showError(errorMessage);
                    return false;
                }
                if (this.usr.gender == "" || this.usr.gender == undefined) {
                    errorMessage = 'Please select a gender';
                    flag = 1;
                    this._message.showError(errorMessage);
                    // console.log(errorMessage)
                    return false;
                }
                // if (this.usr.isBlocked == "" || this.usr.isBlocked == undefined) {
                //     errorMessage = 'Are you want to Blocked the user';
                //     flag = 1;
                //     this._message.showError(errorMessage)
                //     console.log(errorMessage)
                //     return false;
                // }
                if (this.edit == true && flag == 0) {
                    this._appservice.updateUserData(this.usr, this.admintoken)
                        .subscribe(function(Response) {
                            // console.log(Response);
                            if (Response.success) {
                                _this._message.showSuccess(Response.message);
                            } else {
                                _this._message.showWarning(Response.message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else if (this.edit == false && flag == 0) {
                    // console.log(this.usr)
                    this._appservice.addUser(this.usr)
                        .subscribe(function(Response) {
                            // console.log(Response)
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                                _this.ngOnInit();
                            } else {
                                _this._message.showWarning(Response.response_code + ':' + Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else {}
            };
            HomeComponent.prototype.adduser = function() {
                this.edit = false;
                this.pagetitle = 'Add User';
                this.usr = {};
                var date = new Date();
                var y = [];
                for (var index = 1900; index < date.getFullYear(); index++) {
                    y.push(index);
                }
                this.dobyear = y;
                // this._appservice.getCountries().subscribe((response) => {
                //     this.countries = response.data;
                //     console.log(response.data);
                // }, (error) => {
                //     console.log(error);
                // });
            };
            HomeComponent.prototype.delete = function(str) {
                console.log(str);
                this.usr = str;
                this.edit = true;
                this.deleteData();
            };
            HomeComponent.prototype.deleteData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                // isSplChar_name = !re.test(this.cat.cat_name);
                this._appservice.deleteUserData(this.usr, this.admintoken)
                    .subscribe(function(Response) {
                        console.log(Response);
                        if (Response.response_code == 2000) {
                            _this._message.showSuccess(Response.response_message);
                            _this.ngOnInit();
                        } else {
                            _this._message.showWarning(Response.response_message);
                            localStorage.clear();
                            location.reload();
                        }
                    }, function(Error) {
                        _this._message.showError(Error.message);
                    });
            };
            HomeComponent.prototype.loadmore = function() {
                var _this = this;
                var userarr = [];
                this.number = this.number + 1;
                this.admintoken = localStorage.getItem('admintoken');
                var obj = {
                    size: this.size,
                    number: this.number,
                    name: this.search.name,
                    email: this.search.email,
                    gender: this.search.gender,
                    country: this.search.country,
                    macNutProf: this.search.macNutProf
                };
                this._appservice.getAllUser(obj, this.admintoken).subscribe(function(Response) {
                    var result = Response.response_data;
                    console.log(result);
                    for (var index = 0; index < result.length; index++) {
                        var userarrval = {};
                        userarrval['profileImage'] = result[index].image_url;
                        userarrval['name'] = result[index].name;
                        userarrval['email'] = result[index].email;
                        userarrval['username'] = result[index].username;
                        userarrval['aboutme'] = result[index].aboutme;
                        userarrval['gender'] = result[index].gender;
                        userarrval['reportCount'] = result[index].reportCount;
                        userarrval['createdAt'] = result[index].createdAt;
                        userarrval['isBlocked'] = result[index].isBlocked;
                        userarrval['_id'] = result[index]._id;
                        _this.data.push(userarrval);
                    }
                }, function(Error) {});
            };
            HomeComponent.prototype.clear = function() {
                this.search.name = '';
                this.search.email = '';
                // this.search.dob = ''
                // this.search.gender = ''
                // this.search.country = ''
                // this.search.macNutProf = ''
                this.ngOnInit();
            };
            HomeComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'home',
                    styles: [__webpack_require__("./src/app/home/home.component.css")],
                    template: __webpack_require__("./src/app/home/home.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ]
                ])
            ], HomeComponent);
            return HomeComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/json-creator/json-creator.component.css":
    /***/
        (function(module, exports) {

        module.exports = ".box-header {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n}\r\n\r\n.box-title {\r\n    width: 100%;\r\n}\r\n\r\n.list-footer {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: end;\r\n    -ms-flex-pack: end;\r\n    justify-content: flex-end;\r\n}\r\n\r\n.list-header {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: start;\r\n    -ms-flex-pack: start;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.list-header p:not(:first-child) {\r\n    margin-left: 10px;\r\n}\r\n\r\n.item {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    margin-bottom: 5px;\r\n    -webkit-box-pack: center;\r\n    -ms-flex-pack: center;\r\n    justify-content: center;\r\n}\r\n\r\n.item input {\r\n    margin-left: 10px;\r\n}"

        /***/
    }),

    /***/
    "./src/app/json-creator/json-creator.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\"> </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">Create Lyrics Json File</h5>\r\n                        <div style=\"text-align:right; width: 100%\"> <button (click)=\"saveContent()\" class=\"btn btn-xs btn-success\">Download Json</button> </div>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n                        <div class=\"list\">\r\n                            <div class=\"list-header\">\r\n                                <p style=\"width: 40px\">No</p>\r\n                                <p style=\"flex: 2\">Lyrics Text</p>\r\n                                <p style=\"flex: 1\">Start</p>\r\n                                <p style=\"flex: 1\">End</p>\r\n                                <p style=\"flex: 1\">Action</p>\r\n                            </div>\r\n                            <div class=\"item\" *ngFor=\"let row of arrRows, let idx = index\">\r\n                                <p style=\"width: 40px\">{{idx + 1}}</p> <input type=\"text\" style=\"flex: 2\" (input)=\"valueChange(idx, 0, $event.target.value)\" /> <input type=\"text\" style=\"flex: 1\" (input)=\"valueChange(idx, 1, $event.target.value)\" /> <input type=\"text\" style=\"flex: 1\"\r\n                                    (input)=\"valueChange(idx, 2, $event.target.value)\" />\r\n                                <div style=\"flex: 1; margin-left: 10px\"> <button class=\"btn btn-xs btn-danger\" (click)=\"deleteRow(idx)\">Delete row</button> </div>\r\n                            </div>\r\n                            <div class=\"list-footer\">\r\n                                <div style=\"width: 40px\"></div>\r\n                                <div style=\"flex: 2\"></div>\r\n                                <div style=\"flex: 1\"></div>\r\n                                <div style=\"flex: 1\"></div>\r\n                                <div style=\"flex: 1; margin-left: 70px\"> <button (click)=\"addRow()\" class=\"btn btn-xs btn-primary\">Add row</button> </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->"

        /***/
    }),

    /***/
    "./src/app/json-creator/json-creator.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return JsonCreatorComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };

        var JsonCreatorComponent = /** @class */ (function() {
            function JsonCreatorComponent() {
                this.arrRows = [];
                this.addRow = function() {
                    this.arrRows.push({
                        text: "",
                        start: "",
                        end: ""
                    });
                };
                this.deleteRow = function(idx) {
                    if (confirm("Are you sure to delete this row?")) {
                        this.arrRows.splice(idx, 1);
                    }
                };
                this.valueChange = function(idx, type, value) {
                    switch (type) {
                        case 0:
                            this.arrRows[idx]["text"] = value;
                            break;
                        case 1:
                            this.arrRows[idx]["start"] = value;
                            break;
                        case 2:
                            this.arrRows[idx]["end"] = value;
                            break;
                    }
                };
                this.saveContent = function() {
                    this.arrRows.forEach(function(item, idx) {
                        item["index"] = idx + "";
                        item["text"] = item["text"].replace(/\\n/g, "\n");
                        item["timestamp"] = item["start"] + " --> " + item["end"];
                    });
                    // var file = new Blob([JSON.stringify(this.arrRows, null, 2)], {type : 'application/json'})
                    // var url = URL.createObjectURL(file);
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.arrRows, null, 2)));
                    element.setAttribute('download', "lyrics.json");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    // window.open(url)
                };
                this.arrRows = [];
                this.arrRows.push({
                    text: "",
                    start: "",
                    end: ""
                });
                //this.search.email = ''
            }
            JsonCreatorComponent.prototype.ngOnInit = function() {};
            JsonCreatorComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'json-creator',
                    styles: [__webpack_require__("./src/app/json-creator/json-creator.component.css")],
                    template: __webpack_require__("./src/app/json-creator/json-creator.component.html"),
                })
                // class Select
                ,
                __metadata("design:paramtypes", [])
            ], JsonCreatorComponent);
            return JsonCreatorComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/karaoke/karaoke.component.css":
    /***/
        (function(module, exports) {

        module.exports = " .adduser {\r\n     float: right;\r\n }"

        /***/
    }),

    /***/
    "./src/app/karaoke/karaoke.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\">\r\n    </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">Music Management</h5>\r\n                        <button title=\"Add new user\" id=\"modal-219933\" pull-right class=\"btn btn-xs btn-danger adduser\" (click)=\"add()\" href=\"#modal-container-219933\" data-toggle=\"modal\">\r\n                            <i class=\"fa fa-user\"></i>\r\n                            Add Music</button>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-1\"><label>Search:</label></div>\r\n                            <div class=\"col-sm-2\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"search\" class=\"form-control\" title=\"Enter Music name\" placeholder=\"Keyword\" [(ngModel)]=\"keyword\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"table-responsive\">\r\n                            <table class=\"table table-bordered  table-condensed table-hover\">\r\n                                <thead>\r\n                                    <tr>\r\n\r\n                                        <th>\r\n                                            Songs Name\r\n                                        </th>\r\n                                        <th>\r\n                                            Artist Name\r\n                                        </th>\r\n                                        <th>\r\n                                            Album Image\r\n                                        </th>\r\n                                        <th>\r\n                                            Instrumental File\r\n                                        </th>\r\n                                        <th>\r\n                                            Lyrics File\r\n                                        </th>\r\n                                        <th>\r\n                                            Dance File\r\n                                        </th>\r\n                                        <th>\r\n                                            <small> Created</small>\r\n                                        </th>\r\n                                        <th>\r\n                                            Action\r\n                                        </th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of data | search:'songs_name,artist_name':keyword\">\r\n                                        <td>{{item.songs_name}}\r\n                                            <!--  <span *ngIf=\"item.isBlocked==false\" title=\"Active Users\" class=\"text-success fa fa-check-circle\"> </span>\r\n                                            <span *ngIf=\"item.isBlocked==true\" title=\"Blocked Users\" class=\"text-danger fa fa-ban\"> </span> --></td>\r\n                                        <td>{{item.artist_name}}</td>\r\n                                        <!--  <td>{{item.cat_id}}</td> -->\r\n                                        <td><a class=\"btn btn-large btn-success\" *ngIf=\"item.file_url==''\" (click)=\"getCat(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Add</a>\r\n                                            <div *ngIf=\"item.image_url!=''\">\r\n                                                <img src=\"{{item.image_url}}\" width=\"60\">\r\n                                                <!--  <a class=\"btn btn-xs btn-success\">Edit</a><br> -->\r\n                                            </div>\r\n                                        </td>\r\n                                        <td>\r\n                                            <a class=\"btn btn-large btn-success\" *ngIf=\"item.file_url==''\" (click)=\"getCat(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Add</a>\r\n                                            <div *ngIf=\"item.file_url!=''\">\r\n                                                <a class=\"btn btn-xs btn-success\" href=\"{{item.file_url}}\" target=\"_blank\">Open</a>\r\n                                                <!-- <a class=\"btn btn-xs btn-success\">Edit</a><a class=\"btn btn-xs btn-success\">Delete</a> -->\r\n                                            </div>\r\n                                        </td>\r\n                                        <td>\r\n                                            <a class=\"btn btn-large btn-success\" *ngIf=\"item.lyrics_url==''\" (click)=\"getCat(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Add</a>\r\n                                            <div *ngIf=\"item.lyrics_url!=''\">\r\n                                                <a class=\"btn btn-xs btn-success\" href=\"{{item.lyrics_url}}\" target=\"_blank\">Open</a>\r\n                                                <!-- <a class=\"btn btn-xs btn-success\">Edit</a><a class=\"btn btn-xs btn-success\">Delete</a> -->\r\n                                            </div>\r\n                                        </td>\r\n                                        <td>\r\n                                            <a class=\"btn btn-large btn-success\" *ngIf=\"item.dance_url==''\" (click)=\"getCat(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Add</a>\r\n                                            <div *ngIf=\"item.dance_url!=''\">\r\n                                                <a class=\"btn btn-xs btn-success\" href=\"{{item.dance_url}}\" target=\"_blank\">Open</a>\r\n                                                <!-- <a class=\"btn btn-xs btn-success\">Edit</a><a class=\"btn btn-xs btn-success\">Delete</a> -->\r\n                                            </div>\r\n                                        </td>\r\n                                        <td><small>{{item.createdAt|date}}</small></td>\r\n                                        <td>\r\n                                            <button title=\"Edit\" id=\"modal-219933\" class=\"btn btn-xs btn-success\" (click)=\"getCat(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Edit</button>\r\n                                            <button title=\"Delete user\" class=\"btn btn-xs btn-danger\" (click)=\"delete(item)\">Delete</button>\r\n                                            <!-- <button title=\"Delete user\" id=\"modal-219934\" class=\"btn btn-xs btn-danger\" (click)=\"deleteMusic(item)\" href=\"#modal-container-219934\" data-toggle=\"modal\"><i class=\"fa fa-trash-o\"></i></button> -->\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                                <tfoot>\r\n                                    <tr>\r\n                                    </tr>\r\n                                </tfoot>\r\n                            </table>\r\n                            <button class=\"btn btn-xs btn-info\" (click)=\"loadmore()\"> <i class=\"fa fa-repeat\"></i>  load more</button>\r\n                        </div>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->\r\n<div class=\"modal fade\" id=\"modal-container-219933\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                            ×\r\n                        </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-6\">\r\n\r\n                        <!-- <div class=\"form-group\">\r\n                            <label for=\"\">Type</label>\r\n                            <select class=\"form-control\" id=\"\" [(ngModel)]=\"music.cat_type\" (change)=\"onTypeSelect($event.target.value)\">\r\n                                        <option [disabled]=\"true\" value=\"\">Select</option>\r\n                                        <option value=\"Sing\" ng-selected=\"Sing\" >Sing</option>\r\n                                        <option value=\"Dance\" ng-selected=\"Dance\">Dance</option>\r\n                            </select>\r\n                        </div> -->\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Category</label>\r\n                            <select class=\"form-control\" id=\"\" [(ngModel)]=\"music.pcat_id\">\r\n                                <option [disabled]=\"true\" value=\"\">Select</option>\r\n\r\n                                <option *ngFor=\"let item of category\" value=\"{{item.c_id}}\" >{{item.cat_name}}</option>\r\n                                         \r\n                            </select>\r\n                        </div>\r\n                        <!-- <div class=\"form-group\">\r\n                            <label for=\"\">Sub Category</label>\r\n                            <select class=\"form-control\" id=\"\" [(ngModel)]=\"music.cat_id\">\r\n                                <option [disabled]=\"true\" value=\"\">Select</option>\r\n\r\n                                <option *ngFor=\"let item of subcat\" value=\"{{item.c_id}}\" >{{item.cat_name}}</option>\r\n                                         \r\n                            </select>\r\n                        </div> -->\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Song Name</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"music.songs_name\" />\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Artist Name</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"music.artist_name\" />\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"col-sm-6\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"image\">Album Image Upload</label>\r\n                            <p>{{music.image_url | truncate : -25 : \"…\"}}</p>\r\n                            <input type=\"file\" name=\"albumimage\" (change)=\"onImageFileSelected($event)\" placeholder=\"Upload file\" id=\"image\" accept=\"image/*\">\r\n\r\n\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"karaoke\">Instrumental File Upload</label>\r\n                            <p>{{music.file_url | truncate : -25 : \"…\"}}</p>\r\n                            <input type=\"file\" name=\"karaokefile\" (change)=\"onMusicFileSelected($event)\" placeholder=\"Upload file\" id=\"karaoke\">\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"lyrics\">Lyrics File Upload</label>\r\n                            <p>{{music.lyrics_url | truncate : -25 : \"…\"}}</p>\r\n                            <input type=\"file\" name=\"lyricfile\" (change)=\"onlyricFileSelected($event)\" placeholder=\"Upload file\" id=\"lyrics\">\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"karaoke\">Dance File Upload</label>\r\n                            <p>{{music.dance_url | truncate : -25 : \"…\"}}</p>\r\n                            <input type=\"file\" name=\"dancefile\" (change)=\"onDanceFileSelected($event)\" placeholder=\"Upload file\" id=\"dance\">\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n                            Close\r\n                        </button>\r\n                <button type=\"button\" (click)=\"updateData()\" class=\"btn btn-primary\">\r\n                            Save changes\r\n                        </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- <div class=\"modal fade\" id=\"modal-container-219934\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                                    ×\r\n                                </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\" style=\"text-align: center;\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" (click)=\"deleteData()\" class=\"btn btn-primary\">\r\n                                    Delete\r\n                                </button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">\r\n                                    Cancel\r\n                                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div> -->"

        /***/
    }),

    /***/
    "./src/app/karaoke/karaoke.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return karaokeComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };





        var karaokeComponent = /** @class */ (function() {
            function karaokeComponent(http, _appservice, _message, location) {
                //this.search.email = ''        
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this.location = location;
                this.music = {};
                this.albumimage = {};
                this.karaokefile = {};
                this.lyricfile = {};
                this.dancefile = {};
            }
            karaokeComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.music = {};
                var dataarr = [],
                    query;
                this.size = 10;
                this.number = 1;
                this.admintoken = localStorage.getItem('admintoken');
                var obj = {
                    size: this.size,
                    number: this.number
                };
                this._appservice.getKaraokeList(obj, this.admintoken).subscribe(function(Response) {
                    console.log("123");
                    if (Response.response_code === 4002) {
                        _this._message.showWarning(Response.response_message);
                        localStorage.removeItem("admintoken");
                        localStorage.clear();
                        location.reload();
                    } else {
                        var result = Response.response_data;
                        for (var index = 0; index < result.length; index++) {
                            var dataarrval = {};
                            dataarrval['_id'] = result[index]._id;
                            dataarrval['songs_name'] = result[index].songs_name;
                            dataarrval['karaoke_length'] = result[index].karaoke_length;
                            dataarrval['artist_name'] = result[index].artist_name;
                            // dataarrval['cat_type'] = result[index].cat_type                 
                            dataarrval['isDeleted'] = result[index].isDeleted;
                            dataarrval['createdAt'] = result[index].createdAt;
                            dataarrval['pcat_id'] = result[index].pcat_id;
                            // dataarrval['cat_id'] = result[index].cat_id
                            dataarrval['file_url'] = result[index].file_url;
                            dataarrval['lyrics_url'] = result[index].lyrics_url;
                            dataarrval['image_url'] = result[index].image_url;
                            dataarrval['dance_url'] = result[index].dance_url;
                            dataarr.push(dataarrval);
                        }
                        _this.data = dataarr;
                        //  console.log(dataarr);
                    }
                }, function(Error) {});
            };
            karaokeComponent.prototype.getCat = function(str) {
                console.log(str);
                this.edit = true;
                this.pagetitle = 'Edit Music';
                this.music = str;
                this.getCategoryList();
            };
            karaokeComponent.prototype.updateData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                isSplChar_name = !re.test(this.music.pcat_name);
                if (this.music.songs_name == '' || this.music.songs_name == undefined) {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                if (this.music.songs_name.trim() == '') {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                if (isSplChar_name == true) {
                    errorMessage = 'Please enter characters only in name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                if (this.edit == true && flag == 0) {
                    console.log(this.music);
                    this._appservice.updateMusicData(this.music, this.albumimage, this.karaokefile, this.lyricfile, this.dancefile)
                        .subscribe(function(Response) {
                            console.log(Response);
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                            } else {
                                _this._message.showWarning(Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else if (this.edit == false && flag == 0) {
                    console.log(this.music);
                    this._appservice.addKaraokeLyric(this.music, this.albumimage, this.karaokefile, this.lyricfile, this.dancefile)
                        .subscribe(function(Response) {
                            console.log(Response);
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                                _this.ngOnInit();
                            } else {
                                _this._message.showWarning(Response.response_code + ':' + Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else {}
            };
            karaokeComponent.prototype.add = function() {
                console.log("add music");
                this.edit = false;
                this.pagetitle = 'Add Music';
                this.music = {};
                this.getCategoryList();
            };
            karaokeComponent.prototype.delete = function(str) {
                console.log(str);
                this.music = str;
                this.edit = true;
                this.deleteData();
            };
            karaokeComponent.prototype.deleteData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                // isSplChar_name = !re.test(this.cat.cat_name);
                this._appservice.deleteKaraoke(this.music, this.admintoken)
                    .subscribe(function(Response) {
                        console.log(Response);
                        if (Response.response_code == 2000) {
                            _this._message.showSuccess(Response.response_message);
                            _this.ngOnInit();
                        } else {
                            _this._message.showWarning(Response.response_message);
                            localStorage.clear();
                            location.reload();
                        }
                    }, function(Error) {
                        _this._message.showError(Error.message);
                    });
            };
            karaokeComponent.prototype.loadmore = function() {
                var _this = this;
                var dataarr = [];
                this.number = this.number + 1;
                this.admintoken = localStorage.getItem('admintoken');
                // var obj = {
                //     name: this.cat_name,
                //     number: this.number,
                //     email: this.search.email,
                //     dob: this.search.dob,
                //     gender: this.search.gender
                // }
                var obj = {
                    size: this.size,
                    number: this.number
                };
                // console.log(obj)
                //console.log('aloke');
                this._appservice.getKaraokeList(obj, this.admintoken).subscribe(function(Response) {
                    console.log(Response);
                    var result = Response.response_data;
                    // console.log(result);
                    for (var index = 0; index < result.length; index++) {
                        var dataarrval = {};
                        dataarrval['_id'] = result[index]._id;
                        dataarrval['songs_name'] = result[index].songs_name;
                        dataarrval['karaoke_length'] = result[index].karaoke_length;
                        dataarrval['artist_name'] = result[index].artist_name;
                        dataarrval['isDeleted'] = result[index].isDeleted;
                        dataarrval['createdAt'] = result[index].createdAt;
                        dataarrval['pcat_id'] = result[index].pcat_id;
                        dataarrval['file_url'] = result[index].file_url;
                        dataarrval['lyrics_url'] = result[index].lyrics_url;
                        dataarrval['image_url'] = result[index].image_url;
                        dataarrval['dance_url'] = result[index].dance_url;
                        _this.data.push(dataarrval);
                    }
                    //  console.log(dataarr);
                }, function(Error) {});
            };
            karaokeComponent.prototype.onTypeSelect = function(type) {
                var _this = this;
                console.log(type);
                var catarr = [],
                    query;
                this._appservice.getAllCategories({}).subscribe(function(Response) {
                    var result = Response.response_data;
                    console.log(result);
                    for (var index = 0; index < result.length; index++) {
                        var catarrval = {};
                        catarrval['cat_name'] = result[index].cat_name;
                        catarrval['type'] = result[index].type;
                        catarrval['isDeleted'] = result[index].isDeleted;
                        catarrval['createdAt'] = result[index].createdAt;
                        catarrval['c_id'] = result[index]._id;
                        catarr.push(catarrval);
                    }
                    // this.category = catarr.filter((item)=> item.type == type);
                    _this.category = catarr;
                    //  console.log(catarr);
                }, function(Error) {});
            };
            karaokeComponent.prototype.getCategoryList = function() {
                var _this = this;
                var catarr = [],
                    query;
                this._appservice.getAllCategories({}).subscribe(function(Response) {
                    var result = Response.response_data;
                    for (var index = 0; index < result.length; index++) {
                        var catarrval = {};
                        catarrval['cat_name'] = result[index].cat_name;
                        catarrval['isDeleted'] = result[index].isDeleted;
                        catarrval['createdAt'] = result[index].createdAt;
                        catarrval['c_id'] = result[index]._id;
                        catarr.push(catarrval);
                    }
                    // this.category = catarr.filter((item)=> item.type == type);
                    _this.category = catarr;
                    console.log(_this.category);
                }, function(Error) {});
            };
            karaokeComponent.prototype.onGenreSelect = function(pcat_id) {
                var _this = this;
                // console.log(pcat_id);  
                this.admintoken = localStorage.getItem('admintoken');
                var obj = {
                    pcat_id: pcat_id
                };
                var catarr = [],
                    query;
                this._appservice.getSubCategories(obj, this.admintoken).subscribe(function(Response) {
                    // console.log(Response);
                    var result = Response.response_data;
                    console.log(result);
                    for (var index = 0; index < result.length; index++) {
                        var catarrval = {};
                        catarrval['cat_name'] = result[index].cat_name;
                        catarrval['type'] = result[index].type;
                        catarrval['isDeleted'] = result[index].isDeleted;
                        catarrval['createdAt'] = result[index].createdAt;
                        catarrval['c_id'] = result[index]._id;
                        catarrval['p_id'] = result[index].p_id;
                        catarr.push(catarrval);
                    }
                    _this.subcat = catarr.filter(function(item) { return item.p_id == pcat_id; });
                    // this.category = catarr
                    console.log(_this.subcat);
                }, function(Error) {});
            };
            karaokeComponent.prototype.onImageFileSelected = function(fileInput) {
                // console.log(fileInput);       
                var myFile = fileInput.target.files[0];
                this.albumimage = myFile;
            };
            karaokeComponent.prototype.onMusicFileSelected = function(fileInput) {
                // console.log(fileInput);
                var myFile = fileInput.target.files[0];
                this.karaokefile = myFile;
            };
            karaokeComponent.prototype.onlyricFileSelected = function(fileInput) {
                // console.log(fileInput);        
                var myFile = fileInput.target.files[0];
                this.lyricfile = myFile;
            };
            karaokeComponent.prototype.onDanceFileSelected = function(fileInput) {
                // console.log(fileInput);
                var myFile = fileInput.target.files[0];
                this.dancefile = myFile;
            };
            karaokeComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'karaoke',
                    styles: [__webpack_require__("./src/app/karaoke/karaoke.component.css")],
                    template: __webpack_require__("./src/app/karaoke/karaoke.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]
                ])
            ], karaokeComponent);
            return karaokeComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/login/login.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/login/login.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"login-box\">\r\n    <div class=\"login-logo\">\r\n        <b>Musical</b>Admin\r\n    </div>\r\n    <!-- /.login-logo -->\r\n    <div class=\"login-box-body\">\r\n        <p class=\"login-box-msg\">Sign in to start your session</p>\r\n\r\n        <form>\r\n            <div class=\"form-group has-feedback\">\r\n                <label>Email:</label>\r\n                <input type=\"email\" name=\"email\" placeholder=\"Email\" class=\"form-control\" [(ngModel)]=\"loginData.email\">\r\n            </div>\r\n            <div class=\"form-group has-feedback\">\r\n                <label>Password:</label>\r\n                <input type=\"password\" name=\"password\" placeholder=\"Password\" class=\"form-control\" [(ngModel)]=\"loginData.password\">\r\n            </div>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"doLogin()\">Login</button>\r\n            <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClick()\">onClick</button> -->\r\n        </form>\r\n\r\n        <div class=\"social-auth-links text-center\">\r\n            <a href=\"#forgotpasswordmodal\" data-toggle=\"modal\">I forgot my password</a><br>\r\n\r\n        </div>\r\n        <!-- /.social-auth-links -->\r\n\r\n\r\n    </div>\r\n    <!-- /.login-box-body -->\r\n</div>\r\n<!-- /.login-box -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!-- /.content-wrapper -->\r\n<div class=\"modal fade\" id=\"forgotpasswordmodal\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n            ×\r\n        </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                    Forgot password\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Email</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"forgotpassadmin.email\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n            Close\r\n        </button>\r\n                <button type=\"button\" (click)=\"forgotpassLinksend()\" class=\"btn btn-primary\">\r\n            Save changes\r\n        </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

        /***/
    }),

    /***/
    "./src/app/login/login.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* unused harmony export LoginData */
        /* unused harmony export forgotpassAdmin */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };






        var LoginData = /** @class */ (function() {
            function LoginData() {}
            return LoginData;
        }());

        var forgotpassAdmin = /** @class */ (function() {
            function forgotpassAdmin() {}
            return forgotpassAdmin;
        }());

        var LoginComponent = /** @class */ (function() {
            function LoginComponent(http, _appservice, _message, _router, broadcaster) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this._router = _router;
                this.broadcaster = broadcaster;
                this.notify = new __WEBPACK_IMPORTED_MODULE_4__angular_core__["EventEmitter"]();
                this.valiemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            }
            LoginComponent.prototype.ngOnInit = function() {
                this.loginData = {
                    email: '',
                    password: ''
                };
                this.forgotpassadmin = {
                    email: ''
                };
            };
            LoginComponent.prototype.doLogin = function() {
                var _this = this;
                if (this.loginData.email.trim() == '' || !this.valiemail.test(this.loginData.email)) {
                    var errorMessage = 'Invalid email';
                    this._message.showError(errorMessage);
                } else if (this.loginData.password == '') {
                    var errorMessage = 'Invalid password';
                    this._message.showError(errorMessage);
                } else if (this.loginData.password.length < 6) {
                    var errorMessage = 'Invalid password';
                    this._message.showError(errorMessage);
                } else {
                    this._appservice.doLogin(this.loginData)
                        .subscribe(function(Response) {
                            console.log(Response.token);
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                                localStorage.removeItem("admintoken");
                                localStorage.setItem('admintoken', Response.token);
                                _this.notify.emit('loginSuccess');
                                location.reload();
                            } else {
                                _this._message.showError(Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                }
            };
            LoginComponent.prototype.forgotpassLinksend = function() {
                var _this = this;
                if (this.forgotpassadmin.email.trim() == '' || !this.valiemail.test(this.forgotpassadmin.email)) {
                    var errorMessage = 'Invalid email';
                    this._message.showError(errorMessage);
                } else {
                    this._appservice.forgotpassLinksend(this.forgotpassadmin)
                        .subscribe(function(Response) {
                            if (Response.success) {
                                _this._message.showSuccess(Response.message);
                            } else {
                                _this._message.showError(Response.message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                }
            };
            LoginComponent.prototype.onClick = function() {
                console.log('onClick');
                this.notify.emit('Click from nested component');
            };
            __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Input"])(),
                __metadata("design:type", String)
            ], LoginComponent.prototype, "title", void 0);
            __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Output"])(),
                __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__angular_core__["EventEmitter"])
            ], LoginComponent.prototype, "notify", void 0);
            LoginComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"])({
                    styles: [__webpack_require__("./src/app/login/login.component.css")],
                    template: __webpack_require__("./src/app/login/login.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */ ],
                    __WEBPACK_IMPORTED_MODULE_5__broadcaster__["a" /* Broadcaster */ ]
                ])
            ], LoginComponent);
            return LoginComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/privacy/privacy.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/privacy/privacy.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<!-- <div class=\"wrapper\" style=\"background-color:#fff; overflow:inherit; position: relative;\"> -->\r\n<div class=\"content-wrapper\" style=\"background-color:#fff;margin-left:0\">\r\n<div class=\"container\" >\r\n\t<div class=\"content\">\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"span16 \">\r\n\t\t\t\t\t<div class=\"page-header\">\r\n\t\t\t\t\t\t\t<h2 style=\"text-decoration-color: red;\" >{{pagetitle}}</h2>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"panel-body\" style=\"word-break:break-word\" [innerHTML]=\"pagecontent\">                \r\n\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</div>"

        /***/
    }),

    /***/
    "./src/app/privacy/privacy.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };






        var PrivacyComponent = /** @class */ (function() {
            function PrivacyComponent(http, _appservice, _message, _router, broadcaster) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this._router = _router;
                this.broadcaster = broadcaster;
                this.pagetitle = '';
                this.pagecontent = '';
            }
            PrivacyComponent.prototype.ngOnInit = function() {
                var _this = this;
                var obj = { page: "privacy" };
                this._appservice.getCmsPage(obj).subscribe(function(Response) {
                    console.log(Response);
                    _this.pagetitle = 'Privacy Policy';
                    _this.pagecontent = Response.response_data.content;
                }, function(Error) {});
            };
            PrivacyComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'privacy',
                    styles: [__webpack_require__("./src/app/privacy/privacy.component.css")],
                    template: __webpack_require__("./src/app/privacy/privacy.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ],
                    __WEBPACK_IMPORTED_MODULE_5__broadcaster__["a" /* Broadcaster */ ]
                ])
            ], PrivacyComponent);
            return PrivacyComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/subcategories/subcategories.component.css":
    /***/
        (function(module, exports) {

        module.exports = " .adduser {\r\n     float: right;\r\n }"

        /***/
    }),

    /***/
    "./src/app/subcategories/subcategories.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\">\r\n    <!-- Content Header (Page header) -->\r\n    <section class=\"content-header\">\r\n    </section>\r\n    <!-- Main content -->\r\n    <section class=\"content\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <div class=\"box\">\r\n                    <div class=\"box-header\">\r\n                        <h5 class=\"box-title\">SubCategory Management</h5>\r\n                        <button title=\"Add new user\" id=\"modal-219933\" pull-right class=\"btn btn-xs btn-danger adduser\" (click)=\"add()\" href=\"#modal-container-219933\" data-toggle=\"modal\">\r\n                            <i class=\"fa fa-user\"></i>\r\n                            Add Category</button>\r\n                    </div>\r\n                    <!-- /.box-header -->\r\n                    <div class=\"box-body\">\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-1\"><label>Search:</label></div>\r\n                            <div class=\"col-sm-2\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"search\" class=\"form-control\" title=\"Enter Category name\" placeholder=\"Keyword\" [(ngModel)]=\"keyword\" />\r\n                                </div>\r\n                            </div>\r\n                            <!--     <div class=\"col-sm-2\">\r\n                                <input type=\"search\" class=\"form-control\" title=\"Enter user email\" placeholder=\"User Email\" [(ngModel)]=\"search.email\" />\r\n                            </div>\r\n                            <div class=\"col-sm-1\">\r\n                                <select id=\"\" [(ngModel)]=\"search.dob\" class=\"form-control\">\r\n                                                <option [disabled]=\"true\" value=\"\">year</option>\r\n                                                <option  *ngFor=\"let list of dobyear\" value=\"{{list}}\">  {{list}}</option>        \r\n                                            </select>\r\n                            </div>\r\n                            <div class=\"col-sm-1\">\r\n                                <select id=\"\" [(ngModel)]=\"search.gender\" class=\"form-control\">\r\n                                                <option [disabled]=\"true\" value=\"\">Gender</option>\r\n                                                <option value=\"Male\">Male</option>\r\n                                                <option value=\"Female\">Female</option>\r\n                                            </select>\r\n                            </div> -->\r\n\r\n                            <!--  <div class=\"col-sm-2\">\r\n                                <button title=\"Search\" class=\"btn btn-info\" (click)=\"ngOnInit()\"><i class=\"fa fa-search\"></i> Search</button>\r\n                                <button title=\"Clear Search\" class=\"btn btn-dark\" (click)=\"clear()\">   <i class=\"fa fa-remove\"></i>  clear</button>\r\n                            </div> -->\r\n                        </div>\r\n\r\n                        <div class=\"table-responsive\">\r\n                            <table class=\"table table-bordered  table-condensed table-hover\">\r\n                                <thead>\r\n                                    <tr>\r\n\r\n                                        <th>\r\n                                            Name\r\n                                        </th>\r\n                                        <th>\r\n                                            Type\r\n                                        </th>\r\n                                        <th>\r\n                                            Parent Category\r\n                                        </th>\r\n                                        <th>\r\n                                            <small> Created</small>\r\n                                        </th>\r\n                                        <th>\r\n                                            Action\r\n                                        </th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of data | search:'cat_name,type':keyword\">\r\n\r\n                                        <td>{{item.cat_name}}\r\n                                            <!--  <span *ngIf=\"item.isBlocked==false\" title=\"Active Users\" class=\"text-success fa fa-check-circle\"> </span>\r\n                                            <span *ngIf=\"item.isBlocked==true\" title=\"Blocked Users\" class=\"text-danger fa fa-ban\"> </span> --></td>\r\n                                        <td>{{item.type}}</td>\r\n                                        <td>{{item.pcat_name}}</td>\r\n                                        <td><small>{{item.createdAt|date}}</small></td>\r\n                                        <td>\r\n                                            <button title=\"Edit user\" id=\"modal-219933\" class=\"btn btn-xs btn-success\" (click)=\"getCat(item)\" href=\"#modal-container-219933\" data-toggle=\"modal\">Edit</button>\r\n                                            <button title=\"Delete user\" class=\"btn btn-xs btn-danger\" (click)=\"delete(item)\">Delete</button>\r\n                                            <!-- <button title=\"Delete user\" id=\"modal-219934\" class=\"btn btn-xs btn-danger\" (click)=\"deleteCat(item)\" href=\"#modal-container-219934\" data-toggle=\"modal\"><i class=\"fa fa-trash-o\"></i></button> -->\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                                <tfoot>\r\n                                    <tr>\r\n                                    </tr>\r\n                                </tfoot>\r\n                            </table>\r\n                            <!-- <button class=\"btn btn-xs btn-info\" (click)=\"loadmore()\"> <i class=\"fa fa-repeat\"></i>  load more</button> -->\r\n                        </div>\r\n                    </div>\r\n                    <!-- /.box-body -->\r\n                </div>\r\n                <!-- /.box -->\r\n            </div>\r\n            <!-- /.col -->\r\n        </div>\r\n        <!-- /.row -->\r\n    </section>\r\n    <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->\r\n<div class=\"modal fade\" id=\"modal-container-219933\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                            ×\r\n                        </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-sm-12\">\r\n\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Type</label>\r\n                            <select class=\"form-control\" id=\"\" [(ngModel)]=\"cat.type\" (change)=\"onSelect($event.target.value)\">\r\n                                        <option [disabled]=\"true\" value=\"\">Select</option>\r\n                                        <option value=\"Sing\" ng-selected=\"Sing\" >Sing</option>\r\n                                        <option value=\"Dance\" ng-selected=\"Dance\">Dance</option>\r\n                            </select>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Parent Category</label>\r\n                            <select class=\"form-control\" id=\"\" [(ngModel)]=\"cat.p_id\">\r\n                                <option [disabled]=\"true\" value=\"\">Select</option>\r\n\r\n                                <option *ngFor=\"let item of category\" value=\"{{item.c_id}}\" >{{item.cat_name}}</option>\r\n                                         \r\n                            </select>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\">Category Name</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"\" [(ngModel)]=\"cat.cat_name\" />\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n                            Close\r\n                        </button>\r\n                <button type=\"button\" (click)=\"updateData()\" class=\"btn btn-primary\">\r\n                            Save changes\r\n                        </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- <div class=\"modal fade\" id=\"modal-container-219934\" data-keyboard=\"false\" data-backdrop=\"static\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                                        ×\r\n                                    </button>\r\n                <h4 class=\"modal-title\" id=\"myModalLabel\" style=\"text-align: center;\">\r\n                    {{pagetitle}}\r\n                </h4>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" (click)=\"deleteData()\" class=\"btn btn-primary\">\r\n                                        Delete\r\n                                    </button>\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">\r\n                                        Cancel\r\n                                    </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div> -->"

        /***/
    }),

    /***/
    "./src/app/subcategories/subcategories.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return SubCategoryComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };




        var SubCategoryComponent = /** @class */ (function() {
            function SubCategoryComponent(http, _appservice, _message) {
                //this.search.email = ''        
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this.category = [];
                this.cat = {};
            }
            SubCategoryComponent.prototype.ngOnInit = function() {
                var _this = this;
                console.log("start-subcategory");
                //    console.log(this.search)
                this.cat = {};
                var catarr = [],
                    query;
                this.size = 10;
                this.number = 1;
                this.admintoken = localStorage.getItem('admintoken');
                // var obj = {
                //     pcat_id: "",
                //     p_id: "",
                //     cat_name: ""
                // };
                var obj = {};
                // console.log(obj)
                //console.log('aloke');
                this._appservice.getSubCategories(obj, this.admintoken).subscribe(function(Response) {
                    console.log(Response);
                    if (Response.response_code === 2000) {
                        var result = Response.response_data;
                        for (var index = 0; index < result.length; index++) {
                            var catarrval = {};
                            catarrval['cat_name'] = result[index].cat_name;
                            catarrval['type'] = result[index].type;
                            catarrval['isDeleted'] = result[index].isDeleted;
                            catarrval['createdAt'] = result[index].createdAt;
                            catarrval['cat_id'] = result[index]._id;
                            catarrval['p_id'] = result[index].p_id;
                            catarrval['pcat_name'] = result[index].pcat_name;
                            catarr.push(catarrval);
                        }
                        _this.data = catarr;
                        //  console.log(catarr);
                    } else if (Response.response_code === 4002) {
                        _this._message.showWarning(Response.response_message);
                        localStorage.removeItem("admintoken");
                        localStorage.clear();
                        location.reload();
                        // this.router.navigate(['/login']);
                    } else {
                        _this._message.showWarning(Response.response_message);
                    }
                }, function(Error) {});
            };
            SubCategoryComponent.prototype.onSelect = function(type) {
                var _this = this;
                console.log(type);
                //var obj={type:type};
                var catarr = [],
                    query;
                this._appservice.getAllCategories({}).subscribe(function(Response) {
                    console.log(Response);
                    if (Response.response_code === 2000) {
                        var result = Response.response_data;
                        for (var index = 0; index < result.length; index++) {
                            var catarrval = {};
                            catarrval['cat_name'] = result[index].cat_name;
                            catarrval['type'] = result[index].type;
                            catarrval['isDeleted'] = result[index].isDeleted;
                            catarrval['createdAt'] = result[index].createdAt;
                            catarrval['c_id'] = result[index]._id;
                            catarr.push(catarrval);
                        }
                        _this.category = catarr.filter(function(item) { return item.type == type; });
                        // this.category = catarr
                        console.log(catarr);
                    } else {
                        _this._message.showWarning(Response.response_message);
                    }
                }, function(Error) {});
            };
            SubCategoryComponent.prototype.getCat = function(str) {
                var _this = this;
                console.log(str);
                this.edit = true;
                this.pagetitle = 'Edit Category';
                var catarr = [],
                    query;
                this._appservice.getAllCategories({}).subscribe(function(Response) {
                    // console.log(Response);
                    var result = Response.response_data;
                    for (var index = 0; index < result.length; index++) {
                        var catarrval = {};
                        catarrval['cat_name'] = result[index].cat_name;
                        catarrval['type'] = result[index].type;
                        catarrval['isDeleted'] = result[index].isDeleted;
                        catarrval['createdAt'] = result[index].createdAt;
                        catarrval['c_id'] = result[index]._id;
                        catarr.push(catarrval);
                    }
                    // this.category = catarr;
                    _this.category = catarr.filter(function(item) { return item.type == str.type; });
                    // this.category = catarr
                    console.log(catarr);
                }, function(Error) {});
                this.cat = str;
            };
            SubCategoryComponent.prototype.updateData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                isSplChar_name = !re.test(this.cat.cat_name);
                if (this.cat.cat_name == '' || this.cat.cat_name == undefined) {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                if (this.cat.cat_name.trim() == '') {
                    errorMessage = 'Please enter name';
                    flag = 1;
                    this._message.showError(errorMessage);
                    console.log(errorMessage);
                    return false;
                }
                // if (isSplChar_name == true) {
                //     errorMessage = 'Please enter characters only in name';
                //     flag = 1;
                //     this._message.showError(errorMessage)
                //     console.log(errorMessage)
                //     return false;
                // }
                if (this.edit == true && flag == 0) {
                    this._appservice.updateSubCatData(this.cat, this.admintoken)
                        .subscribe(function(Response) {
                            console.log(Response);
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                            } else {
                                _this._message.showWarning(Response.response_message);
                                localStorage.clear();
                                location.reload();
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else if (this.edit == false && flag == 0) {
                    console.log(this.cat);
                    this._appservice.addSubCategory(this.cat)
                        .subscribe(function(Response) {
                            console.log(Response);
                            if (Response.response_code == 2000) {
                                _this._message.showSuccess(Response.response_message);
                                _this.ngOnInit();
                            } else {
                                _this._message.showWarning(Response.response_code + ':' + Response.response_message);
                            }
                        }, function(Error) {
                            _this._message.showError(Error.message);
                        });
                } else {}
            };
            SubCategoryComponent.prototype.delete = function(str) {
                console.log(str);
                this.cat = str;
                this.edit = true;
                this.deleteData();
            };
            SubCategoryComponent.prototype.deleteData = function() {
                var _this = this;
                var flag = 0,
                    errorMessage, re, isSplChar_name;
                re = /^([a-zA-Z ]+)$/;
                // isSplChar_name = !re.test(this.cat.cat_name);
                this._appservice.deleteSubCatData(this.cat, this.admintoken)
                    .subscribe(function(Response) {
                        console.log(Response);
                        if (Response.response_code == 2000) {
                            _this._message.showSuccess(Response.response_message);
                            _this.ngOnInit();
                        } else {
                            _this._message.showWarning(Response.response_message);
                            localStorage.clear();
                            location.reload();
                        }
                    }, function(Error) {
                        _this._message.showError(Error.message);
                    });
            };
            SubCategoryComponent.prototype.add = function() {
                this.edit = false;
                this.pagetitle = 'Add Category';
                console.log(this.cat);
                console.log("add function");
                this.cat = {};
                // this._appservice.getCountries().subscribe((response) => {
                //     this.countries = response.data;
                //     console.log(response.data);
                // }, (error) => {
                //     console.log(error);
                // });
            };
            SubCategoryComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'subcategories',
                    styles: [__webpack_require__("./src/app/subcategories/subcategories.component.css")],
                    template: __webpack_require__("./src/app/subcategories/subcategories.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_1__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_message_services__["a" /* MessageService */ ]
                ])
            ], SubCategoryComponent);
            return SubCategoryComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/terms/terms.component.css":
    /***/
        (function(module, exports) {

        module.exports = ""

        /***/
    }),

    /***/
    "./src/app/terms/terms.component.html":
    /***/
        (function(module, exports) {

        module.exports = "<div class=\"content-wrapper\" style=\"background-color:#fff;margin-left:0\">\r\n<div class=\"container\" >\r\n\t<div class=\"content\">\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"span16 \">\r\n\t\t\t\t\t<div class=\"page-header\">\r\n\t\t\t\t\t\t\t<h2 style=\"text-decoration-color: red;\" >{{pagetitle}}</h2>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"panel-body\" style=\"word-break:break-word\" [innerHTML]=\"pagecontent\">                \r\n\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

        /***/
    }),

    /***/
    "./src/app/terms/terms.component.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return TermsnConditionsComponent; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__ = __webpack_require__("./src/app/userservice/user.service.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__ = __webpack_require__("./src/app/userservice/message.services.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__broadcaster__ = __webpack_require__("./src/app/broadcaster.ts");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };






        var TermsnConditionsComponent = /** @class */ (function() {
            function TermsnConditionsComponent(http, _appservice, _message, _router, broadcaster) {
                this.http = http;
                this._appservice = _appservice;
                this._message = _message;
                this._router = _router;
                this.broadcaster = broadcaster;
                this.pagetitle = '';
                this.pagecontent = '';
            }
            TermsnConditionsComponent.prototype.ngOnInit = function() {
                var _this = this;
                var obj = { page: "terms" };
                this._appservice.getCmsPage(obj).subscribe(function(Response) {
                    console.log(Response);
                    _this.pagetitle = 'Terms & Conditions';
                    _this.pagecontent = Response.response_data.content;
                }, function(Error) {});
            };
            TermsnConditionsComponent = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
                    selector: 'terms',
                    styles: [__webpack_require__("./src/app/terms/terms.component.css")],
                    template: __webpack_require__("./src/app/terms/terms.component.html")
                }),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */ ],
                    __WEBPACK_IMPORTED_MODULE_2__userservice_user_service__["a" /* UserService */ ],
                    __WEBPACK_IMPORTED_MODULE_3__userservice_message_services__["a" /* MessageService */ ],
                    __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */ ],
                    __WEBPACK_IMPORTED_MODULE_5__broadcaster__["a" /* Broadcaster */ ]
                ])
            ], TermsnConditionsComponent);
            return TermsnConditionsComponent;
        }());



        /***/
    }),

    /***/
    "./src/app/userservice/message.services.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__ = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__);
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };



        var MessageService = /** @class */ (function() {
            function MessageService(toastr) {
                this.toastr = toastr;
            }
            MessageService.prototype.showSuccess = function(msessage) {
                this.toastr.success(msessage);
            };
            MessageService.prototype.showError = function(msessage) {
                this.toastr.error(msessage);
            };
            MessageService.prototype.showWarning = function(msessage) {
                this.toastr.warning(msessage);
            };
            MessageService.prototype.showInfo = function(msessage) {
                this.toastr.info(msessage);
            };
            MessageService = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"]])
            ], MessageService);
            return MessageService;
        }());



        /***/
    }),

    /***/
    "./src/app/userservice/user.service.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("./config.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
        var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
            var c = arguments.length,
                r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        var __metadata = (this && this.__metadata) || function(k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };







        var UserService = /** @class */ (function() {
            function UserService(_http) {
                this._http = _http;
            }
            UserService.prototype.getToken = function() {
                return localStorage.getItem('admintoken');
            };
            UserService.prototype.authHeader = function(headers) {
                //return new Headers({'x-access-token': this.getToken()});
                headers.append('x-access-token', this.getToken());
            };
            UserService.prototype._errorHandler = function(error) {
                return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */ ].throw(error.json() || "Server Error");
            };
            UserService.prototype.getAllUser = function(data, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                return this._http.get(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'userList' + '?number=' + data.number, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.addUser = function(value) {
                // console.log(value);
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'addUser';
                console.log(URL);
                console.log(options);
                console.log("---------------");
                return this._http.post(URL, value, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.getCountries = function() {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                this.authHeader(headers);
                return this._http.get(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'countries', { headers: headers })
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.doLogin = function(loginData) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'adminLogin';
                // alert(URL);
                //console.log(URL);
                return this._http.post(URL, loginData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.forgotpassLinksend = function(forgotpassadmin) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'forgetpassLinksend';
                return this._http.post(URL, forgotpassadmin, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.forgotPassword = function(forgotPasswordData) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'forgotPassword';
                return this._http.post(URL, forgotPasswordData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.updateUserData = function(updateData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'updateUserData';
                return this._http.post(URL, updateData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.deleteUserData = function(deleteUserData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'deleteUserData';
                return this._http.post(URL, deleteUserData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.updatePassword = function(updatePasswordData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'updatePassword?token=' + admintoken;
                return this._http.post(URL, updatePasswordData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.categoryListByType = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                // this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'categoryListByType';
                return this._http.post(URL, data, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.getAllCategories = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                //this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                return this._http.get(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'categorylist', options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.getSubCategories = function(catData, admintoken) {
                console.log(catData);
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                return this._http.post(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'subCategorylist', catData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.addCategory = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'addCategory';
                return this._http.post(URL, data, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.addSubCategory = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                // this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'addSubCategory';
                return this._http.post(URL, data, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.deleteSubCatData = function(deleteData, admintoken) {
                console.log("123");
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'deleteSubCategory';
                console.log(URL);
                return this._http.post(URL, deleteData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.updateCatData = function(updateData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'updateCategory';
                return this._http.post(URL, updateData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.deleteCatData = function(deleteData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'deleteCategory';
                console.log(URL);
                return this._http.post(URL, deleteData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.updateSubCatData = function(updateData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'updateSubCategory';
                return this._http.post(URL, updateData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.getKaraokeList = function(data, admintoken) {
                // console.log(data);
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                // return this._http.get(CONFIG.API_ENDPOINT + 'musicList', options)
                //   .map((response: Response) => response.json())
                //   .catch(this._errorHandler);
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'musicList' + '?number=' + data.number;
                // console.log(URL);
                return this._http.get(URL, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.deleteKaraoke = function(deleteData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'deleteMusic';
                console.log(URL);
                return this._http.post(URL, deleteData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.addKaraokeLyric = function(value, albumimage, karaokefile, lyricfile, dancefile) {
                //let headers = new Headers({ 'Content-Type': 'application/json' });
                //let options = new RequestOptions({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'addMusic';
                //console.log(file['File']);
                //value.files = file['File'];
                var formData = new FormData();
                // console.log(albumimage);
                // alert();
                formData.append('albumimage', albumimage);
                formData.append('karaokefile', karaokefile);
                formData.append('lyricfile', lyricfile);
                formData.append('dancefile', dancefile);
                formData.append('songs_name', value.songs_name);
                formData.append('artist_name', value.artist_name);
                formData.append('pcat_id', value.pcat_id);
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                /* No need to include Content-Type in Angular 4 */
                //   headers.append('Content-Type', 'multipart/form-data');
                headers.append('Accept', 'application/json');
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                return this._http.post(URL, formData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.updateMusicData = function(value, albumimage, karaokefile, lyricfile, dancefile) {
                //let headers = new Headers({ 'Content-Type': 'application/json' });
                //let options = new RequestOptions({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'updateMusic';
                //console.log(file['File']);
                //value.files = file['File'];
                var formData = new FormData();
                // formData.append('_id', value._id); 
                for (var key in value) {
                    formData.append(key, value[key]);
                }
                formData.append('albumimage', albumimage);
                formData.append('karaokefile', karaokefile);
                formData.append('lyricfile', lyricfile);
                formData.append('dancefile', dancefile);
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                this.authHeader(headers);
                /* No need to include Content-Type in Angular 4 */
                //   headers.append('Content-Type', 'multipart/form-data');
                headers.append('Accept', 'application/json');
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                return this._http.post(URL, formData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            /* For CMS */
            UserService.prototype.getAllCms = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                return this._http.get(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'listCms?size=' + data.size + '&number=' + data.number, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.getCmsPage = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                return this._http.get(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'getCMSPage/' + data.page, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.updateCmsData = function(updateData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'updateCmsData';
                return this._http.post(URL, updateData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.deleteCms = function(deleteData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                this.authHeader(headers);
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'deleteCms';
                console.log(URL);
                return this._http.post(URL, deleteData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService.prototype.addCmsData = function(updateData, admintoken) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'addCMS';
                return this._http.post(URL, updateData, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            /* end of CMS */
            //sreachIngredient
            UserService.prototype.sreachIngredient = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                this.authHeader(headers);
                return this._http.get(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'searchingredient?q=' + data.name + '&size=' + data.size + '&number=' + data.number, { headers: headers })
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            /**
             * delete Recipe
             */
            UserService.prototype.deleteRecipe = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */ ]({ headers: headers });
                var URL = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'deleteRecepie?token=' + this.getToken();
                return this._http.post(URL, data, options)
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            /*
            *
            *searchuser
             
            *
            */
            UserService.prototype.searchuser = function(data) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */ ]({ 'Accept': 'application/json' });
                this.authHeader(headers);
                return this._http.get(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* CONFIG */ ].API_ENDPOINT + 'searchuser?name=' + data.name, { headers: headers })
                    .map(function(response) { return response.json(); })
                    .catch(this._errorHandler);
            };
            UserService = __decorate([
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
                __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */ ]])
            ], UserService);
            return UserService;
        }());



        /***/
    }),

    /***/
    "./src/environments/environment.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
        // The file contents for the current environment will overwrite these during build.
        // The build system defaults to the dev environment which uses `environment.ts`, but if you do
        // `ng build --env=prod` then `environment.prod.ts` will be used instead.
        // The list of which env maps to which file can be found in `.angular-cli.json`.
        var environment = {
            production: false
        };


        /***/
    }),

    /***/
    "./src/main.ts":
    /***/
        (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




        if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */ ].production) {
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
        }
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */ ])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */ ]);


        /***/
    }),

    /***/
    0:
    /***/
        (function(module, exports, __webpack_require__) {

        module.exports = __webpack_require__("./src/main.ts");


        /***/
    })

}, [0]);
//# sourceMappingURL=main.bundle.js.map