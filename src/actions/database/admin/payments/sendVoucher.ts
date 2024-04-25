"use server";
import getUserById from "@/actions/database/auth/getUserById";
import { v4 as uuidv4 } from 'uuid';
import sendMail from "@/config/nodemailer.config";
import generateVoucherCode from "@/utils/generateVoucherCode";
import { VoucherItemType } from "@/types/types";
import { db } from "@/config/firebase.config";

const sendVoucher = async (userId: string, voucherPrice: number) => {

    const userData = await getUserById(userId);

    const currentTime = new Date();
    const fiveYearsLater = new Date(currentTime);
    fiveYearsLater.setFullYear(fiveYearsLater.getFullYear() + 5);

    const voucherObject: VoucherItemType = {
        code: generateVoucherCode(),
        createdBy: userId,
        id: uuidv4(),
        isUsed: false,
        timestamp: new Date(),
        validUntil: fiveYearsLater,
        value: voucherPrice
    };

    await db.collection("activeVouchers").doc(voucherObject.id).set(voucherObject);

    await sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: userData.email,
        subject: "Your eGames Store Voucher Purchase Confirmation 🎮✨",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>eGames Store - Voucher Purchase Confirmation</title>
            <style>
                /* Reset styles */
                body, html {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }
                /* Container styles */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                /* Header styles */
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h1 {
                    color: #333;
                    margin-bottom: 10px;
                }
                .header p {
                    color: #666;
                    margin: 0;
                }
                /* Voucher styles */
                .voucher {
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .voucher p {
                    color: #333;
                    margin: 0;
                    font-size: 16px;
                }
                .voucher .code {
                    font-size: 24px;
                    font-weight: bold;
                    margin-top: 10px;
                    color: #0066cc;
                }
                /* Footer styles */
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #999;
                }
                /* Contact info styles */
                .contact-info {
                    margin-top: 10px;
                }
                /* Button styles */
                .button {
                    display: inline-block;
                    background-color: #0066cc;
                    color: #fff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .button:hover {
                    background-color: #0052a3;
                }
                /* Link styles */
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1><a href="https://www.egamesstore.com" target="_blank" rel="noopener noreferrer">eGames Store</a></h1>
                    <p>Your source for gaming vouchers!</p>
                </div>
                
                <!-- Voucher -->
                <div class="voucher">
                    <p>Thank you for purchasing a voucher from eGames Store.</p>
                    <p>This voucher can be used to purchase any item in our store and is valid for 5 years. Please do not share the voucher code unless you are gifting it.</p>
                    <p>Your voucher code is:</p>
                    <p class="code">${voucherObject.code}</p>
                    <p>Price: ৳${voucherObject.value}</p>
                </div>
                
                <!-- Visit Store button -->
                <a href="https://www.egamesstore.com" target="_blank" rel="noopener noreferrer" class="button">Visit Store</a>
                
                <!-- Footer -->
                <div class="footer">
                    <p>This email was sent by eGames Store. If you have any questions, please contact us:</p>
                    <div class="contact-info">
                        <p>Phone: +1234567890</p>
                        <p>Email: <a href="mailto:info@egamesstore.com">info@egamesstore.com</a></p>
                    </div>
                </div>
            </div>
        </body>
        
        </html>        
        `
    });

    return true;
};

export default sendVoucher;