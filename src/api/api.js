export const baseUrl = import.meta.env.VITE_URL;

export const getCsrfToken = `${baseUrl}/api/csrf_cookie/`;
export const apiLogin = `${baseUrl}/api/login/`;
export const apiLogout = `${baseUrl}/api/logout/`;

export const apiRegisterCompany = `${baseUrl}/api/public_register_company/`;
export const apiRegisterCompanyNoCaptcha = `${baseUrl}/api/public_register_company_no_captcha/`;

export const apiRegisterParticipant = `${baseUrl}/api/public_register_participant`;
export const apiRegisterParticipantNoCaptcha = `${baseUrl}/api/public_register_participant_no_captcha`;

export const apiQRCode = `${baseUrl}/api/generate_a_qrcode/`;

export const apiEvent = `${baseUrl}/api/event/`;

export const apiEmailConfirmation = `${baseUrl}/api/email_confirmation/`;

export const apiCompanyOrgType = `${baseUrl}/api/company_org_type/`;



export const apiAllParticipant = `${baseUrl}/api/participant/`;
export const apiParticipant = `${baseUrl}/api/participant`;

export const apiAllBooth = `${baseUrl}/api/booth/`;
export const apiBooth = `${baseUrl}/api/booth`;


export const apiCompanOrgType = `${baseUrl}/api/company_org_type/`

