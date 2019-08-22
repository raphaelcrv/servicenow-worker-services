const readXlsxFile = require('read-excel-file/node');
const sn = require('./now-api');


const nowApi = new sn(
	'admin',
	'raphael10R',
	'https://dev78974.service-now.com',
	'77e9979bdb133300ccc961ca0b96197429ce23c55f5cf36769f525a91018dcb47287bffb'
);


/**
 * ==== Auto generate Module ======
 *  > createCatalogObjects(obj)
 * obj.fileName : nome do arquivo
 * obj.catalogSysId : sysId do catalogo que deve ser criado antes
 * obj.variableSet : sysId do variableSet caso tenha não obrigatório
 */
exports.createCatalogCategoriesByExcel = async (data) => {	
	var categorias = []
	var doneCategories = {};

	//read and return content from excel
	rows = await readExcelFile(data.filePath);

	
	for (var k = 0; k < (rows.length); k++) {
		//valor  => rw
		//indice => i
		var rw = rows[k];

		for (var i = 0; i < (rw.length); i++) {
			var vl = rw[i];
			
			
			//primeira linha captura as categorias
			if (k == 0 && vl.includes('cat')) {
				categorias.push(i)
			}


			if (i <= (categorias.length - 1) && vl != null && !vl.includes('cat')) {

				//if already exists on doneCategories jumpo for next
				if (!doneCategories.hasOwnProperty(vl)) {

					console.log(vl)
					//catch father_sys when is not on the first colunm cat
					fatherSysId = (i == 0 ? '' : doneCategories[rw[i - 1]].sys_id);
					await nowApi.CreateCategory(vl, data.catalogSysId, fatherSysId).then(res => {
						done = {
							'sys_id': res,
							'father_sys_id': fatherSysId,
							'level': categorias[i]
						}
					})	

					doneCategories[vl] = done;
				}
			}
		}
	}
	console.log(doneCategories);
}

function readExcelFile(filePath) {
	return new Promise(resolve => {
		readXlsxFile(filePath).then((rows) => {
			resolve(rows);
		});
	})

}
