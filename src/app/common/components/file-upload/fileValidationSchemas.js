
export const USERIMG = 'USERIMG';
export const USERDOC = 'USERDOC';
export const USERPDF = 'USERPDF';

export const USERPROFILE = 'USERPROFILE';
export const APPTRANSCRIPT = 'APPTRANSCRIPT';
export const INSTLOGO = 'INSTLOGO';


const VALID_CONFIGS = [
	'USERIMG',
	'USERDOC',
	'USERPDF',
	//
	'USERPROFILE',
	//
	'APPTRANSCRIPT',
	//
	'INSTLOGO',
];







export function getFileUploadConfig(type = null) {
	if (!VALID_CONFIGS.includes(type)) {
		throw new Error('Nope. Should not have done that. Et ceteras et cetera');
	}
	switch (type) {
		case USERPROFILE:
			break;
		case APPTRANSCRIPT:
			break;
		case INSTLOGO:
			break;
		case USERPROFILE:
			break;
		case USERPROFILE:
			break;
		case USERPROFILE:
			break;
		case USERPROFILE:
			break;
	}

}
