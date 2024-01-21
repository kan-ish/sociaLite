import { useState } from "react";
import { Form, Formik } from "formik";
import Dropzone from "react-dropzone";

import FlexboxSpaceBetween from "../../components/FlexboxSpaceBetween";

import {
	Box,
	Button,
	TextField,
	useMediaQuery,
	Typography,
	useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const initialValuesLogin = {
	email: "",
	password: "",
};

const initialValuesRegister = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
	image: "",
};


const CustomForm = () => {
	const [pageType, setPageType] = useState("register");
	const theme = useTheme();
	const isMobileDevice = useMediaQuery("(max-width: 1000px)");

	const handleFormSubmit = async (values, onSubmitProps) => {};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={
				pageType === "login" ? initialValuesLogin : initialValuesRegister
			}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
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

									<Box
										gridColumn="span 4"
										border={`1px solid ${theme.palette.neutral.medium}`}
										borderRadius="5px"
										p="1rem"
									>
										<Dropzone
											acceptedFiles=".jpg,.jpeg,.png"
											multiple={false}
											onDrop={(acceptedFiles) =>
												setFieldValue("image", acceptedFiles[0])
											}
										>
											{({ getRootProps, getInputProps }) => {
												return (
													<Box
														{...getRootProps()}
														border={`2px dashed ${theme.palette.primary.main}`}
														p="1rem"
														sx={{ "&:hover": { cursor: "pointer" } }}
													>
														<input {...getInputProps()} />
														{!values.image ? (
															<p>Add picture Here</p>
														) : (
															<FlexboxSpaceBetween>
																<Typography>{values.image.name}</Typography>
																<EditOutlinedIcon />
															</FlexboxSpaceBetween>
														)}
													</Box>
												);
											}}
										</Dropzone>
									</Box>
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
