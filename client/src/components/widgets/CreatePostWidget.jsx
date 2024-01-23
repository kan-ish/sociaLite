import FlexboxSpaceBetween from "../styledWrappers/FlexboxSpaceBetween";
import UserProfilePic from "../UserProfilePic";
import WidgetWrapper from "../styledWrappers/WidgetWrapper";

import { useState } from "react";

import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	useMediaQuery,
} from "@mui/material";

const CreatePostWidget = ({ picturePath }) => {
	const [post, setPost] = useState("");
	const theme = useTheme();

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
		</WidgetWrapper>
	);
};

export default CreatePostWidget;
