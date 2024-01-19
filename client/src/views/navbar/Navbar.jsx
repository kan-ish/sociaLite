import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Box,
	IconButton,
	InputBase,
	Typography,
	Select,
	MenuItem,
	FormControl,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import {
	Search,
	Message,
	Notifications,
	Help,
	Menu,
	Close,
} from "@mui/icons-material";
import FlexboxSpaceBetween from "../../components/FlexboxSpaceBetween";

const Navbar = () => {
	const [isSideBarOpen, setIsSidebarOpen] = useState(false);
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

	const theme = useTheme();

	const neutralLight = theme.palette.neutral.light;
	const neutralDark = theme.palette.neutral.dark;
	const backgroundDefault = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const backgroundAlt = theme.palette.background.alt;

	return (
		<FlexboxSpaceBetween padding="1rem 6%" backgroundColor={backgroundAlt}>
			{/* Navbar Left */}
			<FlexboxSpaceBetween gap="1.75rem">
				<Typography
					fontWeight="bold"
					fontSize="clamp(1rem, 2rem, 2.25rem)"
					color="primary"
					sx={{
						"&:hover": {
							color: primaryLight,
							cursor: "pointer",
						},
					}}>
					SociaLite
				</Typography>
				{!isMobileDevice && (
					<FlexboxSpaceBetween
						backgroundColor={neutralLight}
						borderRadius="9px"
						gp="3rem"
						padding="0.1rem 1.5rem">
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexboxSpaceBetween>
				)}
			</FlexboxSpaceBetween>

			{/* Navbar right */}
			{!isMobileDevice ? (
				<FlexboxSpaceBetween gap="2rem">
					<Message sx={{ fontSize: "25px" }} />
					<Notifications sx={{ fontSize: "25px" }} />
					<Help sx={{ fontSize: "25px" }} />
					<FormControl variant="standard" value="Kanishk Singh">
						<Select
							value="Kanishk Singh"
							sx={{
								backgroundColor: neutralLight,
								width: "150px",
								borderRadius: "0.25rem",
								p: "0.25rem 1rem",
								"& .MuiSvgIcon-root": {
									pr: "0.25rem",
									width: "3rem",
								},
								"& .MuiSelect-select:focus": {
									backgroundColor: neutralLight,
								},
							}}>
							<MenuItem value="Kanishk Singh">
								<Typography>Kanishk Singh</Typography>
							</MenuItem>
							<MenuItem>Logout</MenuItem>
						</Select>
					</FormControl>
				</FlexboxSpaceBetween>
			) : (
				<IconButton onClick={() => setIsSidebarOpen(!isSideBarOpen)}>
					<Menu />
				</IconButton>
			)}
		</FlexboxSpaceBetween>
	);
};

export default Navbar;
