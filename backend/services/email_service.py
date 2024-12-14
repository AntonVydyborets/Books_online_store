import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


async def send_email(to_email: str, subject: str, message: str):
    smtp_server = "smtp.gmail.com"
    smpt_port = 587
    sender_email = "admin_email@gmail.com"
    sender_password = "some_password"

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(message, "plain"))

    try:
        with smtplib.SMTP(smtp_server, smpt_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, msg.as_string())
    except Exception as e:
        print(f"Error sending email: {e}")
