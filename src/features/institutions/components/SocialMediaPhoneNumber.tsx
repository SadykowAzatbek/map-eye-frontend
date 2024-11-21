import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  logo: string;
  name: string;
  open: boolean;
}

const SocialMediaPhoneNumber: React.FC<Props> = ({ logo, name, open }) => {
  return (
    <>
      <Typography component="div" className="social-media-style">
        <img alt={name} src={logo} title={name} className={`${!open && 'no-img'}`} />
      </Typography>
    </>
  );
};

export default SocialMediaPhoneNumber;