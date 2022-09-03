import { Button } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useNavigate } from "react-router-dom";

export function HomePage() {
    const navigate = useNavigate();

    const onClickLogin = () => {
        navigate('/login', { replace: true })
    }
  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={32}>
      <x.div letterSpacing="10px" fontSize="58px">
        MY NET WORTH
      </x.div>

      <x.div mt={32}>
        <Button size="large" variant="contained" onClick={onClickLogin}>
          <x.span px={48}>LOGIN</x.span>
        </Button>
      </x.div>
    </x.div>
  );
}
