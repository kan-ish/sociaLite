import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/redux/slices/authSlice";

import Friend from "../Friend";
import WidgetWrapper from "../styledWrappers/WidgetWrapper";

import { Box, Typography, useTheme } from "@mui/material";

const FriendsListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);

	const getFriends = async () => {
		const res = await fetch(
			`http://localhost:6001/user/${userId}/friends`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await res.json();
		// console.log(data[0]);
		dispatch(setFriends({ friends: data }));
	};

	useEffect(() => {
		getFriends();
	}, []);

	return (
		<WidgetWrapper>
			<Typography
				color={theme.palette.neutral.dark}
				variant="h5"
				fontWeight={500}
				sx={{ mb: "1.5rem" }}>
				Friend List
			</Typography>

			<Box display={"flex"} flexDirection={"column"} gap="1.5rem">
				{friends.map((friend) => {
					return (
						<Friend
							key={friend?._id}
							friendId={friend?._id}
							firstName={friend?.firstName}
							lastName={friend?.lastName}
							location={friend?.location}
							userPicturePath={friend?.picturePath}
						/>
					);
				})}
			</Box>
		</WidgetWrapper>
	);
};

export default FriendsListWidget;
