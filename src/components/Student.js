import { Link } from 'react-router-dom';

const Student = ({ student }) => {
    return (
        <article className="post">
            <Link to={`student/${student.studentId}`}>
                <h4>{student.firstName} {student.lastName}</h4>
                <p className="postField">Grade: {student.grade} <br/> 
                Id: {student.studentId}
                </p>
            </Link>
        </article>
    )
}

export default Student