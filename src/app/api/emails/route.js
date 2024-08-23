import {sendMail} from './MailSender'
import { NextResponse } from "next/server";

export async function POST(){
    const mail = "jgbiel29@gmail.com"
    await sendMail(mail);
    return NextResponse.json({
        message: "Success!"
      }, {
        status: 200,
      })
}