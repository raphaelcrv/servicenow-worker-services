const axios = require('axios');

function nowApi(userid, password, instance, token) {

	this.userid = userid;
	this.password = password;
	this.instance = instance;
	this.token = token;
	

}

nowApi.prototype.Authenticate=function(callback) {

	var options = {
		url: `${this.instance}/api/now/v2/table/sys_user?user_name=${this.userid}`,
		method: 'get',
		auth: {
			username: `${this.userid}`,
			password: `${this.password}`
		},
		headers: {
			'X-UserToken': `${this.token}`
		}
	};

	axios(options).then((val) => {
		callback('sucess: Authenticate');
	}, (rej) => {
		callback('error: Authenticate');
	});

}


nowApi.prototype.CreateCategory=function(catalogSysId, callback) {

	var options = {
		url: `${this.instance}/api/now/v2/table/sys_user?user_name=${this.userid}`,
		method: 'post',
		auth: {
			username: `${this.userid}`,
			password: `${this.password}`
		},
		headers: {
			'X-UserToken': `${this.token}`
		},
		data : {

		}
	};

	axios(options).then((val) => {
		callback('sucess: Authenticate');
	}, (rej) => {
		callback('error: Authenticate');
	});

}

module.exports = nowApi;