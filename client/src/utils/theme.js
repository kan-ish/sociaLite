// color design tokens export
export const colorKey = {
	grey: {
		0: "#FFFFFF",
		100: "#F6F6F6",
		200: "#F0F0F0",
		300: "#A3A3A3",
		400: "#858585",
		500: "#666666",
		600: "#333333",
	},
	primary: {
		0: "#E6FBFF",
		100: "#00D5FA",
		200: "#006B7D",
	},
};

export const themeSettings = () => {
	return {
		palette: {
			primary: {
				dark: colorKey.primary[200],
				main: colorKey.primary[100],
				light: colorKey.primary[0],
			},
			neutral: {
				dark: colorKey.grey[600],
				main: colorKey.grey[500],
				mediumMain: colorKey.grey[400],
				medium: colorKey.grey[300],
				light: colorKey.grey[200],
			},
			background: {
				default: colorKey.grey[100],
				alt: colorKey.grey[0],
			},
		},
		typography: {
			fontFamily: ["Rubik", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	};
};
