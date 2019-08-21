const readXlsxFile = require('read-excel-file/node');

/**
 * ==== Auto generate Module ======
 *  > createCatalogObjects(obj)
 * obj.fileName : nome do arquivo
 * obj.catalogSysId : sysId do catalogo que deve ser criado antes
 * obj.variableSet : sysId do variableSet caso tenha não obrigatório
 */
exports.createCatalogObjects = (data) => {

	var categorias = []
	var doneCategories = {};
	
	readXlsxFile(data.fileName).then((rows) => {

		//rw = linha
		// k = posicao do array
		rows.forEach((rw, k) => {
			// vl = valor
			// i = posicao do valor
			rw.forEach((vl, i) => {

				//pega as posicoes das categorias
				if (k == 0) {
					if (vl.includes('cat')) {
						categorias.push(i)
					}
				}

				if (i <= (categorias.length - 1) && vl != null && !vl.includes('cat')) {
					//caso não seja criado
					if (!doneCategories.hasOwnProperty(vl)) {

						//primeira posicao sempre categoria
						if (i == 0) {

							done = {
								'sys_id': Math.random(),
								'father_sys_id': '',
								'level': categorias[i]
							}
							//adiciona no doneCategories
							doneCategories[vl] = done

							//segunda ou mais posições subcategorias precisa do sys_id do pai
						} else {

							done = {
								'sys_id': Math.random(),
								'father_sys_id': rw[i - 1] + '|' + doneCategories[rw[i - 1]].sys_id, //todo if ternario
								'level': categorias[i]
							}
							//adiciona no doneCategories
							doneCategories[vl] = done
						}

					}
				}
			})
		});		
	});

	

	
}
