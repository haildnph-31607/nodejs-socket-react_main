import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
const Login = () => {
  const { Login, loginError, loginInfor, updateLoginInfor, isLoginLoading } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={Login}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                placeholder="Enter Email..."
                onChange={(e) =>
                  updateLoginInfor({ ...loginInfor, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Enter Password..."
                onChange={(e) =>
                  updateLoginInfor({ ...loginInfor, password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
               {isLoginLoading ? "Login..." :" Login"}
              </Button>
              {loginError && (
                <Alert variant="danger">
                  <p>{loginError.messages}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
