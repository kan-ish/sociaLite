import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserProfilePic from "./UserProfilePic";
import FlexboxSpaceBetween from "./FlexboxSpaceBetween";
import WidgetWrapper from "./WidgetWrapper";

import {
	ManageAccountsOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";

const UserWidget = ({ userId, picturePath }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const theme = useTheme();
	const token = useSelector((state) => state.token);

	const dark = theme.palette.neutral.dark;
	const medium = theme.palette.neutral.medium;
	const main = theme.palette.neutral.main;

	const getUser = async () => {
		const res = await fetch(`http://localhost:6001/user/${userId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const resData = await res.json();

		setUser(resData.user);
	};

	useEffect(() => {
		getUser();
	}, []);

	const {
		firstName,
		lastName,
		location,
		occupation,
		friends,
	} = user;

	return (
		<WidgetWrapper>
			{/* User Head */}
			<FlexboxSpaceBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}>
				<FlexboxSpaceBetween gap="1rem">
					<UserProfilePic image={picturePath} />
					<Box>
						<Typography
							variant="h4"
							color={dark}
							fontWeight="500"
							sx={{
								"&:hover": {
									color: theme.palette.primary.light,
									cursor: "pointer",
								},
							}}>
							{firstName} {lastName}
						</Typography>

						<Typography color={medium}>
							{friends.length} friends
						</Typography>
					</Box>
				</FlexboxSpaceBetween>

				<ManageAccountsOutlined />
			</FlexboxSpaceBetween>

			<Divider />

			{/* Basic Info */}
			<Box p="1rem 0">
				<Box display="flex" alignItems="Center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{location}</Typography>
				</Box>
				<Box display="flex" alignItems="Center" gap="1rem" mb="0.5rem">
					<WorkOutlineOutlined
						fontSize="large"
						sx={{ color: main }}
					/>
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
