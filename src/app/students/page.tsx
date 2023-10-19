'use client';

import Student from '@/components/Student';
import StudentInterface from '@/data/student.model';
import { useEffect, useState } from 'react';
import students from '@/data/mock-students';

function Students() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    fetch('./data/students.json').then((result) => result.json);
  }, []);

  useEffect(() => {}, [isLoggedIn]);

  function logIn() {
    setIsLoggedIn(true);
  }

  return (
    <main>
      {isLoggedIn && ( //This is another way to do an IF STATEMENT.
        <div>Welcome!</div>
      )}

      {students.map((student: StudentInterface) => {
        return (
          <Student
            key={student.iNumber}
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
