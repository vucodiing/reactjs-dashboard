import { Skeleton, MenuList, MenuItem } from '@mui/material';

export default function SidebarSkeleton() {
  return (
    <div style={{ padding: '8px' }}>
      <MenuList>
        {Array.from({ length: 5 }).map((_, i) => (
          <MenuItem key={i}>
            {/* <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} /> */}
            <Skeleton
              variant="text"
              width="100%"
              height={36}
              sx={{
                bgcolor: 'var(--sidebar-skeleton-bg-sidebar)',
                '&::after': {
                  background:
                    'linear-gradient(90deg, transparent, var(--sidebar-skeleton-shimmer), transparent)',
                },
              }}
            />
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
}
