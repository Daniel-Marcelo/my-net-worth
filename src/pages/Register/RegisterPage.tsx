import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { x } from "@xstyled/styled-components";
import { GoogleLoginButton } from "react-social-login-buttons";
import passwordValidator from "password-validator";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useLogin } from "./useLogin";

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
  const [passwordRulesValid, setPasswordRulesValid] = useState(schema.validate("", { list: true }) as any[]);
  const [loginWithGoogle, loginWithEmailPassword] = useLogin();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [clickedSave, setClickedSave] = useState(false);

  console.log(schema.validate("", { list: true }) as any[]);
  useEffect(() => {
    const passwordValid = schema.validate(password, { list: true }) as any[];
    setPasswordRulesValid(passwordValid);
  }, [password]);

  const onClickRegister = () => {
    setClickedSave(true);
    // const passwordValid = schema.validate(password, { list: true }) as string[];
    // console.log(passwordValid);
    if (validate(email) && !passwordRulesValid.length) {
      loginWithEmailPassword(email, password);
    }
  };

  const renderIcon = (rule: string) =>
    passwordRulesValid.includes(rule) ? <CloseIcon color="error" /> : <CheckIcon color="success" />;

  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={32}>
      <x.div letterSpacing="5px" fontSize="32px">
        REGISTER FOR MY NET WORTH
      </x.div>
      <x.div mt={16} display="flex" flexDirection="column" alignItems="center">
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
            <x.span ml={4}>Minimum of 8 characters in length</x.span>
          </x.span>

          <x.span my={0.5}>
            {renderIcon("uppercase")}
            <x.span ml={4}>At least 1 uppercase letter</x.span>
          </x.span>

          <x.span my={0.5}>
            {renderIcon("lowercase")}
            <x.span ml={4}>At least 1 lowercase letter</x.span>
          </x.span>

          <x.span my={0.5}>
            {renderIcon("digits")}
            <x.span ml={4}>At least 1 number</x.span>
          </x.span>
        </x.div>

        <x.div mt={4}>
          <Button size="large" variant="contained" onClick={onClickRegister}>
            <x.span px={48}>REGISTER</x.span>
          </Button>
        </x.div>

        <x.div mt={4}>
          <GoogleLoginButton onClick={() => loginWithGoogle()} />
        </x.div>
      </x.div>
    </x.div>
  );
}
