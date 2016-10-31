'use strict';

const Pages = require('./pages');
const Security = require('./controllers/security');
const User = require('./controllers/user');

exports.endpoints = [
	{method: 'GET',    	path: '/',													config: Pages.index},
	{method: 'GET',    	path: '/login',											config: Pages.login},
	{method: 'GET',    	path: '/test-route',								config: Pages.testRoute},
	{method: 'GET',    	path: '/user/add',									config: Pages.userAdd},
	{method: 'POST',    path: '/register',									config: User.register},
	{method: 'POST',    path: '/login',											config: Security.login},
	{method: 'POST',    path: '/logout',										config: Security.logout}
];
