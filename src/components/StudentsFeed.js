import Student from '../components/Student';

const StudentsFeed = ({ students }) => {
    return (
        <>
            {students.map(student => (
                <Student key={student.studentId} student={student} />
            ))}
        </>
    )
}

export default StudentsFeed