import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "@/components/Navbar";
import FriendsListWidget from "@/components/widgets/FriendsListWidget";
import CreatePostWidget from "@/components/widgets/CreatePostWidget";
import FeedWidget from "@/components/widgets/FeedWidget";
import UserWidget from "@/components/widgets/UserWidget";

import { Box, useMediaQuery } from "@mui/material";

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const { userId } = useParams();
	const token = useSelector((state) => state.token);
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

	const getUser = async () => {
		const res = await fetch(`https://socialite.kanishksingh.dev/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await res.json();
		setUser(data.user);
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			<Box>
				<Navbar />

				<Box
					width="100%"
					padding="2rem 6%"
					display={isMobileDevice ? "block" : "flex"}
					gap="2rem"
					justifyContent="center">
					<Box flexBasis={isMobileDevice ? undefined : "26%"}>
						<UserWidget userId={userId} picturePath={user?.picturePath} />
						<Box m="2rem 0" />
						<FriendsListWidget userId={userId} />
					</Box>

					<Box
						flexBasis={isMobileDevice ? undefined : "42%"}
						mt={isMobileDevice ? "2rem" : undefined}>
						<CreatePostWidget picturePath={user?.picturePath} />
						<Box m="2rem 0" />
						<FeedWidget userId={userId} isProfile />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ProfilePage;
