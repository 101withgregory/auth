import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"


export const sendVerificationEmail = async (email, verificationToken)=>{
     const recipient = [{email}]

     try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), category: `Email Verification`
        })

        console.log("Email sent successfully", response)
     } catch (error) {
        console.error('Error sending verification', error)
        throw new Error ( `Error sending verification email: ${error}`)
     }
}

export const sendWelcomeEmail = async (email, name)=>{
   const recipient = [{email}]
   try {
      const response = await mailtrapClient.send({
         from: sender,
         to:recipient,
         template_uuid:'b45a101b-5258-4bae-8b34-466edd629ba9',
         template_variables:{
            "company_info_name": "Auth Company ",
      "name": name,
      
         }
      })
      console.log("Welcome email sent successfully", response)

   } catch (error) {
      console.error('Error sending welcome email', error)
      throw new Error (`Error sending welcome email: ${error}`)
   }
}

export const sendPasswordResetEmail = async (email, resetURL)=>{
   const recipient = [{email}];

   try {
      const response = await mailtrapClient.send({
         from: sender,
         to: recipient,
         subject: "Reset your password",
         html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),


      })
   } catch (error) {
      console.log('Error in resetting password', error);
         res.status(400).json({success:false, message: error.message})
   }
}

export const sendResetSuccessEmail= async(email)=>{
   const recipient = [{email}]

   try {
       const response = await mailtrapClient.send({
         from: sender,
         to:recipient,
         subject:'Password Reset Successful',
         html: PASSWORD_RESET_REQUEST_TEMPLATE,
         category: "Password Reset"
       })

       console.log('Password reset email sent successfully', response);
       
       
   } catch (error) {
      console.log('Error sending password reset success email', error);
         res.status(400).json({success:false, message: error.message})
   }
}