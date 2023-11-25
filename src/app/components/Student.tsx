import StudentInterface from "@/app/data/student.model";

function Student(props: StudentInterface) {
  return (
    <section>
      <div>First Name: {props.firstName}</div>
      <div>Last Name: {props.lastName}</div>
      <div>I-Number: {props.iNumber}</div>
      <div>Major: {props.major}</div>
    </section>
  );
}

export default Student;
