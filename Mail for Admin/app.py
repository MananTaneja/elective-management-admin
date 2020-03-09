from threading import Thread
from flask import Flask
from flask_mail import Mail, Message
from firebase import firebase

firebase = firebase.FirebaseApplication('https://elective-management-system.firebaseio.com/')

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
        recipients=(['akashpremrajan@gmail.com', 'shreyaarockz@gmail.com']),
        )
        msg.body = "\nHi,\nSorry to inform you that none of your first 3 electives can be allotted to you, we regret the inconvienence.\nYou will have to inform the admin at admin@gmail.com to make changes!"
        thr = Thread(target=send_async_mail, args=[app, msg])
        thr.start()
        return 'Mail sent'
    except Exception as e:
        return(str(e))

@app.route('/sendStudents')
def send_students():
    students = dict(firebase.get('/3/data', ''))['students']
    for student in students:
        msg = Message("Elective Management Admin", 
        sender='electiveadm99@gmail.com',
        #recipients=([student['email']]),
        recipients=(['akashpremrajan@gmail.com']),
        )
        msg.body = "\nHi,\nAn elective of your choice has been alloted to you. Please verify the same.\nIn case of discrepancy, please inform the admin at admin@gmail.com to make changes!\nNote that you email id is {}".format(student['email'])
        thr = Thread(target=send_async_mail, args=[app, msg])
        thr.start()
    return 'Mail sent'

if __name__ == '__main__':
    app.run(debug=True)
