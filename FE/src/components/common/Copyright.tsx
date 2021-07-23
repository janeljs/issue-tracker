import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
  return (
    <CopyrightBlock>
      <Typography variant='body2' color='textSecondary' align='center'>
        'Copyright © '
        <Link color='inherit' href='https://material-ui.com/'>
          Issue Tracker
        </Link>
        {new Date().getFullYear()}
        '.'
      </Typography>
    </CopyrightBlock>
  );
}

const CopyrightBlock = styled.div``;
