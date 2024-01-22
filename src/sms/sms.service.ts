import { Injectable } from '@nestjs/common';
import axios from "axios"
const FormData = require('form-data')

@Injectable()
export class SmsService {
    async SendSMS(phone:string,otp:string){
        
        const formData = new FormData()
        formData.append("mobile_phone",phone)
        formData.append('message',`Assalomu alaykum !\nYour Verify code - ${otp} `)
        formData.append('from' , '4548')
        const config = {
            method: 'post',
            maxBodyLength:Infinity,
            url:process.env.SMS_SERVICE_URL,
            headers:{Authorization: `Bearer ${process.env.SMS_TOKEN}`},
            data:formData
        }
        try {
            
            const res = await axios(config)
            
            return res;
        } catch (error) {
            console.log(error);
            return {status:500}
            
        }

    }
}
