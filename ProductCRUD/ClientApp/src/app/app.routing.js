"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var produtos_1 = require("./produtos");
var login_1 = require("./login");
var helpers_1 = require("./helpers");
var routes = [
    { path: '', component: produtos_1.ProdutosComponent, canActivate: [helpers_1.AuthGuard] },
    { path: 'login', component: login_1.LoginComponent },
    // caso contrario redireciona para home
    { path: '**', redirectTo: '' }
];
exports.appRoutingModule = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map