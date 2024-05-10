export const baseUrl = import.meta.env.VITE_URL;

export const getCsrfToken = `${baseUrl}/api/csrf_cookie/`;

export const apiRegister = `${baseUrl}/api/public_register_company/`;
// export const apiRegisterNoCaptcha = `${baseUrl}/api/public_register_company_no_captcha`;
export const apiRegisterParticipantNoCaptcha = `${baseUrl}/api/public_register_participant_no_captcha`;
export const apiQRCode = `${baseUrl}/api/generate_a_qrcode/`

export const apiEmailConfirmation = `${baseUrl}/api/email_confirmation/`;

export const apiCompanyOrgType = `${baseUrl}/api/company_org_type/`;
