import { Alert, AlertColor } from '@mui/material';
import React from 'react';

export const Info = ({
    message,
    status,
    fn,
    className,
}: {
    message: string;
    status: AlertColor | undefined;
    fn: () => void;
    className: string;
}) => {
    setTimeout(() => {
        fn();
    }, 2000);

    return (
        <Alert className={className} severity={status}>
            {message}
        </Alert>
    );
};
