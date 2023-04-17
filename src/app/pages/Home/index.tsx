import React, {useState} from 'react';
import Container from '@mui/material/Container';
import FileUpload from '$components/FileUpload';
import ImagePreview from '$components/ImagePreview';
import Box from '@mui/material/Box';

export default function Home() {
    const [imageName, setImageName] = useState<string>('');

    return (
        <Container sx={{paddingTop: 2}}>
            <Box sx={{mb: 2}} data-testid='file-upload'>
                <FileUpload onUploadSuccess={(imageName) => setImageName(imageName)}/>
            </Box>
            <Box sx={{mb: 2}} data-testid='image-preview'>
                <ImagePreview imageName={imageName}/>
            </Box>
        </Container>
    );
}
