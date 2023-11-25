'use client';

import Student from '@/app/components/Student';
import StudentInterface from '@/app/data/student.model';
import { useEffect, useState } from 'react';
import students from '@/app/data/mock-students';

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
