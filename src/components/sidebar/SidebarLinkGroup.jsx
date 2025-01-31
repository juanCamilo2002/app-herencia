import { useState } from 'react'

const SidebarLinkGroup = ({ children, activateCondition }) => {

  const [open, setOpen] = useState(activateCondition);

  const handleClick = () => {
    setOpen(!open);
  }
  return <li>{children(handleClick, open)}</li>
}

export default SidebarLinkGroup