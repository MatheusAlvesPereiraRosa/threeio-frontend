import { NavLink } from "react-router-dom"

import { motion } from 'framer-motion'

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-cyan-900">
            <ul className="flex items-center">
                <motion.li
                    whileTap={{ scale: 0.9 }}
                    className="p-5 text-xl text-white "
                >
                    <NavLink
                        to="/"
                        className={({
                            isActive,
                            isPending,
                        }: {
                            isActive: boolean;
                            isPending: boolean;
                        }) => {
                            return isActive ? "active-link" : isPending ? "pending" : "";
                        }}
                    >
                        <a className="hover:text-amber-500 link">Math</a>
                    </NavLink>
                </motion.li>
            </ul>

            <motion.div
                className="me-4"
                whileTap={{ scale: 0.9 }}

            >
                <NavLink
                    to="/logout"
                >
                    <a className="hover:text-amber-500 p-3 text-xl text-white link">Logout</a>
                </NavLink>
            </motion.div>
        </nav>
    );
};