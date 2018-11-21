var mailer = require("nodemailer/lib/mail-composer"),
settings = require("./../config");

module.exports = {
formatEnquiryMail: (payload)=>{
    let emailTemplate = `      
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Wishes</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
        <meta name="format-detection" content="telephone=no" />
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <!--<![endif]-->
        
      </head>
      <body style="margin:0px; padding:0px;" bgcolor="#ffffff">
        Hello Manisha and Arun,

                You have received new wish from ${payload.from},
        <br/>
        <br/>
        <br/>
        <br/>
        ${payload.message}
        <br/>
        <br/>
        <br/>
        <br/>

        
        ---------------------------
        <br/>
        <br/>
        Thank You
      </body>
    </html>     
    `;
   return new mailer({
        from: settings.email.from,
        to: settings.email.toList,
        cc: payload.from,
        bcc: settings.email.bccList,
        subject: 'You have received a new wish',
        html: emailTemplate
    });
}
};