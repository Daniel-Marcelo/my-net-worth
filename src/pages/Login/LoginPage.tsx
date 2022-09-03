import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { x } from "@xstyled/styled-components";
import GoogleButton from "react-google-button";
import { useLogin } from "./useLogin";

export function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = () => {};
  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={32}>
      <x.div letterSpacing="5px" fontSize="32px">
        LOGIN
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
          />
          <x.div mt={4}>
            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              variant="outlined"
            />
          </x.div>
        </x.div>

        <x.div mt={4}>
          <Button size="large" variant="contained" onClick={onClickLogin}>
            <x.span px={48}>LOGIN</x.span>
          </Button>
        </x.div>

        <x.div mt={4}>
          <GoogleButton onClick={() => login()} />
        </x.div>
      </x.div>
    </x.div>
  );
}
