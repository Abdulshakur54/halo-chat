import { Resend } from 'resend';



resend.emails.send({
  from: 'send.halo-chat-m7qu',
  to: 'mabdulshakur54@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
}).then((data)=>{
console.log(data)
}).catch((err)=>{console.log(err)});



