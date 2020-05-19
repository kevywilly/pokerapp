import React from 'react';
import {useState} from "react";
import {
    Avatar,
    Button,
    Container,
    Paper,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid, Box,
    Link
} from "@material-ui/core";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {AuthAPI} from "./auth/auth.api";


const LoginPage = (props: {exampleprop?: string}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const passwordHandler = (event: { target: { value: string }; }) => {
        setPassword(event.target.value);
        setErrorMessage(null)
    }

    const usernameHandler = (event: { target: { value: string }; }) => {
        setUsername(event.target.value);
        setErrorMessage(null)
    }

    const submitHandler = () => {
        setErrorMessage(null)
        AuthAPI.login(username, password);
    }

    return (
        <Container  maxWidth="sm">
            <Box p={2} marginTop={4} m="auto">
                <Paper>
                    <Box p={4}>
                        <div>
                            <Avatar >
                                <LockOutlinedIcon color="primary"/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in {props.exampleprop}
                            </Typography>
                        </div>

                        <div >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                defaultValue={username}
                                autoComplete="username"
                                autoFocus
                                onChange={usernameHandler}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                defaultValue={password}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={passwordHandler}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" defaultChecked />}
                                label="Remember me"
                            />
                            <Button

                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={password.length === 0 || username.length === 0}
                                onClick={submitHandler}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Typography align="center" component = "p" color="error">
                                {errorMessage}
                            </Typography>
                        </div>
                    </Box>
                </Paper>

            </Box>
        </Container>
    );
}

export default LoginPage;
