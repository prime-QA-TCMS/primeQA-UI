import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Button,
	Box,
	Typography,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';
import {
	Dashboard as DashboardIcon,
	FolderOpen as ProjectsIcon,
	PlayArrow as RunsIcon,
	Assessment as ReportsIcon,
	Settings as SettingsIcon,
	AccountCircle,
} from '@mui/icons-material';

const Navigation: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		navigate('/login');
		handleUserMenuClose();
	};

	const isActive = (path: string) => {
		if (path === '/dashboard') {
			return location.pathname === '/dashboard';
		}
		return location.pathname.startsWith(path);
	};

	const navItems = [
		{ label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
		{ label: 'Projects', path: '/projects', icon: <ProjectsIcon /> },
		{ label: 'Reports', path: '/reports', icon: <ReportsIcon /> },
		{ label: 'Configuration', path: '/configuration', icon: <SettingsIcon /> },
	];

	return (
		<AppBar position="static" color="default" elevation={1}>
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{ mr: 4, cursor: 'pointer' }}
					onClick={() => navigate('/dashboard')}
				>
					PrimeQA
				</Typography>

				<Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
					{navItems.map((item) => (
						<Button
							key={item.path}
							startIcon={item.icon}
							onClick={() => navigate(item.path)}
							sx={{
								color: isActive(item.path) ? 'primary.main' : 'text.primary',
								borderBottom: isActive(item.path)
									? '2px solid'
									: '2px solid transparent',
								borderRadius: 0,
								'&:hover': {
									backgroundColor: 'action.hover',
								},
							}}
						>
							{item.label}
						</Button>
					))}
				</Box>

				<IconButton
					size="large"
					edge="end"
					aria-label="account"
					aria-controls="user-menu"
					aria-haspopup="true"
					onClick={handleUserMenuOpen}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<Menu
					id="user-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleUserMenuClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
					<MenuItem onClick={handleUserMenuClose}>My Account</MenuItem>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

export default Navigation;
