//@flow strict

type ErrorObject = {
	msg?: string,
	errors?: Array<GeneralError>
}

type GeneralError = {
	msg?: string
}
//parses the object returned from the database and returns a string
//describing the error of what went wrong
function getErrorFromObject(errors: ErrorObject): string {
	if (errors.msg != null) {
		return errors.msg;
	}
	if (errors.errors != null && errors.errors.length>0) {
		return errors.errors[0].msg;
	}
	return '';
}

export default getErrorFromObject;
