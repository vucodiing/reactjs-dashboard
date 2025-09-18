import { MenuList, MenuItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSettingStore } from '../../store/useSettingStore';
import { useUserStore } from '@/store/userStore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { filterRoutesByRole } from '@/utils/routerUtils';
import routes from '../../router/routes';
import styles from './Sidebar.module.scss';
export default function SidebarMenu() {
  const { isSidebarOpen } = useSettingStore();
  const rolesStore = useUserStore((s) => s.roles);
  const allowedRoutes = filterRoutesByRole(routes, rolesStore);
  const location = useLocation();
  const [open, setOpen] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    setOpen(open === name ? null : name);
  };

  useEffect(() => {
    let matchedParent: string | null = null;

    routes[0].children?.forEach((item) => {
      if (item.children) {
        const isMatch = item.children.some((child) =>
          location.pathname.startsWith(`/${item.path}/${child.path}`)
        );
        if (isMatch) {
          matchedParent = item.name!;
        }
      }
    });

    setOpen(matchedParent);
  }, [location.pathname]);

  return (
    <div
      className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebar__open : styles.sidebar__close}`}
      style={{ width: 'var(--sidebar-width)' }}
    >
      <div className={styles.sidebar__logo}>ADMIN</div>
      <MenuList>
        {allowedRoutes[0].children?.map((item) => {
          const Icon = item.icon;
          if (item.children) {
            return (
              <div key={item.name}>
                <MenuItem onClick={() => handleToggle(item.name!)}>
                  {Icon && (
                    <ListItemIcon>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.name} />
                  {open === item.name ? <ExpandLess className="" /> : <ExpandMore />}
                </MenuItem>
                <Collapse
                  in={open === item.name && isSidebarOpen}
                  timeout="auto"
                  unmountOnExit
                  className={styles.sidebar__level2}
                >
                  <MenuList>
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.name}
                        component={NavLink}
                        to={`/${item.path}/${child.path}`}
                        sx={{
                          '&.active': {
                            backgroundColor: 'var(--sidebar-active-bg)',
                            color: 'var(--sidebar-active-color)',
                            fontWeight: 'bold',
                            svg: { color: 'var(--sidebar-active-color)' },
                          },
                        }}
                      >
                        <ListItemText primary={child.name} />
                      </MenuItem>
                    ))}
                  </MenuList>
                </Collapse>
              </div>
            );
          }
          return (
            <MenuItem
              key={item.name}
              component={NavLink}
              to={item.path || ''}
              sx={{
                '&.active': {
                  backgroundColor: 'var(--sidebar-active-bg)',
                  color: 'var(--sidebar-active-color)',
                  fontWeight: 'bold',
                  svg: { color: 'var(--sidebar-active-color)' },
                },
              }}
            >
              {Icon && (
                <ListItemIcon>
                  <Icon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText primary={item.name} />
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
}
