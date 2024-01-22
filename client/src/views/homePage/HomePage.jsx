import { useSelector } from "react-redux";
import Navbar from "@/views/navbar/Navbar";

import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "@/components/UserWidget";

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
			</Box>
		</Box>
	);
};

export default HomePage;
