import { useSelector } from "react-redux";

import Navbar from "@/components/Navbar";
import CreatePostWidget from "@/components/widgets/CreatePostWidget";
import UserWidget from "@/components/widgets/UserWidget";
import FeedWidget from "@/components/widgets/FeedWidget";

import { Box, useMediaQuery } from "@mui/material";
import FriendsListWidget from "@/components/widgets/FriendsListWidget";

const HomePage = () => {
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");
	const { _id, picturePath } = useSelector((state) => state.user);

	return (
		<Box>
			<Navbar />

			<Box
				width="100%"
				padding="2rem 6%"
				display={isMobileDevice ? "block" : "flex"}
				gap="0.5rem"
				justifyContent="space-between">
				<Box flexBasis={isMobileDevice ? undefined : "26%"}>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>
				
				<Box 
					flexBasis={isMobileDevice ? undefined : "42%"}
					mt={isMobileDevice ? "2rem" : undefined}
				>
					<CreatePostWidget picturePath={picturePath} />
					<FeedWidget userId={_id} />   
				</Box>

				<Box>
					<FriendsListWidget userId={_id} />
				</Box>
			</Box>
		</Box>
	);
};

export default HomePage;
