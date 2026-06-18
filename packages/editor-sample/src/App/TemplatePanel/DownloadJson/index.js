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
import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { FileDownloadOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useDocument } from '../../../documents/editor/EditorContext';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';
export default function DownloadJson() {
  const doc = useDocument();
  const html_code = useMemo(() => renderToStaticMarkup(doc, { rootBlockId: 'root' }), [doc]);
  const saveTemplate = useCallback(
    () =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const queryParams = new URLSearchParams(location.search);
          const template_id = queryParams.get('template_id');
          const response = yield axios.post(`https://staging-api.train321.com/api/save-template-json/${template_id}`, {
            content: JSON.stringify(doc, null, '  '), // send the document as a stringified JSON
            html_code: html_code,
          });
          console.log('Response:', response.data); // handle response based on your API specification
        } catch (error) {
          console.error('Failed to save template:', error);
        }
      }),
    [doc]
  );
  return React.createElement(
    Tooltip,
    { title: 'Save Template' },
    React.createElement(
      IconButton,
      { onClick: saveTemplate },
      React.createElement(FileDownloadOutlined, { fontSize: 'small' })
    )
  );
}
//# sourceMappingURL=index.js.map
