import { useState } from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";

import FlexboxSpaceBetween from "../styledWrappers/FlexboxSpaceBetween";
import UserProfilePic from "../UserProfilePic";
import WidgetWrapper from "../styledWrappers/WidgetWrapper";

import {
	EditOutlined,
	DeleteOutlined,
	ImageOutlined,
	GifBoxOutlined,
	AttachFileOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	useMediaQuery,
	IconButton,
	Button,
} from "@mui/material";

const CreatePostWidget = ({ picturePath }) => {
	const [post, setPost] = useState("");
	const [isImageDrop, setIsImageDrop] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const theme = useTheme();

	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);

	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

	const handlePost = async () => {
		const formData = new FormData();
		formData.append("userId", _id);
		formData.append("description", post);

		if (imageFile) {
			formData.append("image", imageFile);
			formData.append("picturePath", imageFile.name);
		}

		const res = await fetch("http://localhost:6001/posts", {
			method: "POST",
			body: formData,
			headers: { Authorization: `Bearer ${token}` },
		});
		const allPosts = await res.json();

		console.log(allPosts);

		setImageFile(null);
		setPost("");
	};

	return (
		<WidgetWrapper>
			<FlexboxSpaceBetween gap={"1.5rem"}>
				<UserProfilePic image={picturePath} />
				<InputBase
					placeholder="What's on your mind..."
					onChange={(e) => setPost(e.target.value)}
					value={post}
					sx={{
						width: "100%",
						backgroundColor: theme.palette.neutral.light,
						borderRadius: "2rem",
						p: "1rem 2rem",
					}}
				/>
			</FlexboxSpaceBetween>

			<Divider sx={{ margin: "1.25rem 0" }} />

			{isImageDrop && (
				<>
					<Box
						border={`1px solid ${theme.palette.neutral.medium}`}
						borderRadius={"5px"}
						mt={"1rem"}
						p={"1rem"}>
						<Dropzone
							acceptedFiles=".jpg,.jpeg,.png"
							multiple={false}
							onDrop={(acceptedFiles) =>
								setImageFile(acceptedFiles[0])
							}>
							{({ getRootProps, getInputProps }) => {
								return (
									<FlexboxSpaceBetween>
										<Box
											{...getRootProps()}
											width={"100%"}
											border={`2px dashed ${theme.palette.primary.main}`}
											p="1rem"
											sx={{
												"&:hover": {
													cursor: "pointer",
												},
											}}>
											<input {...getInputProps()} />
											{!imageFile ? (
												<p>
													Drop or click to upload
													image
												</p>
											) : (
												<FlexboxSpaceBetween>
													<Typography>
														{imageFile.name}
													</Typography>

													<EditOutlined />
												</FlexboxSpaceBetween>
											)}
										</Box>

										{imageFile && (
											<IconButton
												onClick={() =>
													setImageFile(null)
												}
												sx={{ marginLeft: "10px" }}>
												<DeleteOutlined />
											</IconButton>
										)}
									</FlexboxSpaceBetween>
								);
							}}
						</Dropzone>
					</Box>

					<Divider sx={{ margin: "1.25rem 0" }} />
				</>
			)}

			<FlexboxSpaceBetween>
				<FlexboxSpaceBetween
					gap={"0.25rem"}
					onClick={() => setIsImageDrop(!isImageDrop)}>
					<ImageOutlined sx={{ color: theme.palette.neutral.mediumMain }} />

					<Typography
						color={theme.palette.neutral.mediumMain}
						sx={{
							"&:hover": { cursor: "pointer", color: theme.palette.neutral.medium },
						}}>
						Image
					</Typography>
				</FlexboxSpaceBetween>

				{isMobileDevice ? (
					<>
						<FlexboxSpaceBetween gap={"0.25rem"}>
							<MoreHorizOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
						</FlexboxSpaceBetween>
					</>
				) : (
					<>
						<FlexboxSpaceBetween gap={"0.25rem"}>
							<GifBoxOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
							<Typography color={theme.palette.neutral.mediumMain}>Clip</Typography>
						</FlexboxSpaceBetween>

						<FlexboxSpaceBetween gap={"0.25rem"}>
							<AttachFileOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
							<Typography color={theme.palette.neutral.mediumMain}>
								Attachment
							</Typography>
						</FlexboxSpaceBetween>

						<FlexboxSpaceBetween gap={"0.25rem"}>
							<MicOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
							<Typography color={theme.palette.neutral.mediumMain}>Audio</Typography>
						</FlexboxSpaceBetween>
					</>
				)}

				<Button
					disabled={!post}
					onClick={handlePost}
					sx={{
						color: theme.palette.primary.alt,
						backgroundColor: theme.palette.primary.main,
						borderRadius: "3rem",
					}}>
					<Typography color={theme.palette.primary.dark} fontWeight={"500"}>Post</Typography>
				</Button>
			</FlexboxSpaceBetween>
		</WidgetWrapper>
	);
};

export default CreatePostWidget;
