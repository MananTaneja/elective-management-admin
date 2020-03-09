from threading import Thread
from flask import Flask
from flask_mail import Mail, Message
from firebase import firebase
import random
import time
from datetime import datetime
import json

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

@app.route('/algorithm')
def algorithm():
    electives = firebase.get('/4/data/electives', '')
    electives = [i['name'] for i in electives]
    faculties = dict(firebase.get('/2/data', ''))['faculties']
    students = dict(firebase.get('/3/data', ''))['students']
    transactions = dict(firebase.get('/5/data', ''))['transactions']

    numberOfStudents = {}
    for elective in electives:
        numberOfStudents[elective] = 0

    numberOfFaculty = {}
    for elective in electives:
        numberOfFaculty[elective] = 0
    for faculty in faculties:
        elective = faculty['preference']
        if elective!='':
            numberOfFaculty[faculty['preference']]+=1

    for student in students:
        student['gotElective'] = False

    def funcForSort(x):
        try:
            dateTime = ''
            for i in transactions:
                if i['roll']==x['roll']:
                    dateTime = i['dateTime']
                    break
            a, b, c = dateTime.split(' ')
            Date = a
            Time = b+' '+c
            return (datetime.strptime(Date, '%d/%m/%Y'),
                    datetime.strptime(Time, '%I:%M %p'))
        except:
            return (datetime.strptime('1/1/5000', '%d/%m/%Y'),
                    datetime.strptime('1:30 PM',  '%I:%M %p'))

    students.sort(key=funcForSort)

    def maxStudents(elective):
        return 60*numberOfFaculty[elective]

    for student in students:
        cnt = 1
        elective = student['pref'+str(cnt)]
        while elective!='':
            try:
                elective = student['pref'+str(cnt)]
            except:
                break
            if numberOfStudents[elective]<maxStudents(elective):
                numberOfStudents[elective]+=1
                student['gotElective'] = elective
                break
            else:
                cnt+=1

    print()
    print('The Electives were allocated as follows: ')
    noElectiveStudents = []
    for student in students:
        if student['gotElective']==False:
            noElectiveStudents.append(student['roll'])
        else:
            print(student['roll']+':', student['gotElective'])
            for i in range(len(transactions)):
                if transactions[i]['roll']==student['roll']:
                    firebase.put('/5/data/transactions/'+str(i), 'chosen', student['gotElective'])
    print()

    noElectiveStudents = [i for i in noElectiveStudents if i!='']
    if len(noElectiveStudents)>0:
        print('Students who could not be given electives: ')
        for i in noElectiveStudents:
            print(i)
    print()

    for i in range(len(electives)):
        firebase.put('/4/data/electives/'+str(i), 'max_allowed', maxStudents(electives[i]))

    return json.dumps(students)

if __name__ == '__main__':
    app.run(debug=True)
