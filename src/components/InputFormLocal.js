import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCallback, useState, useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://twitter.com/AluminumMikan">
        AlMikan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function InputFormLocal({ localPeerName, setlocalPeerName }) {
  const label = "あなたの名前";
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [isComposed, setIsComposed] = useState(false);

  useEffect(() => {
    const disabled = name === "";
    setDisabled(disabled);
  }, [name]);

  const initializeLocalPeer = useCallback((e) => {
    console.log('peer')
    setlocalPeerName(name);
    e.preventDefault();
  },[name,setlocalPeerName]);

  if(localPeerName!=='')return <></>;

  console.log({ name });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {label}を入力してください
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label={label}
              onChange={(e) => setName(e.target.value)}
              onCompositionEnd={() => {
                setIsComposed(false);
              }}
              onCompositionStart={() => {
                setIsComposed(true);
              }}
              onKeyDown={(e) => {
                console.log({ e });
                if(isComposed) return;
                if(e.target.value==='') return;
                if (e.key === "Enter") {
                  initializeLocalPeer(e);
                }
              }}
              value={name}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
              onClick={(e)=>{
                initializeLocalPeer(e);
              }}
            >
              決定
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
