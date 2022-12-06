import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="whitesmoke" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Playlister
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}