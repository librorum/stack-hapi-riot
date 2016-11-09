'use strict';

// Declared Views
const UserView 			 	 	 = require('../components/user/view');
const IndexView 		 		 = require('../components/index/view');
const LoginView 		 		 = require('../components/login/view');
const MapsView  		 		 = require('../components/maps/view');
const TestView		 			 = require('../components/test_route/view');

// Declared Controllers
const SecurityController = require('../components/security/controller');
const UserController  	 = require('../components/user/controller');

exports.endpoints = [

	// Views
	{method: 'GET',    	path: '/',													config: IndexView.index},
	{method: 'GET',    	path: '/login',											config: LoginView.index},
	{method: 'GET',    	path: '/test-route',								config: TestView.index},
	{method: 'GET',    	path: '/user/add',									config: UserView.index},
	{method: 'GET',    	path: '/maps',											config: MapsView.index},

	// Controllers
	{method: 'POST',    path: '/register',									config: UserController.add},
	{method: 'POST',    path: '/login',											config: SecurityController.login},
	{method: 'POST',    path: '/logout',										config: SecurityController.logout}

];
