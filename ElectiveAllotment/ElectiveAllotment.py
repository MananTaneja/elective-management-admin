from firebase import firebase
import random
import time
from datetime import datetime

firebase = firebase.FirebaseApplication('https://elective-management-system.firebaseio.com/')

electives = ['Natural Language Processing',
             'Cloud Computing',
             'Machine Learning',
             'Data Science',
             'Internet Of Things',
		'Biometrics']

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
##    electives = ['Natural Language Processing',
##                 'Cloud Computing',
##                 'Machine Learning',
##                 'Data Science',
##                 'Internet Of Things']
##    random_index = random.randint(0, len(electives)-1)
##    while electives[random_index] in other_than:
##        random_index = random.randint(0, len(electives)-1)
##    return electives[random_index]
##
##for i in range(100):
##    Date, time1, time2 = random_date('1/1/2020 6:00 PM', '1/6/2020 6:00 AM', random.random()).split()
##    Time = time1 + ' ' + time2
##    first = random_elective([])
##    second = random_elective([first])
##    third = random_elective([first, second])
##    data = {
##        'Date': Date,
##        'Time': Time,
##        'Email': 'teststudent'+str(i+1)+'@gmail.com',
##        'Preference 1': first,
##        'Preference 2': second,
##        'Preference 3': third,
##        'password': 'student'+str(i+1),
##        'rollno': 'CSE'+str(i+1).rjust(3, '0'),
##        'student_name': 'student'+str(i+1)
##    }
##    firebase.put('/3/data', str(5+i), data)

while True:
    faculties = dict(firebase.get('/2/data', ''))['faculties']
    students = dict(firebase.get('/3', ''))['data']

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
            return (datetime.strptime(x['Date'], '%d/%m/%Y'),
                    datetime.strptime(x['Time'], '%I:%M %p'))
        except:
            return (datetime.strptime('1/1/5000', '%d/%m/%Y'),
                    datetime.strptime('1:30 PM',  '%I:%M %p'))

    students.sort(key=funcForSort)

    def maxStudents(elective):
        return 60*numberOfFaculty[elective]

    for student in students:
        cnt = 1
        elective = student['Preference '+str(cnt)]
        while elective!='':
            try:
                elective = student['Preference '+str(cnt)]
            except:
                break
            if numberOfStudents[elective]<maxStudents(elective):
                numberOfStudents[elective]+=1
                student['gotElective'] = elective
                break
            else:
                cnt+=1

    print('The Electives were allocated as follows: ')
    for student in students:
        if student['gotElective']==False:
            print('Student {} could not be allocated any of the electives'.format(student['Email']))
        else:
            print student['Email']+':', student['gotElective']
    print()
