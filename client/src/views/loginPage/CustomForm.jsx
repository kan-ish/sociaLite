import { useState } from "react";
import { Form, Formik } from "formik";

import FlexboxSpaceBetween from "../../components/FlexboxSpaceBetween";
import {
	Box,
	Button,
	TextField,
	useMediaQuery,
	Typography,
	useTheme,
} from "@mui/material";

const initialValuesLogin = {
	email: "",
	password: "",
};

const CustomForm = () => {
	const [pageType, setPageType] = useState("register");
	const theme = useTheme();
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

	const handleFormSubmit = async (values, onSubmitProps) => {};

	return (
		<Formik onSubmit={handleFormSubmit} initialValues={initialValuesLogin}>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
			}) => {
				return (
					<Form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(2, minmax(0, 1fr)"
							sx={{
								"& > div": {
									gridColumn: isMobileDevice ? "span 4" : undefined,
								},
							}}
						>
							{pageType === "register" && (
								<>
									<TextField
										label="First Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										name="firstName"
										error={
											Boolean(touched.firstName) && Boolean(errors.firstName)
										}
										helperText={touched.firstName && errors.firstName}
										sx={{ gridColumn: "span 2" }}
									/>
									<TextField
										label="Last Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										name="lastName"
										error={
											Boolean(touched.lastName) && Boolean(errors.lastName)
										}
										helperText={touched.lastName && errors.lastName}
										sx={{ gridColumn: "span 2" }}
									/>
									<TextField
										label="Location"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.location}
										name="location"
										error={
											Boolean(touched.location) && Boolean(errors.location)
										}
										helperText={touched.location && errors.location}
										sx={{ gridColumn: "span 4" }}
									/>
									<TextField
										label="Occupation"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.occupation}
										name="occupation"
										error={
											Boolean(touched.occupation) && Boolean(errors.occupation)
										}
										helperText={touched.occupation && errors.occupation}
										sx={{ gridColumn: "span 4" }}
									/>
								</>
							)}

							<TextField
								label="Email"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name="email"
								error={Boolean(touched.email) && Boolean(errors.email)}
								helperText={touched.email && errors.email}
								sx={{ gridColumn: "span 4" }}
							/>
							<TextField
								label="Password"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								name="password"
								type="password"
								error={Boolean(touched.password) && Boolean(errors.password)}
								helperText={touched.password && errors.password}
								sx={{ gridColumn: "span 4" }}
							/>
						</Box>

						<Box>
							<Button
								fullWidth
								type="submit"
								sx={{
									m: "2rem 0",
									p: "1rem",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.background.alt,
									"&:hover": { color: theme.palette.primary.main },
								}}
							>
								{pageType === "login" ? "LOGIN" : "REGISTER"}
							</Button>
						</Box>
					</Form>
				);
			}}
		</Formik>
	);
};

export default CustomForm;
