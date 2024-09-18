import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
const Register = () => {

  const {resgisterInfor,updateRegisterInfor,registerUser,registerError,isRegisterLoading} = useContext(AuthContext)
  return (
    <>
      <Form onSubmit={registerUser}>
      
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              <Form.Control type="text" placeholder="Enter Name..." onChange={(e)=>updateRegisterInfor({...resgisterInfor,name:e.target.value})}/>
              <Form.Control type="email" placeholder="Enter Email..." onChange={(e)=>updateRegisterInfor({...resgisterInfor,email:e.target.value})}/>
              <Form.Control type="password" placeholder="Enter Password..." onChange={(e)=>updateRegisterInfor({...resgisterInfor,password:e.target.value})}/>
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Registing..." : "Register"}
              </Button>
              {registerError?.error &&   <Alert variant="danger"><p>{registerError?.messages}</p></Alert>}
            
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
