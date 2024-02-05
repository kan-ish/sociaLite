// color design tokens export
export const colorKey = {
	grey: {
		0: "#FFFFFF",
		1: "#F6F6F6",
		2: "#F0F0F0",
		3: "#E0E0E0",
		4: "#C2C2C2",
		5: "#A3A3A3",
		6: "#858585",
		7: "#666666",
		8: "#333333",
		9: "#1A1A1A",
		10: "#0A0A0A",
	},
	primary: {
		0: "#afdcf0",
		1: "#afdcf0",
		2: "#e84f4f",
		3: "#416282",
		4: "#227d8c",
	},
};

export const themeSettings = (mode) => {
	console.log(mode)
	return {
		palette: {
			mode: mode,
			...(mode === "light"
				? {
						primary: {
							dark: colorKey.primary[3],
							main: colorKey.primary[2],
							light: colorKey.primary[0],
						},
						neutral: {
							dark: colorKey.grey[8],
							main: colorKey.grey[7],
							mediumMain: colorKey.grey[6],
							medium: colorKey.grey[5],
							light: colorKey.grey[2],
						},
						background: {
							default: colorKey.grey[1],
							alt: colorKey.grey[0],
						},
				  }
				: {
						primary: {
							dark: colorKey.primary[1],
							main: colorKey.primary[2],
							light: colorKey.primary[4],
						},
						neutral: {
							dark: colorKey.grey[3],
							main: colorKey.grey[4],
							mediumMain: colorKey.grey[5],
							medium: colorKey.grey[6],
							light: colorKey.grey[8],
						},
						background: {
							default: colorKey.grey[10],
							alt: colorKey.grey[9],
						},
				  }),
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
