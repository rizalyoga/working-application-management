export const htmlTemplate = (email: string, resetLink: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Inter', Arial, sans-serif;
            }
            .wrapper {
                background-color: #f5f5f5;
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
            }
            .header {
                text-align: center;
                padding: 20px;
            }
            .header img {
                max-width: 200px;
            }
            .content {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .greeting {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
                font-weight: 600;
            }
            .message {
                font-size: 16px;
                line-height: 1.5;
                color: #666;
                margin-bottom: 20px;
            }
            .reset-link {
                display: inline-block;
                background-color:rgb(203, 203, 203);
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: 500;
                margin: 20px 0;
            }
            .reset-link:hover {
                background-color: #2563eb;
                color: white;
            }
            .footer {
                font-size: 14px;
                color: #666;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }
            .footer p {
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header">
                <img src="https://static-00.iconduck.com/assets.00/briefcase-icon-250x256-afut38n1.png" alt="Job-Tracking Logo" />
            </div>
            <div class="content">
                <div class="greeting">
                    Hallo ${email},
                </div>
                <div class="message">
                    <p>We receive a request to reset your password.</p>
                    <p>Please click the button below to set a new password:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" class="reset-link">
                            Reset Password
                        </a>
                    </div>

                    <p>Perlu diingat:</p>
                    <ul style="list-style: none; padding: 0;">
                        <li>• This link is only valid for <strong> 10 minutes </strong>.</li>
                        <li>• If you don't feel asking for a password reset, please ignore this email and <a href = "mailto: yogaremz@gmail.com"> Contact our Support Team</a>.</li>
                    </ul>

                    <p>If the above button doesn't work, you can copy and paste the following URL into your browser:</p>
                    <p style="word-break: break-all; margin: 10px 0;">
                        ${resetLink}
                    </p>
                </div>
                <div class="footer">
                   <p>If you have any questions or need assistance, please contact:</p>
                   <p><a href="yogaremz@gmail.com">yogaremz@gmail.com</a></p>
                   <p>© 2025 Job-Tracking. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
`;
};
