import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/posts';

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    postEmail: '',
    setPostEmail: action((state, payload) => {
        state.postEmail = payload;
    }),
    postFirstName: '',
    setPostFirstName: action((state, payload) => {
        state.postTitle = payload;
    }),
    postLastName: '',
    setPostLastName: action((state, payload) => {
        state.postLastName = payload;
    }),
    postPhoneNumber: '',
    setPostPhoneNumber: action((state, payload) => {
        state.postPhoneNumber = payload;
    }),
    postGrade: '',
    setPostGrade: action((state, payload) => {
        state.postGrade = payload;
    }),
    editEmail: '',
    setEditEmail: action((state, payload) => {
        state.postEmail = payload;
    }),
    editFirstName: '',
    setEditFirstName: action((state, payload) => {
        state.postTitle = payload;
    }),
    editLastName: '',
    setEditLastName: action((state, payload) => {
        state.postLastName = payload;
    }),
    editPhoneNumber: '',
    setEditPhoneNumber: action((state, payload) => {
        state.postPhoneNumber = payload;
    }),
    editGrade: '',
    setEditGrade: action((state, payload) => {
        state.postGrade = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find(post => (post.id).toString() === id);
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {
            const response = await api.post('/posts', newPost);
            actions.setPosts([...posts, response.data]);
            actions.setPostEmail('');
            actions.setPostFirstName('');
            actions.setPostLastName('');
            actions.setPostPhoneNumber('');
            actions.setPostGrade('');
        } catch (err) {
            console.log(`Error: ${err.message.action}`);
            console.log(newPost);
        }
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const { posts } = helpers.getState();
        console.log(posts);
        console.log(id);
        try {
            await api.delete(`/posts/${id}`);
            actions.setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            console.log(`Error: ${err.message.helpers}`);
        }
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = updatedPost;
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            actions.setPosts(posts.map(post => post.student === id ? { ...response.data } : post));
            actions.setEditEmail('');
            actions.setEditFirstName('');
            actions.setEditLastName('');
            actions.setEditPhoneNumber('');
            actions.setEditGrade('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    })
});