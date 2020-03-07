from threading import Thread
from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEBUG']  = True
app.config['MAIL_USERNAME'] = 'electiveadm99@gmail.com'
app.config['MAIL_PASSWORD'] = 'projectsecurity'

mail = Mail(app)


def send_async_mail(app, msg):
    with app.app_context():
        mail.send(msg)

@app.route('/send-mail')
def send_mail():
    try:
        msg = Message("Elective Management Admin", 
        sender='electiveadm99@gmail.com',
        recipients=(['akashpremrajan@gmail.com']),
        )
        msg.body = "\nHi,\nSorry to inform you that none of your first 3 electives can be allotted to you, we regret the inconvienence.\nYou will have to inform the admin at admin@gmail.com to make changes!"
        thr = Thread(target=send_async_mail, args=[app, msg])
        thr.start()
        return 'Mail sent'
    except Exception as e:
        return(str(e))

if __name__ == '__main__':
    app.run(debug=True)