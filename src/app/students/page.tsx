import Student from './Student';

function Students() {
  const students = [
    { firstName: 'Bill', lastName: 'Smith', iNumber: '134098678' },
    { firstName: 'Tom', lastName: 'Jones', iNumber: '11-444-3333' },
  ];
  return (
    <main>
      {students.map((student) => {
        return (
          <Student
            firstName={student.firstName}
            lastName={student.lastName}
            iNumber={student.iNumber}
          />
        );
      })}
    </main>
  );
}

export default Students;
