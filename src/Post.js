
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.email}</h2>
                <p >{post.firstName}</p>
                <p >{post.lastName}</p>
                <p >{post.phoneNumber}</p>
                <p >{post.grade}</p>
            </Link>

        </article>
    )
}

export default Post