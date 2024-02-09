import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/redux/slices/authSlice";

import FlexboxSpaceBetween from "./styledWrappers/FlexboxSpaceBetween";
import UserProfilePic from "./UserProfilePic";

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

const Friend = ({
	friendId,
	firstName,
	lastName,
	location,
	userPicturePath,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);
	const { palette } = useTheme();

	const isFriend = friends.find((friend) => friend._id === friendId);
	const isSelf = _id === friendId;

	const patchFriend = async () => {
		const res = await fetch(
			`https://api.kanishksingh.dev/user/${_id}/${friendId}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		const data = await res.json();
		dispatch(setFriends({ friends: data }));
	};

	return (
		<>
			<FlexboxSpaceBetween>
				<FlexboxSpaceBetween gap="1rem">
					<UserProfilePic image={userPicturePath} size="55px" />
					<Box
						onClick={() => {
							navigate(`/profile/${friendId}`);
							navigate(0); // refresh the page to update all components
						}}>
						<Typography
							color={palette.neutral.main}
							variant="h5"
							fontWeight={"500"}
							sx={{
								"&:hover": {
									color: palette.primary.light,
									cursor: "pointer",
								},
							}}>
							{`${firstName} ${lastName}`}
						</Typography>

						<Typography
							color={palette.neutral.medium}
							fontSize={"0.75rem"}>
							{location}
						</Typography>
					</Box>
				</FlexboxSpaceBetween>

				{!isSelf && (
					<IconButton
						onClick={() => patchFriend()}
						sx={{
							backgroundColor: palette.primary.light,
							Padding: "0.6rem",
						}}>
						{isFriend ? (
							<PersonRemoveOutlined
								sx={{ color: palette.primary.dark }}
							/>
						) : (
							<PersonAddOutlined
								sx={{ color: palette.primary.dark }}
							/>
						)}
					</IconButton>
				)}
			</FlexboxSpaceBetween>
		</>
	);
};

export default Friend;
