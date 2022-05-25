import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
    const history = useHistory();
    const { id } = useParams();

    const editEmail = useStoreState((state) => state.editEmail);
    const editFirstName = useStoreState((state) => state.editFirstName);
    const editLastName = useStoreState((state) => state.editLastName);
    const editPhoneNumber = useStoreState((state) => state.editPhoneNumber);
    const editGrade = useStoreState((state) => state.editGrade);

    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditEmail = useStoreActions((actions) => actions.setEditEmail);
    const setEditFirstName = useStoreActions((actions) => actions.setEditFirstName);
    const setEditLastName = useStoreActions((actions) => actions.setEditLastName);
    const setEditPhoneNumber = useStoreActions((actions) => actions.setEditPhoneNumber);
    const setEditGrade = useStoreActions((actions) => actions.setEditGrade);


    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);


    useEffect(() => {
        if (post) {
            setEditEmail(post.email);
            setEditFirstName(post.firstName);
            setEditLastName(post.lastName);
            setEditPhoneNumber(post.phoneNumber);
            setEditGrade(post.grade);
        }
    }, [post, setEditEmail, setEditFirstName, setEditLastName, setEditPhoneNumber, setEditGrade])


    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { 
            id, 
            email: editEmail, 
            firstName: editFirstName, 
            lastName: editLastName,
            phoneNumber: editPhoneNumber,
            grade: editGrade};
        console.log(updatedPost)
        editPost(updatedPost);
        history.push(`/post/${id}`);
    }

    return (
        <main className="NewPost">
            {!editEmail &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                       

                        <label htmlFor="postEmail">Email:</label>
                        <input
                            id="email"
                            type="text"
                            required
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                        <label htmlFor="postFirstName">First name:</label>
                        <input
                            id="firstName"
                            type="text"
                            required
                            value={editFirstName}  
                            onChange={(e) => setEditFirstName(e.target.value)}
                        />

                        <label htmlFor="postLastName">Last name:</label>
                        <input
                            id="lastName"
                            type="text"
                            required
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                        />
                        <label htmlFor="postPhoneNumber">Phone number:</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            required
                            value={editPhoneNumber}
                            onChange={(e) => setEditPhoneNumber(e.target.value)}
                        />
                        <label htmlFor="postGrade">Grade:</label>
                        <input
                            id="grade"
                            type="text"
                            required
                            value={editGrade}
                            onChange={(e) => setEditGrade(e.target.value)}
                        />

                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {editEmail &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost