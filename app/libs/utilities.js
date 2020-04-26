import bcrypt from 'bcryptjs';

export const isValidObjectId = (id) => new RegExp("^[0-9a-fA-F]{24}$").test(id);

export const hashPassword = async password => await bcrypt.hash(password, 10);

export const randomStringGenerator = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const mailTemplate = body => `
<div>
  <div style="height: 60px; background-color: #1fc8db;
  background-image: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)">
    <h1 style="text-align: center; color: #ffffff; vertical-align: middle;">Grover Industires</h1>
  </div>
  <div style="padding: 30px; background-color: #f0f0f0;">
    <div>
      ${body}
    </div>
  </div>
</div>
`