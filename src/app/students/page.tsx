import Student from '@/components/Student';
import StudentInterface from '@/data/student.model';


function Students() {
  const students: StudentInterface[] = [
    { firstName: 'Bill', lastName: 'Smith', iNumber: '134098678', major: 'Computer Science' },
    { firstName: 'Tom', lastName: 'Jones', iNumber: '11-444-3333', major: 'Computer Science' },
  ];
  return (
    <main>
      {students.map((student: StudentInterface ) => {
        return (
          <Student
            firstName={student.firstName}
            lastName={student.lastName}
            iNumber={student.iNumber}
            major={student.major}
          />
        );
      })}
    </main>
  );
}

export default Students;
