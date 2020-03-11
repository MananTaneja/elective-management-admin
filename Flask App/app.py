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
    electives = dict(firebase.get('/4/data', ''))['electives']
    faculties = dict(firebase.get('/2/data', ''))['faculties']
    transactions = dict(firebase.get('/5/data', ''))['transactions']
    classrooms = dict(firebase.get('/6/data', ''))['classrooms']
    labs = dict(firebase.get('/6/data', ''))['labs']

    for i in range(len(students)):
        student = students[i]
        if not student['gotConfirmation']:
            msg = Message("Student Confirmation", 
            sender='electiveadm99@gmail.com',
            #recipients=([student['email']]),
            recipients=(['akashpremrajan@gmail.com']),
            )
            msg.body = "\nHi,\nAn elective of your choice has been alloted to you. Please verify the same.\nIn case of discrepancy, please inform the admin at admin@gmail.com to make changes!\nNote that you email id is {}".format(student['email'])
            thr = Thread(target=send_async_mail, args=[app, msg])
            thr.start()
            firebase.put('/3/data/students/'+str(i), 'gotConfirmation', True)
    return 'Mail sent'

@app.route('/electiveAllotment')
def electiveAllotment():
    students = dict(firebase.get('/3/data', ''))['students']
    electives = dict(firebase.get('/4/data', ''))['electives']
    faculties = dict(firebase.get('/2/data', ''))['faculties']
    transactions = dict(firebase.get('/5/data', ''))['transactions']
    classrooms = dict(firebase.get('/6/data', ''))['classrooms']
    labs = dict(firebase.get('/6/data', ''))['labs']

    electives = [i['name'] for i in electives]

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

@app.route('/classroomAllotment')
def classroomAllotment():
    students = dict(firebase.get('/3/data', ''))['students']
    electives = dict(firebase.get('/4/data', ''))['electives']
    faculties = dict(firebase.get('/2/data', ''))['faculties']
    transactions = dict(firebase.get('/5/data', ''))['transactions']
    classrooms = dict(firebase.get('/6/data', ''))['classrooms']
    labs = dict(firebase.get('/6/data', ''))['labs']

    classrooms = [(i, classrooms[i]) for i in range(len(classrooms))]
    labs = [(i, labs[i]) for i in range(len(labs))]

    for i in range(len(electives)):
        elective = electives[i]
        if not elective['isLab']:
            firebase.put('/4/data/electives/'+str(i), 'lab', False)
            if elective["classroom"]=="":
                random.shuffle(classrooms)
                for classroom in classrooms:
                    index, classroom = classroom[0], classroom[1]
                    if classroom['isAvailable']:
                        cls = classroom['classroomNumber']
                        firebase.put('/4/data/electives/'+str(i), 'classroom', cls)
                        firebase.put('/6/data/classrooms/'+str(index), 'isAvailable', False)
                        elective["classroom"] = cls
                        classroom["isAvailable"] = False
                        break
        if elective['isLab']:
            if elective["classroom"]=="":
                random.shuffle(classrooms)
                for classroom in classrooms:
                    index, classroom = classroom[0], classroom[1]
                    if classroom['isAvailable']:
                        cls = classroom['classroomNumber']
                        firebase.put('/4/data/electives/'+str(i), 'classroom', cls)
                        firebase.put('/6/data/classrooms/'+str(index), 'isAvailable', False)
                        elective["classroom"] = cls
                        classroom["isAvailable"] = False
                        break
            if elective["lab"]=="":
                random.shuffle(labs)
                for lab in labs:
                    index, lab = lab[0], lab[1]
                    if lab['isAvailable']:
                        lb = lab['roomNumber']
                        firebase.put('/4/data/electives/'+str(i), 'lab', lb)
                        firebase.put('/6/data/labs/'+str(index), 'isAvailable', False)
                        elective["lab"] = lb
                        lab["isAvailable"] = False
                        break
    return json.dumps({})

if __name__ == '__main__':
    app.run(debug=True)
