import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = ()=>{
    const {postId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateLink = "/post/"+postId;

    const post = useSelector((state)=>selectPostById(state,Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title,setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus,setRequestStatus] = useState('idle');

    if(!post){
        return(
            <h2>Post Not Found</h2>
        );
    }

    const onTitleChange = (e)=>setTitle(e.target.value);
    const onContentChanged = (e)=>setContent(e.target.value);
    const onAuthorChanged = (e)=>setUserId(e.target.value);

    const canSave = [title,content,userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = ()=>{
        if(canSave){
            try{
                setRequestStatus('pending');
                dispatch(updatePost({id:post.id,title,body:content,userId,reactions:post.reactions})).unwrap();
                setTitle('');
                setContent('');
                setUserId('')
                navigate(navigateLink);
            }
            catch(err){
                console.error('Failed to Save Post',err);
            }
            finally{
                setRequestStatus('idle');
            }
        }
    }

    const onDeletePostClicked= ()=>{
        try{
            setRequestStatus('pending');
            dispatch(deletePost({id:post.id})).unwrap();
            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
        }
        catch(err){
            console.error('Failed to delete')
        }
        finally{
            setRequestStatus('');
        }
    }

    const userOptions = users.map((user)=>{
        return (<option key = {user.id} value={user.id}>{user.name}</option>);
    })

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title: </label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChange}></input>
                <label htmlFor="postAuthor">Author: </label>
                <select id="postAuthor" defaultValue={userId} value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content: </label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged}/>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Changes</button>
                <button type="button" onClick={onDeletePostClicked}>Delete Post</button>
            </form>
        </section>
    )
}

export default EditPostForm;