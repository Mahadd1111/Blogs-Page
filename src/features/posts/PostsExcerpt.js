import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
    const postLink = "post/"+post.id;
    return (
        <article>
            <h3>{post.title}</h3>
            <p className="excerpt">{post.body.substring(0, 100)}</p>
            <p className="postCredit">
                <Link to = {postLink}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}
export default PostsExcerpt