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
	const { palette } = useTheme();

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

		const res = await fetch("https://socialite.kanishksingh.dev/posts", {
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
						backgroundColor: palette.neutral.light,
						borderRadius: "2rem",
						p: "1rem 2rem",
					}}
				/>
			</FlexboxSpaceBetween>

			<Divider sx={{ margin: "1.25rem 0" }} />

			{isImageDrop && (
				<>
					<Box
						border={`1px solid ${palette.neutral.medium}`}
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
											border={`2px dashed ${palette.primary.main}`}
											p="1rem"
											sx={{
												"&:hover": {
													cursor: "pointer",
												},
											}}>
											<input {...getInputProps()} />
											{!imageFile ? (
												<p>
													Drop file or click to upload
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
					onClick={() => setIsImageDrop(!isImageDrop)}
					sx={{
						"&:hover": {
							cursor: "pointer",
							color: palette.neutral.medium,
						},
					}}>
					<ImageOutlined
						sx={{ color: palette.neutral.mediumMain }}
					/>

					<Typography
						color={palette.neutral.mediumMain}
						sx={{
							"&:hover": {
								cursor: "pointer",
								color: palette.neutral.medium,
							},
						}}>
						Image
					</Typography>
				</FlexboxSpaceBetween>

				{isMobileDevice ? (
					<>
						<FlexboxSpaceBetween
							gap={"0.25rem"}
							sx={{
								"&:hover": {
									cursor: "pointer",
									color: palette.neutral.medium,
								},
							}}>
							<MoreHorizOutlined
								sx={{
									color: palette.neutral.mediumMain,
									"&:hover": {
										cursor: "pointer",
										color: palette.neutral.medium,
									},
								}}
							/>
						</FlexboxSpaceBetween>
					</>
				) : (
					<>
						<FlexboxSpaceBetween
							gap={"0.25rem"}
							sx={{
								"&:hover": {
									cursor: "pointer",
									color: palette.neutral.medium,
								},
							}}>
							<GifBoxOutlined
								sx={{ color: palette.neutral.mediumMain }}
							/>
							<Typography
								color={palette.neutral.mediumMain}
								sx={{
									"&:hover": {
										cursor: "pointer",
										color: palette.neutral.medium,
									},
								}}>
								Clip
							</Typography>
						</FlexboxSpaceBetween>

						<FlexboxSpaceBetween
							gap={"0.25rem"}
							sx={{
								"&:hover": {
									cursor: "pointer",
									color: palette.neutral.medium,
								},
							}}>
							<AttachFileOutlined
								sx={{ color: palette.neutral.mediumMain }}
							/>
							<Typography
								color={palette.neutral.mediumMain}
								sx={{
									"&:hover": {
										cursor: "pointer",
										color: palette.neutral.medium,
									},
								}}>
								Attachment
							</Typography>
						</FlexboxSpaceBetween>

						<FlexboxSpaceBetween
							gap={"0.25rem"}
							sx={{
								"&:hover": {
									cursor: "pointer",
									color: palette.neutral.medium,
								},
							}}>
							<MicOutlined
								sx={{ color: palette.neutral.mediumMain }}
							/>
							<Typography
								color={palette.neutral.mediumMain}
								sx={{
									"&:hover": {
										cursor: "pointer",
										color: palette.neutral.medium,
									},
								}}>
								Audio
							</Typography>
						</FlexboxSpaceBetween>
					</>
				)}

				<Button
					disabled={!post}
					onClick={handlePost}
					sx={{
						color: palette.primary.alt,
						backgroundColor: palette.primary.main,
						borderRadius: "3rem",
						"&:hover": {
							cursor: "pointer",
							backgroundColor: palette.primary.light,
						},
						"&:disabled": {
							backgroundColor: palette.neutral.light,
						},
					}}>
					<Typography
						color={palette.primary.dark}
						fontWeight={"500"}>
						Post
					</Typography>
				</Button>
			</FlexboxSpaceBetween>
		</WidgetWrapper>
	);
};

export default CreatePostWidget;
