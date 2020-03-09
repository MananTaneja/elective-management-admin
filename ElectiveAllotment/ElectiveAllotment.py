from firebase import firebase
import random
import time
from datetime import datetime
from flask import Flask
import json

firebase = firebase.FirebaseApplication('https://elective-management-system.firebaseio.com/')

electives = firebase.get('/4/data/electives', '')
electives = [i['name'] for i in electives]

app = Flask(__name__)

##def str_time_prop(start, end, form, prop):
##    stime = time.mktime(time.strptime(start, form))
##    etime = time.mktime(time.strptime(end, form))
##    ptime = stime + prop * (etime - stime)
##    return time.strftime(form, time.localtime(ptime))
##
##def random_date(start, end, prop):
##    return str_time_prop(start, end, '%d/%m/%Y %I:%M %p', prop)
##
##def random_elective(other_than):
##    random_index = random.randint(0, len(electives)-1)
##    while electives[random_index] in other_than:
##        random_index = random.randint(0, len(electives)-1)
##    return electives[random_index]
##
##for i in range(20):
##    Date, time1, time2 = random_date('1/1/2020 6:00 PM', '1/6/2020 6:00 AM', random.random()).split()
##    Time = time1 + ' ' + time2
##    first = random_elective([])
##    second = random_elective([first])
##    third = random_elective([first, second])
##    data = {
##        'email': 'teststudent'+str(i+1)+'@gmail.com',
##        'pref1': first,
##        'pref2': second,
##        'pref3': third,
##        'roll': 'CSE'+str(i+1).rjust(3, '0'),
##        'name': 'student'+str(i+1)
##    }
##    data2 = {
##        'dateTime': Date+' '+Time,
##        'chosen': '',
##        'roll': 'CSE'+str(i+1).rjust(3, '0')
##    }
##    firebase.put('/3/data/students', str(1+i), data)
##    firebase.put('/5/data/transactions', str(1+i), data2)

@app.route('/')
def algorithm():
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

if __name__=="__main__":
    app.run()
