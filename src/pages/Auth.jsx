import { Button, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { AppContext } from "../context";


const Auth = observer(() => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const auth = async () => {
        try{
            setError("");
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            if (data) {
                user.setUser(data);
                user.setIsAuth(true);
                navigate(SHOP_ROUTE)
            }
        } catch(e) {
            //alert(e.response?.data.message)
            setError(e.response ? e.response.data.message : "Неизвестная ошибка")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        auth();
    }

    return (  
        <Container 
            className="d-flex justify-content-center align-items-center page-main-container"
        >
            <Card className="p-5 auth-container">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                        required
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                        type="password"
                        required
                    />
                    {error && (
                        <Row>
                            <div className="auth-error-message mt-2">{error}!</div>
                        </Row>
                    )}
                    <Row className="d-flex justify-content-between mt-3 ps-3 pe-3">
                        {isLogin ?
                            <div className="w-auto" >
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            : 
                            <div className="w-auto" >
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button 
                            variant="outline-success" 
                            className="w-auto" 
                            type="submit"
                        >
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button> 
                    </Row>
                   
                </Form>
            </Card>

        </Container>
    );
})
 
export default Auth;