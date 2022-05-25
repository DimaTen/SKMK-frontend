import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
    const history = useHistory();

    const posts = useStoreState((state) => state.posts);
    const postEmail = useStoreState((state) => state.postEmail);
    const postFirstName = useStoreState((state) => state.postFirstName);
    const postLastName = useStoreState((state) => state.postLastName);
    const postPhoneNumber = useStoreState((state) => state.postPhoneNumber);
    const postGrade = useStoreState((state) => state.postGrade);
    


    const savePost = useStoreActions((actions) => actions.savePost);
    const setPostEmail = useStoreActions((actions) => actions.setPostEmail);
    const setPostFirstName = useStoreActions((actions) => actions.setPostFirstName);
    const setPostLastName = useStoreActions((actions) => actions.setPostLastName);
    const setPostPhoneNumber = useStoreActions((actions) => actions.setPostPhoneNumber);
    const setPostGrade = useStoreActions((actions) => actions.setPostGrade);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const newPost = { id, email: postEmail, 
            firstName: postFirstName, 
            lastName: postLastName, 
            phoneNumber: postPhoneNumber,
            grade: postGrade};
        savePost(newPost);
        history.push('/');
    }

    return (
        <main className="NewPost">
            <h2>Add new student</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postEmail">Email:</label>
                <input
                    id="email"
                    type="text"
                    required
                    value={postEmail}
                    onChange={(e) => setPostEmail(e.target.value)}
                />
                <label htmlFor="postFirstName">First name:</label>
                <textarea
                    id="firstName"
                    
                    required
                    value={postFirstName}  
                    onChange={(e) => setPostFirstName(e.target.value)}
                />

                <label htmlFor="postLastName">Last name:</label>
                <input
                    id="lastName"
                    type="text"
                    required
                    value={postLastName}
                    onChange={(e) => setPostLastName(e.target.value)}
                />
                <label htmlFor="postPhoneNumber">Phone number:</label>
                <input
                    id="phoneNumber"
                    type="text"
                    required
                    value={postPhoneNumber}
                    onChange={(e) => setPostPhoneNumber(e.target.value)}
                />
                <label htmlFor="postGrade">Grade:</label>
                <input
                    id="grade"
                    type="text"
                    required
                    value={postGrade}
                    onChange={(e) => setPostGrade(e.target.value)}
                />
                
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost