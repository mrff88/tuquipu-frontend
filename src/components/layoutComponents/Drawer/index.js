import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { STYLES } from '../../../constants';

const { DRAWER_WIDTH: drawerWidth } = STYLES;

const Drawer = styled(MuiDrawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

export default Drawer;
