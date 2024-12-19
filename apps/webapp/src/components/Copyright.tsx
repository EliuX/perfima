import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <MuiLink color="inherit" href="perfima.com/">
        Perfima
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
