import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FlexboxSpaceBetween from "../styledWrappers/FlexboxSpaceBetween";
import Friend from "../Friend";
import WidgetWrapper from "../styledWrappers/WidgetWrapper";

import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { setPost } from "@/redux/slices/authSlice";

const PostWidget = ({
	postId,
	postUserId,
	firstName,
	lastName,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	const dispatch = useDispatch();

	const [isCommentsOpen, setIsCommentsOpen] = useState(false);

	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const { palette } = useTheme();
	// console.log(loggedInUserId)

	const isLiked = Boolean(likes[loggedInUserId]);
	const fullName = `${firstName[0].toUpperCase()}${firstName.slice(
		1
	)} ${lastName[0].toUpperCase()}${lastName.slice(1)} `;

	const patchLike = async () => {
		const res = await fetch(`http://localhost:6001/posts/${postId}/like`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});
		const { updatedPost } = await res.json();
		// console.log(updatedPost);

		dispatch(setPost({ post: updatedPost }));
	};

	return (
		<>
			<WidgetWrapper margin={"2rem 0"}>
				<Friend
					friendId={postUserId}
					name={fullName}
					location={location}
					userPicturePath={userPicturePath}
				/>

				<Typography color={palette.neutral.main} sx={{ mt: "1rem" }}>
					{description}
				</Typography>

				{picturePath && (
					<img
						src={`http://localhost:6001/assets/${picturePath}`}
						alt={picturePath}
						width={"100%"}
						height={"auto"}
						style={{
							borderRadius: "0.75rem",
							marginTop: "0.75rem",
						}}
					/>
				)}

				<FlexboxSpaceBetween mt={"0.25rem"}>
					<FlexboxSpaceBetween gap={"1rem"}>
						<FlexboxSpaceBetween gap={"0.3rem"}>
							<IconButton onClick={patchLike}>
								{isLiked ? (
									<FavoriteOutlined sx={{ color: palette.primary.main }} />
								) : (
									<FavoriteBorderOutlined />
								)}
							</IconButton>

							<Typography>{Object.keys(likes).length}</Typography>
						</FlexboxSpaceBetween>

						<FlexboxSpaceBetween gap={"0.3rem"}>
							<IconButton onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
								<ChatBubbleOutlineOutlined />
							</IconButton>

							<Typography>{comments.length}</Typography>
						</FlexboxSpaceBetween>
					</FlexboxSpaceBetween>

					<IconButton>
						<ShareOutlined />
					</IconButton>
				</FlexboxSpaceBetween>

				{isCommentsOpen && (
					<Box mt={"0.5rem"}>
						{comments.map((comment, i) => (
							<Box key={i}>
								<Divider />

								<Typography
									sx={{
										color: palette.neutral.main,
										m: "0.5rem 0",
										pl: "1rem",
									}}
								>
									{comment}
								</Typography>
							</Box>
						))}

						<Divider />
					</Box>
				)}
			</WidgetWrapper>
		</>
	);
};

export default PostWidget;
