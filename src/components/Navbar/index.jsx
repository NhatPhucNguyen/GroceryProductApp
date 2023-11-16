import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

const Nav = styled.nav`
    background: #000;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
`;

const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #15cdfc;
    }
`;
const Bars = styled(FaBars)`
    display: none;
    color: #fff;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

// const NavBtn = styled.nav`
//     display: flex;
//     align-items: center;
//     margin-right: 24px;

//     @media screen and (max-width: 768px) {
//         display: none;
//     }
// `;
const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;

const Navbar = () => {
    return (
        <div>
            <Nav>
                <NavLink to="/">
                    <img
                        src="../../images/logo.png"
                        alt="logo"
                        style={{ width: "100px", height: "auto" }}
                    />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/about" >
                        About
                    </NavLink>
                    <NavLink to="/products" >
                        Products
                    </NavLink>
                    <NavLink to="/contact-us" >
                        Contact Us
                    </NavLink>
                    <NavLink to="/sign-up">
                        Sign Up
                    </NavLink>
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                </NavMenu>
                {/*<NavBtn>
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
    </NavBtn>*/}
            </Nav>
        </div>
    );
};

export default Navbar;
