import React from 'react';
import { Button } from '@mui/material';
export default function SidebarButton({ href, children }) {
    const handleClick = () => {
        // resetDocument(getConfiguration(href));
    };
    return (React.createElement(Button, { size: "small", href: href, onClick: handleClick }, children));
}
//# sourceMappingURL=SidebarButton.js.map