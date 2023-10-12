import Student from '@/data/student.model';
import Student from './Student';


function Students() {
  const students = [
    { firstName: 'Bill', lastName: 'Smith', iNumber: '134098678', major: 'Computer Science' },
    { firstName: 'Tom', lastName: 'Jones', iNumber: '11-444-3333', major: 'Computer Science' },
  ];
  return (
    <main>
      {students.map((student) => {
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
