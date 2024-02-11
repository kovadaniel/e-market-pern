import { useContext } from "react";
import { AppContext } from "../context";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import cartIcon from "../assets/images/cart.svg"
 

const NavBar = observer(() => {
    const { store: { user } } = useContext(AppContext);
    const navigate = useNavigate();

    const handleExit = () => {
        navigate(LOGIN_ROUTE);
        user.logout();
    }

    return (  
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink className="navlink" to={SHOP_ROUTE}>Magaz</NavLink>
                {user.isAuth ?
                <Nav className="mv-auto navlink">
                    {user.user.role === "ADMIN" &&
                        <Button
                            variant="outline-light"
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>}
                    <Image
                        src={cartIcon} 
                        className="cart-icon ms-2"
                        onClick={() => navigate(BASKET_ROUTE)}/>
                    <Button
                        variant="outline-light"
                        className="ms-2"
                        onClick={handleExit}
                    >
                        Выйти
                    </Button>

                </Nav>
                : 
                <Nav className="mv-auto navlink">
                    <Button 
                        variant="outline-light"
                        onClick={handleExit}
                    >
                        Авторизация
                    </Button>

                </Nav>}
            </Container>
      </Navbar>
    );
})
 
export default NavBar;