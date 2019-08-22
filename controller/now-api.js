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


nowApi.prototype.CreateCategory = function(name, catalogSysId, catSysIdFather) {

	return new Promise(resolve => {
		var options = {
			url: `${this.instance}/api/now/table/sc_category`,
			method: 'post',
			auth: {
				username: `${this.userid}`,
				password: `${this.password}`
			},
			headers: {
				'X-UserToken': `${this.token}`
			},
			data : {"sc_catalog": catalogSysId,"sys_name": name,"title": name, "parent" : catSysIdFather}
		};
	
		axios(options).then((val) => {
			//return sys_id of created categorie
			resolve(val.data.result.sys_id);
		}, (rej) => {
			//return string error
			resolve('error: CreateCategory');
		});
	})
}

// (data.catalogSysId, catSysId, rw[itemIndex])
nowApi.prototype.CreateItem = function(catalogSysId, catSysId, itemName) {

	return new Promise(resolve => {
		var options = {
			url: `${this.instance}/api/now/table/sc_cat_item`,
			method: 'post',
			auth: {
				username: `${this.userid}`,
				password: `${this.password}`
			},
			headers: {
				'X-UserToken': `${this.token}`
			},
			data : {"name":itemName,"sc_catalogs":catalogSysId,"category":catSysId}
		};
	
		axios(options).then((val) => {
			//return sys_id of created categorie
			resolve(val.data.result.sys_id);
		}, (rej) => {
			//return string error
			resolve('error: CreateCategory');
		});
	})
}

module.exports = nowApi;