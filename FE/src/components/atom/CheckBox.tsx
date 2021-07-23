import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';

function CheckBox(){
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      color={"primary"}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
}

export default CheckBox