import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserLogout } from "@/redux/slices/authSlice";

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
import FlexboxSpaceBetween from "@/components/styledWrappers/FlexboxSpaceBetween";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isSideBarOpen, setIsSidebarOpen] = useState(false);
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

	const theme = useTheme();
	const currentUser = useSelector((state) => state.user);
	// console.log(currentUser);
	const currentUserFullName = `${currentUser.firstName} ${currentUser.lastName}`;

	const neutralLight = theme.palette.neutral.light;
	// const neutralDark = theme.palette.neutral.dark;
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
					}}
				>
					SociaLite
				</Typography>
				{!isMobileDevice && (
					<FlexboxSpaceBetween
						backgroundColor={neutralLight}
						borderRadius="9px"
						gp="3rem"
						padding="0.1rem 1.5rem"
					>
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
					<FormControl variant="standard" value={currentUserFullName}>
						<Select
							value={currentUserFullName}
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
							}}
						>
							<MenuItem value={currentUserFullName}>
								<Typography>{currentUserFullName}</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									dispatch(setUserLogout());
									navigate("/");
								}}
							>
								Logout
							</MenuItem>
						</Select>
					</FormControl>
				</FlexboxSpaceBetween>
			) : (
				<IconButton onClick={() => setIsSidebarOpen(!isSideBarOpen)}>
					<Menu />
				</IconButton>
			)}

			{/* Sidebar for mobile devices */}
			{isMobileDevice && isSideBarOpen && (
				<Box
					position="fixed"
					right="0"
					bottom="0"
					height="100%"
					zIndex="10"
					maxWidth="500px"
					minWidth="300px"
					backgroundColor={backgroundDefault}
				>
					<Box display="flex" justifyContent="flex-end" p="1rem">
						<IconButton onClick={() => setIsSidebarOpen(!isSideBarOpen)}>
							<Close />
						</IconButton>
					</Box>

					{/* Mobile menu items */}
					<FlexboxSpaceBetween
						disple="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						gap="3rem"
					>
						<Message sx={{ fontSize: "25px" }} />
						<Notifications sx={{ fontSize: "25px" }} />
						<Help sx={{ fontSize: "25px" }} />
						<FormControl variant="standard" value={currentUserFullName}>
							<Select
								value={currentUserFullName}
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
								}}
							>
								<MenuItem value={currentUserFullName}>
									<Typography>Kanishk Singh</Typography>
								</MenuItem>

								<MenuItem
									onClick={() => {
										dispatch(setUserLogout());
										navigate("/");
									}}
								>
									Logout
								</MenuItem>
							</Select>
						</FormControl>
					</FlexboxSpaceBetween>
				</Box>
			)}
		</FlexboxSpaceBetween>
	);
};

export default Navbar;
