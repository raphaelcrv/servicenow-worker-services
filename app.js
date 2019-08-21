//load external module
const autoGenerate = require('./controller/generator')

//Global Params
global.urlApi = 'https://dev78974.service-now.com/api/now/table/'



/**
 * Function: createCatalogObjects 
 * Desc: Gera automaticamente categorias, sub, items
 */

autoGenerate.createCatalogObjects({
	fileName : 'data.xlsx',
	catalogSysId : '0410c0e8db323300ccc961ca0b9619e1',
	variableSet : ''
})
