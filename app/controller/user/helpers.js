import { mailTemplate } from '../../libs/utilities';
export const htmlTemplate = user => {
  const { name, email, password, isAdmin, host } = user;
  const body = `
    <h3>Hi ${name}, You have been added ${isAdmin ? 'an admin': 'a user'}</h3>
    
    <b>Eamil: </b> ${email} <br/>
    <b>Password: </b> ${password} <br/>
    <p>To login, <a href=${host} target="_blank">Click Here</a> </p>
  `
  return mailTemplate(body);
}

export const textTemplate = user => {
  const { name, email, password, isAdmin, host } = user;
  return `Hi ${name}, You have been added ${isAdmin ? 'an admin': 'a user'}. 
  Please login to ${host} with username and password as ${email} and ${password} respectively.`
}

export const resetHtmlTemplate = user => {
  const { name, email, password, isAdmin, host } = user;
  const body = `
    <h3>Hi ${name}, Your password has been reset by the admin</h3>
    
    <b>Eamil: </b> ${email} <br/>
    <b>New Password: </b> ${password} <br/>
    <p>To login, <a href=${host} target="_blank">Click Here</a> </p>
  `
  return mailTemplate(body);
}

export const resetTextTemplate = user => {
  const { name, email, password, host } = user;
  return `Hi ${name}, Your password has been reset by the admin. 
  Please login to ${host} with username and password as ${email} and ${password} respectively.`
}