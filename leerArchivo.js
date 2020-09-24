// Reading file method
function handleFile(e) {
	let files = e.target.files;
	let i, f;
	for (i = 0, f = files[i]; i != files.length; ++i) {
		let reader = new FileReader();
		let name = f.name;
		reader.onload = function (e) {
			let data = e.target.result;
			let result;
			let workbook = XLSX.read(data, { type: "binary" });
			let sheet_name_list = workbook.SheetNames;
			sheet_name_list.forEach(function (y) {
				let roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
				if (roa.length > 0) {
					result = roa;
				}
			});
			if (result != null) generateTable(result);
		};
		reader.readAsArrayBuffer(f);
	}
}

// Generating table
function generateTable(params) {
	let headers = Object.keys(params[0]);
	var content = "<table>";
	// Setting headers
	content += "<tr>";
	for (i = 0; i < headers.length; i++) {
		content += "<th>" + headers[i] + "</th>";
	}
	content += "</tr>";
	// Setting content table
	for (let i = 0; i < params.length; i++) {
		content += "<tr>";
		for (let j = 0; j < headers.length; j++) {
			content += "<td>" + params[i][headers[j]] + "</td>";
		}
		content += "</tr>";
	}

	content += "</table>";

	$("#tableId").append(content);
}

$(document).ready(function () {
	$("#files").change(handleFile);
});
