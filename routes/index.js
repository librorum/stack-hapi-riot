'use strict';

// Declared Views
const UserView 			 	 	 = require('../components/user/user_view');
const IndexView 		 		 = require('../components/index/index_view');
const LoginView 		 		 = require('../components/login/login_view');
const MapsView  		 		 = require('../components/maps/maps_view');
const TestView		 			 = require('../components/test_route/test_route_view');

// Declared Controllers
const SecurityController = require('../components/security/security_controller');
const UserController  	 = require('../components/user/user_controller');

exports.endpoints = [

	// Views
	{method: 'GET',    	path: '/',													config: IndexView.index},
	{method: 'GET',    	path: '/login',											config: LoginView.index},
	{method: 'GET',    	path: '/test-route',								config: TestView.index},
	{method: 'GET',    	path: '/user/add',									config: UserView.add},
	{method: 'GET',    	path: '/maps',											config: MapsView.index},

	// Controllers
	{method: 'POST',    path: '/register',									config: UserController.add},
	{method: 'POST',    path: '/login',											config: SecurityController.login},
	{method: 'POST',    path: '/logout',										config: SecurityController.logout}

];
