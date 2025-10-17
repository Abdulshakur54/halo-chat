import { Resend } from 'resend';

const resend = new Resend('re_AuvM7Axn_NoKUQDpFh9T2khEXfa3KKJ67');

resend.emails.send({
  from: 'send.halo-chat-m7qu',
  to: 'mabdulshakur54@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
}).then((data)=>{
console.log(data)
}).catch((err)=>{console.log(err)});



