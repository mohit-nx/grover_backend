import { mailTemplate } from '../../libs/utilities';
export const htmlTemplate = notification => {
  const body = `
    <h3>You have receiveed a new query from the below mentioned user:</h3>
    <b>Name: </b> ${notification.name} <br/>
    <b>Eamil: </b> ${notification.from} <br/>
    ${notification.mobile ? `<b>Name: </b> ${notification.mobile} <br/>` : ''} <br/>
    <b>Query: </b>
    <div style="margin-top: 15px; background-color: #ffffff; width: inherit; padding: 15px;" >
      <i>${notification.query}</i>
    </div>
  `
  return mailTemplate(body);
}

export const textTemplate = notification => `Hi, you have received a new query from ${notification.name} and his 
email of person is ${notification.email} 
${notification.mobile ? `and mobile number is ${notification.mobile}` : '.'} 
${notification.query}`
