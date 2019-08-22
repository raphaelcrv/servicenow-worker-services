//load external module
const catalogGenerator = require('./controller/catalog-generator')


/**
 * Function: catalogGenerator 
 * Desc: Gera automaticamente categorias, sub, items
 */


catalogGenerator.createCatalogCategoriesByExcel({
	filePath : 'data.xlsx',
	catalogSysId : '0410c0e8db323300ccc961ca0b9619e1',
	variableSet : ''
})

