import NavLink from "@/Components/NavLink"

const NavItem = ({ href, icon: Icon, active }) => {
    return (
        <NavLink href={href} active={active} className="flex items-center justify-center p-2 rounded">
            <Icon size={20} />
        </NavLink>
    )
}

export default NavItem
