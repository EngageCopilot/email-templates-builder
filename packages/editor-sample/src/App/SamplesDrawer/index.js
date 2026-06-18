import React from 'react';
import { Drawer } from '@mui/material';
import { useSamplesDrawerOpen } from '../../documents/editor/EditorContext';
export const SAMPLES_DRAWER_WIDTH = 0;
export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();
  return React.createElement(Drawer, {
    variant: 'persistent',
    anchor: 'left',
    open: samplesDrawerOpen,
    sx: {
      width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
    },
  });
}
//# sourceMappingURL=index.js.map
