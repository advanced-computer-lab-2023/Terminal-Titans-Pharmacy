import React, { useContext, useRef, useState } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSearch,
    SSearchIcon,
    SSidebar,
    SSidebarButton,
    SToggleThumb,
} from "./sidebarstyle";

import {
    AiOutlineApartment,
    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineSearch,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdChat, MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const searchRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const signoutButtonFunc = () => {
        sessionStorage.removeItem('token');
        
        window.location.href = 'http://localhost:3000/Health-Plus';;
    };
    const token = sessionStorage.getItem("token");
    const navigateChat=()=>{
      window.postMessage({ key: "token", value: sessionStorage.getItem("token") }, "*");
      window.location.href = `http://localhost:3000/Health-Plus/chat/${token}`;          
    }

    const linksArray = [
        {
            label: "Home",
            icon: <AiOutlineHome />,
            to: "/patient",
            notification: 0,
        },
        {
            label: "Orders History",
            icon: <MdOutlineAnalytics />,
            to: "/orderDetails",
            notification: 3,
        },
        {
            label: "Cart",
            icon: <AiOutlineApartment />,
            to: "/cart",
            notification: 0,
        },
        {
            label: "Clinic Account",
            icon: <BsPeople />,
            to: "http://localhost:3000/Health-Plus/patientHome",
            notification: 1,
        },
    ];

    const secondaryLinksArray = [
        {
            label: "chat",
            icon: <MdChat />, 
            onClick: navigateChat,
        },
        {
            label: "Logout",
            icon: <MdLogout />,
            onClick: signoutButtonFunc,
        },
    ];

    const searchClickHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            searchRef.current.focus();
        } else {
            // search functionality
        }
    };

    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo to="/patient" style={!sidebarOpen ? { width: `fit-content` } : {}} />
            <SDivider />
            {linksArray.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {!!notification && (
                                    <SLinkNotification>{notification}</SLinkNotification>
                                )}
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {secondaryLinksArray.map(({ icon, label, onClick }) => (
                <SLinkContainer key={label}>
                    <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}} onClick={onClick}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
        </SSidebar>
    );
};

export default Sidebar;
