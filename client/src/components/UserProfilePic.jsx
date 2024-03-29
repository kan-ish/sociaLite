import { Box } from "@mui/material";

const UserProfilePic = ({ image, size = "60px" }) => {
	return (
		<Box width={size} height={size}>
			<img
				style={{ objectFit: "cover", borderRadius: "50%" }}
				width={size}
				height={size}
				src={`https://api.kanishksingh.dev/assets/${image}`}
				alt="user profile picture"
			/>
		</Box>
	);
};

export default UserProfilePic;
