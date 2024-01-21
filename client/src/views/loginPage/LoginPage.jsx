import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CustomForm from "./CustomForm";

const LoginPage = () => {
	const theme = useTheme();
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

	return (
		<Box>
			<Box
				width="100%"
				backgroundColor={theme.palette.background.alt}
				p="1rem 6%"
				textAlign="center"
			>
				<Typography fontWeight="bold" fontSize="32px" color="primary">
					SociaLite
				</Typography>
			</Box>

			<Box
				width={isMobileDevice ? "93%" : "50%"}
				p="2rem"
				m="2rem auto"
				borderRadius="1.5rem"
				backgroundColor={theme.palette.background.alt}
			>
				<Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
					Socialite{" "}
					<small>
						As if there weren&apos;t enough social media platforms already
					</small>
				</Typography>

				{/* Form */}
				<CustomForm />
			</Box>
		</Box>
	);
};

export default LoginPage;
