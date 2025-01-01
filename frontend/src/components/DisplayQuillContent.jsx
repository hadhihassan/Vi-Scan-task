import { Typography } from "@mui/material";
import DOMPurify from "dompurify";

const DisplayQuillContent = ({ content, viewPage = false }) => {

    const limitedContent = content?.slice(0, 100);
    const sanitizedContent = DOMPurify.sanitize(viewPage ? content : limitedContent);

    return (
        <Typography
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></Typography>
    );
};

export default DisplayQuillContent;
