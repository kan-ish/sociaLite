import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "@/redux/slices/authSlice";
import PostWidget from "./PostWidget";

const FeedWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const posts = useSelector((state) => state.posts);

	const getPosts = async () => {
		const res = await fetch("https://api.kanishksingh.dev/posts", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();
		// console.log(data)
		dispatch(setPosts({ posts: data.allPosts }));
	};

	const getUserPosts = async () => {
		const res = await fetch(`https://api.kanishksingh.dev/posts/${userId}/posts`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();
		// console.log(data)
		dispatch(setPosts({ posts: data.userPosts }));
	};

	useEffect(() => {
		if (isProfile) {
			getUserPosts();
		} else {
			getPosts();
		}
	}, []);

	return (
		<>
			{posts.map(
				({
					_id,
					userId,
					firstName,
					lastName,
					description,
					location,
					picturePath,
					userPicturePath,
					likes,
					comments,
				}) => {
					return (
						<PostWidget
							key={_id}
							postId={_id}
							postUserId={userId}
							firstName={firstName}
							lastName={lastName}
							description={description}
							location={location}
							picturePath={picturePath}
							userPicturePath={userPicturePath}
							likes={likes}
							comments={comments}
						/>
					);
				}
			)}
		</>
	);
};

export default FeedWidget;
