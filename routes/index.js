'use strict';

const User 		 = require('../components/user');
const Index 	 = require('../components/index');
const Login 	 = require('../components/login');
const Maps  	 = require('../components/maps');
const Test		 = require('../components/test_route');
const Security = require('../components/security');

exports.endpoints = [

	// Views
	{method: 'GET',    	path: '/',													config: Index.View.index},
	{method: 'GET',    	path: '/login',											config: Login.View.index},
	{method: 'GET',    	path: '/test-route',								config: Test.View.index},
	{method: 'GET',    	path: '/user/add',									config: User.View.index},
	{method: 'GET',    	path: '/maps',											config: Maps.View.index},

	// Controllers
	{method: 'POST',    path: '/register',									config: User.Controller.add},
	{method: 'POST',    path: '/login',											config: Security.Controller.login},
	{method: 'POST',    path: '/logout',										config: Security.Controller.logout}

];
