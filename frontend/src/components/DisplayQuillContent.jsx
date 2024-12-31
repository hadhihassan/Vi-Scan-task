import { Typography } from "@mui/material";
import DOMPurify from "dompurify";

const DisplayQuillContent = ({ content }) => {
    
    const limitedContent = content?.slice(0, 100);
    const sanitizedContent = DOMPurify.sanitize(limitedContent);

    return (
        <Typography
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></Typography>
    );
};

export default DisplayQuillContent;
