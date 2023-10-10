function Student (
    props: { 
        firstName: string; 
        lastName: string;
        iNumber: string;
    }
) {
    return(
        <section>
            <div>First Name: {props.firstName}</div>
            <div>Last Name: {props.lastName}</div>
            <div>I-Number {props.iNumber}</div>
        </section>
    );
}

export default Student;