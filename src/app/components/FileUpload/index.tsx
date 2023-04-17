import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useUploadFile} from '$hooks/useUpload';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
    onUploadSuccess: (url: string) => void;
};

export default function FileUpload(props: Props) {
    const {onUploadSuccess} = props;
    const {upload, data, isLoading} = useUploadFile();
    const [file, setFile] = useState<File>();

    useEffect(() => {
        if (data) {
            onUploadSuccess(data.imageName);
        }
    }, [data]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;

        if (files?.length) {
            setFile(files[0]);
        }
    };

    const handleUploadClick = () => {
        if (file) {
            upload(file);
        }
    };

    return (
        <Stack direction={{xs: 'column', sm: 'row'}} alignItems='center' justifyContent='center' spacing={2}>
            <label htmlFor='icon-button-file' data-testid='input-image'>
                <Button variant='outlined'>
                    <input id='icon-button-file' type='file' onChange={handleFileChange} accept='image/*'/>
                </Button>
            </label>

            <LoadingButton
                variant='contained'
                component='span'
                onClick={handleUploadClick}
                loading={isLoading}
                data-testid='btn-upload'
            >
                Upload
            </LoadingButton>
        </Stack>
    );
}
