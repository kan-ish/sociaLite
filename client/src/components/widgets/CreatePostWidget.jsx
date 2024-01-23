import Dropzone from "react-dropzone";

import FlexboxSpaceBetween from "../styledWrappers/FlexboxSpaceBetween";
import UserProfilePic from "../UserProfilePic";
import WidgetWrapper from "../styledWrappers/WidgetWrapper";

import { useState } from "react";

import {
	EditOutlined,
	DeleteOutlined,
	ImageOutlined,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	useMediaQuery,
	IconButton,
} from "@mui/material";

const CreatePostWidget = ({ picturePath }) => {
	const [post, setPost] = useState("");
	const [isImageDrop, setIsImageDrop] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const theme = useTheme();

	const mediumMain = theme.palette.neutral.mediumMain;
	const medium = theme.palette.neutral.medium;
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

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
						border={`1px solid ${medium}`}
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
					<ImageOutlined sx={{ color: mediumMain }} />

					<Typography
						color={mediumMain}
						sx={{
							"&:hover": { cursor: "pointer", color: medium },
						}}>
						Image
					</Typography>
				</FlexboxSpaceBetween>
			</FlexboxSpaceBetween>
		</WidgetWrapper>
	);
};

export default CreatePostWidget;
