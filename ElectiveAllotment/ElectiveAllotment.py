from firebase import firebase

firebase = firebase.FirebaseApplication('https://elective-management-system.firebaseio.com/')

while True:
    faculties = dict(firebase.get('/2/data', ''))['faculties']
    students = dict(firebase.get('/3', ''))['data']

    electives = []
    for faculty in faculties:
        elective = faculty['preference']
        if elective!='':
            electives.append(elective)
    electives = list(set(electives))

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

    # Change to sort(key=TimeStamp(database update))
    students.sort(key=lambda x: x['student_name'])

    def maxStudents(elective):
        return 60*numberOfFaculty[elective]

    for student in students:
        cnt = 1
        elective = student['Preference '+str(cnt)]
        while elective!='':
            try:
                elective = student['Preference '+str(cnt)]
            except:
                print('Student {} could not be allocated any of the electives'.format(student['Email']))
                break
            if numberOfStudents[elective]<maxStudents(elective):
                numberOfStudents[elective]+=1
                student['gotElective'] = elective
                break
            else:
                cnt+=1

    print('The Electives were allocated as follows: ')
    for student in students:
        print(student['Email']+':', student['gotElective'])
    print()
