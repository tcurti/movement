// Esta función construye una matriz de transfromación de 3x3 en coordenadas homogéneas 
// utilizando los parámetros de posición, rotación y escala. La estructura de datos a 
// devolver es un arreglo 1D con 9 valores en orden "column-major". Es decir, para un 
// arreglo A[] de 0 a 8, cada posición corresponderá a la siguiente matriz:
//
// | A[0] A[3] A[6] |
// | A[1] A[4] A[7] |
// | A[2] A[5] A[8] |
// 
// Se deberá aplicar primero la escala, luego la rotación y finalmente la traslación. 
// Las rotaciones vienen expresadas en grados. 
function BuildTransform( positionX, positionY, rotation, scale )
{
	const angle = rotation * Math.PI / 180;
	const scaled_cos = scale * Math.cos(angle);
	const scaled_sin = scale * Math.sin(angle);
	return [
		scaled_cos, scaled_sin, 0,
		-scaled_sin, scaled_cos, 0,
		positionX, positionY, 1
	];
}

// Esta función retorna una matriz que resula de la composición de trasn1 y trans2. Ambas 
// matrices vienen como un arreglo 1D expresado en orden "column-major", y se deberá 
// retornar también una matriz en orden "column-major". La composición debe aplicar 
// primero trans1 y luego trans2. 
function ComposeTransforms( trans1, trans2 )
{
	// trans2 * trans1 = res
	// res^t = trans1^t * trans2^t
	const res = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			for (let k = 0; k < 3; k++) {
				res[index(i, j)] += trans2[index(i, k)] * trans1[index(k, j)];
			}
		}
	}
	return res;
}

function index(i, j) {
	return j * 3 + i;
}
