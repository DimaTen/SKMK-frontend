import { useParams, Link, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);

    const handleDelete = (id) => {
        deletePost(id);
        history.push('/');
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.email}</h2>
                        <p className="postBody">{post.firstName}</p>
                        <p className="postBody">{post.lastName}</p>
                        <p className="postBody">{post.phoneNumber}</p>
                        <p className="postBody">{post.grade}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage