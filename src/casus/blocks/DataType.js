//@flow strict

type DataType = 'INT' | 'DOUBLE' | 'BOOLEAN' | 'INT_LIST' | 'DOUBLE_LIST' | 'BOOLEAN_LIST' | 'VOID';

function listVersionOf(regularType: DataType): DataType {
	if (regularType == 'INT') {
		return 'INT_LIST';
	}
	if (regularType == 'DOUBLE') {
		return 'DOUBLE_LIST';
	}
	if (regularType == 'BOOLEAN') {
		return 'BOOLEAN_LIST';
	}
	console.log('Trying to get the list type of a type that doesnt have one!');
	return 'VOID';
}

export type {DataType};

export {listVersionOf};

