var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import { VerticalAlignBottomOutlined, VerticalAlignCenterOutlined, VerticalAlignTopOutlined, } from '@mui/icons-material';
import { Stack, ToggleButton, Button, CircularProgress, Typography } from '@mui/material';
import { ImagePropsSchema } from '@usewaypoint/block-image';
import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextDimensionInput from './helpers/inputs/TextDimensionInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
export default function ImageSidebarPanel({ data, setData }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const [, setErrors] = useState(null);
    // Track upload state
    const [isUploading, setIsUploading] = useState(false);
    const updateData = (d) => {
        const res = ImagePropsSchema.safeParse(d);
        if (res.success) {
            setData(res.data);
            setErrors(null);
        }
        else {
            setErrors(res.error);
        }
    };
    // --------- NEW FUNCTION TO HANDLE FILE UPLOAD ---------
    const handleFileChange = (e) => __awaiter(this, void 0, void 0, function* () {
        if (!e.target.files || e.target.files.length === 0)
            return;
        setIsUploading(true);
        const file = e.target.files[0];
        try {
            const formData = new FormData();
            // Make sure the field name here matches what your Laravel controller expects, 
            // e.g., 'image' or 'file' or similar.
            formData.append('image', file);
            // POST the formData to your Laravel endpoint.
            // Adjust this URL to your actual backend route.
            const response = yield fetch('https://staging-api.train321.com/api/upload-image-for-email', {
                method: 'POST',
                body: formData,
                // If you need authentication or headers:
                // headers: {
                //   'Authorization': 'Bearer <token>',
                // },
            });
            if (!response.ok) {
                throw new Error('File upload failed.');
            }
            // Assuming your Laravel backend returns a JSON object with { "url": "https://..." }
            const responseData = yield response.json();
            if (!responseData.url) {
                throw new Error('No URL returned from upload.');
            }
            // Update the image 'url' with the returned URL from the backend
            updateData(Object.assign(Object.assign({}, data), { props: Object.assign(Object.assign({}, data.props), { url: responseData.url }) }));
        }
        catch (error) {
            console.error('Error uploading file:', error);
            // You might want to show an error message to the user here
        }
        finally {
            setIsUploading(false);
        }
    });
    // -------------------------------------------------------
    return (React.createElement(BaseSidebarPanel, { title: "Image block" },
        React.createElement(TextInput, { label: "Source URL", defaultValue: (_b = (_a = data.props) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : '', onChange: (v) => {
                const url = v.trim().length === 0 ? null : v.trim();
                updateData(Object.assign(Object.assign({}, data), { props: Object.assign(Object.assign({}, data.props), { url }) }));
            } }),
        isUploading ? (React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 1, sx: { mt: 1, mb: 2 } },
            React.createElement(CircularProgress, { size: 20 }),
            React.createElement(Typography, { variant: "body2" }, "Uploading..."))) : (React.createElement(Button, { variant: "contained", component: "label", sx: { mt: 1, mb: 2 } },
            "Upload Image",
            React.createElement("input", { type: "file", hidden: true, accept: "image/*", onChange: handleFileChange }))),
        React.createElement(TextInput, { label: "Alt text", defaultValue: (_d = (_c = data.props) === null || _c === void 0 ? void 0 : _c.alt) !== null && _d !== void 0 ? _d : '', onChange: (alt) => updateData(Object.assign(Object.assign({}, data), { props: Object.assign(Object.assign({}, data.props), { alt }) })) }),
        React.createElement(TextInput, { label: "Click through URL", defaultValue: (_f = (_e = data.props) === null || _e === void 0 ? void 0 : _e.linkHref) !== null && _f !== void 0 ? _f : '', onChange: (v) => {
                const linkHref = v.trim().length === 0 ? null : v.trim();
                updateData(Object.assign(Object.assign({}, data), { props: Object.assign(Object.assign({}, data.props), { linkHref }) }));
            } }),
        React.createElement(Stack, { direction: "row", spacing: 2 },
            React.createElement(TextDimensionInput, { label: "Width", defaultValue: (_g = data.props) === null || _g === void 0 ? void 0 : _g.width, onChange: (width) => updateData(Object.assign(Object.assign({}, data), { props: Object.assign(Object.assign({}, data.props), { width }) })) }),
            React.createElement(TextDimensionInput, { label: "Height", defaultValue: (_h = data.props) === null || _h === void 0 ? void 0 : _h.height, onChange: (height) => updateData(Object.assign(Object.assign({}, data), { props: Object.assign(Object.assign({}, data.props), { height }) })) })),
        React.createElement(RadioGroupInput, { label: "Alignment", defaultValue: (_k = (_j = data.props) === null || _j === void 0 ? void 0 : _j.contentAlignment) !== null && _k !== void 0 ? _k : 'middle', onChange: (contentAlignment) => updateData(Object.assign(Object.assign({}, data), { props: Object.assign(Object.assign({}, data.props), { contentAlignment }) })) },
            React.createElement(ToggleButton, { value: "top" },
                React.createElement(VerticalAlignTopOutlined, { fontSize: "small" })),
            React.createElement(ToggleButton, { value: "middle" },
                React.createElement(VerticalAlignCenterOutlined, { fontSize: "small" })),
            React.createElement(ToggleButton, { value: "bottom" },
                React.createElement(VerticalAlignBottomOutlined, { fontSize: "small" }))),
        React.createElement(MultiStylePropertyPanel, { names: ['backgroundColor', 'textAlign', 'padding'], value: data.style, onChange: (style) => updateData(Object.assign(Object.assign({}, data), { style })) })));
}
//# sourceMappingURL=ImageSidebarPanel.js.map