import navbarStyles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<div className={navbarStyles.container}>
			<div className={navbarStyles.navbarLeft}>
				<div className={navbarStyles.logo}>SociaLite</div>

				<div className={navbarStyles.searchBar}>
					<input type="text" />
				</div>
			</div>

			<div className={navbarStyles.navbarRight}>
				<div className={navbarStyles.buttonCluster}>
					<div className={navbarStyles.messages}>messages</div>

					<div className={navbarStyles.notifications}>notifications</div>
				</div>
				<div className={navbarStyles.userOptions}>Kanishk</div>
			</div>
		</div>
	);
};

export default Navbar;
