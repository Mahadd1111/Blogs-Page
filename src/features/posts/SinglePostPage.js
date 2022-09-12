import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

const SinglePostPage = ()=>{
    //retrieve post id
    const {postId} = useParams();
    const post = useSelector((state)=>selectPostById(state,Number(postId)));
    const editPostLink = "/post/edit/"+postId;
    if(!post){
        return (
            <section>
                <h2>Post Not Found</h2>
            </section>
        );
    }
    else{
        return (
            <section>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p className="postCredit">
                    <Link to ={editPostLink}>Edit Post</Link>
                    <PostAuthor userId={post.userId}/>
                    <TimeAgo timestamp = {post.date}/>
                </p>
                <ReactionButtons post = {post}/>
            </section>
        );
    }

}

export default SinglePostPage;