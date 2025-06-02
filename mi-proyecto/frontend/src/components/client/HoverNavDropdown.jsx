import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

function HoverNavDropdown({ title, children, ...props }) {
  const [show, setShow] = useState(false);
  let timeout;

  const showDropdown = () => {
    clearTimeout(timeout);
    setShow(true);
  };

  const hideDropdown = () => {
    timeout = setTimeout(() => setShow(false), 100); // retrasa el cierre un poco
  };

  return (
    <NavDropdown
      {...props}
      title={title}
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      {children}
    </NavDropdown>
  );
}

export default HoverNavDropdown;
