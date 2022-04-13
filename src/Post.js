import { useState, useEffect } from "react";

const useGetPost = (id) => {
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((response) => response.json())
			.then((json) => {
				// intentional delay for simulate network
				setTimeout(() => setPost(json), 1500);
			});
	}, [id]);

	return [post];
};

const Post = () => {
	// get post with id 1
	const [post] = useGetPost(1);

	console.count();

	if (post == null) return <div>Loading post...</div>;

	return (
		<div>
			<span> id: {post.id}</span>
			<span> title: {post.title}</span>
			<span> body: {post.body}</span>
		</div>
	);
};

export default Post;
