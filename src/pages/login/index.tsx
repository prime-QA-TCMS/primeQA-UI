import React, { useState } from "react";
import { Container, CircularProgress, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { Popup, Form as GenericForm } from "fog-ui";
import { CustomButton } from "fog-ui";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import { loginContainer } from "../../style/muiComponentStyles/containerStyles";
import { loginFormFields } from "../../Forms/UserManagement";
import { UserAPI } from "../../api"; // ✅ Using standardized UserAPI

const Login: React.FC = () => {
  const theme = useTheme();
  const styles = loginContainer(theme);
  const navigate = useNavigate();

  // ✅ Popup state
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isForgotPasswordPopupOpen, setIsForgotPasswordPopupOpen] = useState(false);

  // ✅ Login state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Handle Login via UserAPI
  const handleLogin = async (formData: { [key: string]: any }) => {
    setLoading(true);
    setError(null);

    try {
      const result = await UserAPI.login({
        email: formData.email,
        password: formData.password,
      });

      // ✅ result is already the AuthResponse
      if (result) {
        const { user, accessToken, refreshToken } = result;

        localStorage.setItem("userId", user.id || user.id);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Login failed.";
      setError(message);
      console.error("Error during login:", err);
    } finally {
      setLoading(false);
    }
  };


  // ✅ Custom action buttons
  const customButtons: CustomButton[] = [
    {
      text: "Register",
      onClick: () => setIsRegisterPopupOpen(true),
      color: "primary",
      variant: "contained",
    },
    {
      text: "Forgot Password?",
      onClick: () => setIsForgotPasswordPopupOpen(true),
      color: "primary",
    },
  ];

  return (
    <Container maxWidth="sm" sx={styles.root}>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Logging in...
          </Typography>
        </Box>
      ) : (
        <>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <GenericForm
            fields={loginFormFields}
            onSubmit={handleLogin}
            submitButtonText={"Login"}
            customButtons={customButtons}
          />
        </>
      )}

      <Popup
        title="Register an account"
        open={isRegisterPopupOpen}
        onClose={() => setIsRegisterPopupOpen(false)}
        component={
          <Register
            onSuccess={() => {
              setIsRegisterPopupOpen(false);
              navigate("/dashboard");
            }}
          />
        }
      />

      <Popup
        title="Forgot Password?"
        open={isForgotPasswordPopupOpen}
        onClose={() => setIsForgotPasswordPopupOpen(false)}
        component={
          <ForgotPassword
            onSuccess={() => {
              setIsForgotPasswordPopupOpen(false);
            }}
          />
        }
      />
    </Container>
  );
};

export default Login;
