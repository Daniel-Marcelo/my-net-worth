import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { x } from "@xstyled/styled-components";
import { GoogleLoginButton } from "react-social-login-buttons";
import passwordValidator from "password-validator";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmail, useLoginWithGoogle } from "../../hooks/useAuth";

function validate(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const PasswordValidator = passwordValidator;
const schema = new PasswordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

export function RegisterPage() {
  // Form fields
  const [passwordRulesValid, setPasswordRulesValid] = useState(schema.validate("", { list: true }) as string[]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [clickedSave, setClickedSave] = useState(false);

  const navigate = useNavigate();

  const loginWithGoogleMutation = useLoginWithGoogle();
  const createWithEmailMutation = useCreateUserWithEmail();

  useEffect(() => {
    const passwordValid = schema.validate(password, { list: true }) as string[];
    setPasswordRulesValid(passwordValid);
  }, [password]);

  const onClickRegister = async () => {
    setClickedSave(true);
    if (validate(email) && !passwordRulesValid.length) {
      createWithEmailMutation.mutate(
        { email, password },
        {
          onSuccess: () => navigate("/portfolios"),
        }
      );
    }
  };

  const renderIcon = (rule: string) =>
    passwordRulesValid.includes(rule) ? <CloseIcon color="error" /> : <CheckIcon color="success" />;

  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" p={8}>
      <x.div letterSpacing="widest" fontSize={{ sm: "3xl", md: "5xl" }} mb={4}>
        REGISTER
      </x.div>
      <x.div
        p={8}
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="blue-gray-300"
      >
        <x.div w="100%">
          <TextField
            fullWidth
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            variant="outlined"
            helperText={clickedSave && "Please enter a valid email address"}
            error={clickedSave && !validate(email)}
          />
          <x.div mt={4}>
            <TextField
              fullWidth
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              label="FirstName"
              variant="outlined"
              helperText={clickedSave && "Please enter a valid name"}
              error={clickedSave && !firstName}
            />
          </x.div>

          <x.div mt={4}>
            <TextField
              fullWidth
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              label="LastName"
              variant="outlined"
              helperText={clickedSave && "Please enter a valid name"}
              error={clickedSave && !lastName}
            />
          </x.div>

          <x.div mt={4}>
            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              variant="outlined"
              helperText={clickedSave && "Please enter a valid password"}
              error={clickedSave && !!passwordRulesValid.length}
            />
          </x.div>
        </x.div>

        <x.div display="flex" flexDirection="column">
          <x.span mt={4} mb={0.5}>
            {renderIcon("min")}
            <x.span ml={4} fontSize="sm">
              Minimum 8 characters
            </x.span>
          </x.span>

          <x.span my={0.5} fontSize="sm">
            {renderIcon("uppercase")}
            <x.span ml={4}>Minimum 1 uppercase letter</x.span>
          </x.span>

          <x.span my={0.5} fontSize="sm">
            {renderIcon("lowercase")}
            <x.span ml={4}>Minimum 1 lowercase letter</x.span>
          </x.span>

          <x.span my={0.5} fontSize="sm">
            {renderIcon("digits")}
            <x.span ml={4}>Minimum 1 number</x.span>
          </x.span>
        </x.div>

        <x.div mt={4}>
          <Button size="large" variant="contained" onClick={onClickRegister}>
            <x.span>REGISTER</x.span>
          </Button>
        </x.div>
      </x.div>

      <x.div mt={4}>
        <GoogleLoginButton onClick={loginWithGoogleMutation.mutate} />
      </x.div>
    </x.div>
  );
}
