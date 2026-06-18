var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import React, { useEffect } from 'react';
import { MonitorOutlined, PhoneIphoneOutlined } from '@mui/icons-material';
import { Box, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import EditorBlock from '../../documents/editor/EditorBlock';
import {
  setSelectedScreenSize,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
  resetDocument,
} from '../../documents/editor/EditorContext';
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';
import ToggleSamplesPanelButton from '../SamplesDrawer/ToggleSamplesPanelButton';
import DownloadJson from './DownloadJson';
import HtmlPanel from './HtmlPanel';
import ImportJson from './ImportJson';
import JsonPanel from './JsonPanel';
import MainTabsGroup from './MainTabsGroup';
import ShareButton from './ShareButton';
import { Reader } from '@usewaypoint/email-builder';
export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();
  const queryParams = new URLSearchParams(location.search);
  const template_id = queryParams.get('template_id');
  let mainBoxSx = Object.assign(
    { height: '100%' },
    selectedScreenSize === 'mobile' && {
      margin: '32px auto',
      width: 370,
      height: 800,
      boxShadow:
        'rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px',
    }
  );
  const handleScreenSizeChange = (_, value) => {
    setSelectedScreenSize(value || 'desktop');
  };
  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return React.createElement(Box, { sx: mainBoxSx }, React.createElement(EditorBlock, { id: 'root' }));
      case 'preview':
        return React.createElement(
          Box,
          { sx: mainBoxSx },
          React.createElement(Reader, { document: document, rootBlockId: 'root' })
        );
      case 'html':
        return React.createElement(HtmlPanel, null);
      case 'json':
        return React.createElement(JsonPanel, null);
      default:
        return null;
    }
  };
  useEffect(() => {
    function fetchData() {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const response = yield fetch(`https://staging-api.train321.com/api/email-template-json/${template_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = yield response.json();
          resetDocument(data);
        } catch (error) {
          console.error('Error fetching email template:', error);
          // Optionally update state to show an error message or UI feedback
        }
      });
    }
    fetchData();
    return () => {
      // Cleanup if needed
    };
  }, [template_id]); // Ensuring fetchData runs when template_id changes
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Stack,
      {
        sx: {
          height: 49,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          px: 1,
        },
        direction: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      React.createElement(ToggleSamplesPanelButton, null),
      React.createElement(
        Stack,
        { px: 2, direction: 'row', gap: 2, width: '100%', justifyContent: 'space-between', alignItems: 'center' },
        React.createElement(Stack, { direction: 'row', spacing: 2 }, React.createElement(MainTabsGroup, null)),
        React.createElement(
          Stack,
          { direction: 'row', spacing: 2 },
          React.createElement(DownloadJson, null),
          React.createElement(ImportJson, null),
          React.createElement(
            ToggleButtonGroup,
            { value: selectedScreenSize, exclusive: true, size: 'small', onChange: handleScreenSizeChange },
            React.createElement(
              ToggleButton,
              { value: 'desktop' },
              React.createElement(
                Tooltip,
                { title: 'Desktop view' },
                React.createElement(MonitorOutlined, { fontSize: 'small' })
              )
            ),
            React.createElement(
              ToggleButton,
              { value: 'mobile' },
              React.createElement(
                Tooltip,
                { title: 'Mobile view' },
                React.createElement(PhoneIphoneOutlined, { fontSize: 'small' })
              )
            )
          ),
          React.createElement(ShareButton, null)
        )
      ),
      React.createElement(ToggleInspectorPanelButton, null)
    ),
    React.createElement(
      Box,
      { sx: { height: 'calc(100vh - 49px)', overflow: 'auto', minWidth: 370 } },
      renderMainPanel()
    )
  );
}
//# sourceMappingURL=index.js.map
