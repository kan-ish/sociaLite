import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserProfilePic from "../UserProfilePic";
import FlexboxSpaceBetween from "../styledWrappers/FlexboxSpaceBetween";
import WidgetWrapper from "../styledWrappers/WidgetWrapper";

import {
	ManageAccountsOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	EditOutlined,
	X,
	LinkedIn
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

	if (!user) {
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		friends,
		impressions,
		viewedProfile,
	} = user;

	return (
		<WidgetWrapper>
			{/* User Head */}
			<FlexboxSpaceBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}
			>
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
							}}
						>
							{firstName} {lastName}
						</Typography>

						<Typography color={medium}>{friends.length} friends</Typography>
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
					<WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>

			{/* Profile Stats */}
			<Box p="1rem 0">
				<FlexboxSpaceBetween mb="0.5rem">
					<Typography color={medium}>Who's viewd your profile</Typography>
					<Typography color={main} fontWeight="500">
						{viewedProfile}
					</Typography>
				</FlexboxSpaceBetween>
				<FlexboxSpaceBetween mb="0.5rem">
					<Typography color={medium}>Impressions of your post</Typography>
					<Typography color={main} fontWeight="500">
						{impressions}
					</Typography>
				</FlexboxSpaceBetween>
			</Box>

			{/* Socials */}
			<Box p="1rem 0">
				<Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
					Social Profiles
				</Typography>

				<FlexboxSpaceBetween gap="1rem" mb="0.5rem">
					<FlexboxSpaceBetween gap="1rem">
						<X fontSize="large" />

						<Box>
							<Typography color={main} fontWeight="500">
								Twitter
							</Typography>

							<Typography color={medium}>Social Network</Typography>
						</Box>
					</FlexboxSpaceBetween>

					<EditOutlined sx={{ color: main }} />
				</FlexboxSpaceBetween>

				<FlexboxSpaceBetween gap="1rem">
					<FlexboxSpaceBetween gap="1rem">
						<LinkedIn fontSize="large" sx={{color: "#0077b5"}} />

						<Box>
							<Typography color={main} fontWeight="500">
								LinkedIn
							</Typography>

							<Typography color={medium}>Network Platform</Typography>
						</Box>
					</FlexboxSpaceBetween>

					<EditOutlined sx={{ color: main }} />
				</FlexboxSpaceBetween>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
