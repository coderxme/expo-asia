export const baseUrl = import.meta.env.VITE_URL;

export const getCsrfToken = `${baseUrl}/api/csrf_cookie/`;
export const apiLogin = `${baseUrl}/api/login/`;
export const apiLogout = `${baseUrl}/api/logout/`;

export const apiRegisterCompany = `${baseUrl}/api/public_register_company/`;
export const apiRegisterCompanyNoCaptcha = `${baseUrl}/api/public_register_company_no_captcha/`;

export const apiRegisterParticipant = `${baseUrl}/api/public_register_participant`;
export const apiRegisterParticipantNoCaptcha = `${baseUrl}/api/public_register_participant_no_captcha`;

export const apiQRCode = `${baseUrl}/api/generate_a_qrcode/`;


export const apiEmailConfirmation = `${baseUrl}/api/email_confirmation/`;

export const apiCompanyOrgType = `${baseUrl}/api/company_org_type/`;



export const apiParticipant = `${baseUrl}/api/participant/`;
export const apiParticipantCategory= `${baseUrl}/api/participant_category/`


export const apiBooth = `${baseUrl}/api/booth/`;
export const apiBoothAttendee = `${baseUrl}/api/booth_attendee/`;

export const apiCompanyOrg= `${baseUrl}/api/company_org/`
export const apiCompanOrgType = `${baseUrl}/api/company_org_type/`

export const apiEvent = `${baseUrl}/api/event/`;
export const apiEventAttendee = `${baseUrl}/api/event_attendee/`;

export const apiInvite = `${baseUrl}/api/invite/`;

export const apiMyAccount = `${baseUrl}/api/my_account`

export const apiForum = `${baseUrl}/api/forum/`

export const apiUsers = `${baseUrl}/api/admin_users/`

export const apiMilitaryBranch= `${baseUrl}/api/military_branch/`

export const apiRoles= `${baseUrl}/api/groups/`



