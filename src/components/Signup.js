import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { userSignUp } from '../service/Auth';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();

    const initialError = { fnameError: "", lnameError: "", emailError: "", numberError:"", passwordError: "", cpasswordError: "" };
    const [error, setError] = React.useState(initialError);


    const initialInfo = { firstName: '', lastName: '', email: '',contactNumber: '', password: '' };
    const [gdata, setgData] = useState(initialInfo);

    const initialData = { vfname: false, vlname: false, vemail: false,vnumber: false, vpassword: false };
    const [verify, setVerify] = useState(initialData);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = data.get('password');
        const cpassword = data.get('confirmpassword');
        if (verify.vfname && verify.vlname && verify.vemail && verify.vpassword) {
            if (password === cpassword) {
                setError({ ...error, cpasswordError: "" })
                alert("Data saved successfully")
                userSignUp(gdata)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
                navigate("/")
            }
            else {
                setError({ ...error, cpasswordError: "passwords should match" })
            }
        }
        else {
            alert("please fill required fields")
            finalValidation();
        }
    };

    const finalValidation = () => {
        const errors = {};
        if (!gdata.firstName) {
            errors.fnameError = "*Required";
        }
        if (!gdata.lastName) {
            errors.lnameError = "*Required";
        }
        if (!gdata.email) {
            errors.emailError = "*Required";
        }
        if (!gdata.contactNumber) {
            errors.numberError = "*Required";
        }
        if (!gdata.password) {
            errors.passwordError = "*Required";
        }
        setError({...error,...errors});
    }

    const handleData = (e) => {
        let { name, value } = e.target;
        setgData({ ...gdata, [name]: value })
    }

    const validateFirstName = () => {
        if (!gdata.firstName) {
            setError({ ...error, fnameError: "*Required" });
            setVerify({ ...verify, vfname: false })
        }
        else if (gdata.firstName.length <= 2) {
            setError({ ...error, fnameError: "*Should be atleast 3 characters" });
            setVerify({ ...verify, vfname: false })
        }
        else {
            setError({ ...error, fnameError: "" });
            setVerify({ ...verify, vfname: true })
        }
    }





    const validateLastName = () => {
        if (!gdata.lastName) {
            setError({ ...error, lnameError: "*Required" })
            setVerify({ ...verify, vlname: false })
        }
        else if (gdata.lastName.length <= 2) {
            setError({ ...error, lnameError: "*Should be atleast 3 characters" })
            setVerify({ ...verify, vlname: false })
        }
        else {
            setError({ ...error, lnameError: "" });
            setVerify({ ...verify, vlname: true })
        }
    }

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!gdata.email) {
            setError({ ...error, emailError: "*Required" })
            setVerify({ ...verify, vemail: false })
        }
        else if (!regex.test(gdata.email)) {
            setError({ ...error, emailError: "*Invalid" })
            setVerify({ ...verify, vemail: false })
        } else {
            setError({ ...error, emailError: "" })
            setVerify({ ...verify, vemail: true })
        }
    }

    const validatePassword = () => {
        const regexpassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!gdata.password) {
            setError({ ...error, passwordError: "*Required" })
            setVerify({ ...verify, vpassword: false })
        }
        else if ((gdata.password.length < 6 || gdata.password.length > 12)) {
            setError({ ...error, passwordError: "*atleast 6 chars not more than 12" })
            setVerify({ ...verify, vpassword: false })
        }
        else if ((gdata.password.length > 6) && (gdata.password.length < 12)) {
            if (regexpassword.test(gdata.password)) {
                setError({ ...error, passwordError: "" });
                setVerify({ ...verify, vpassword: true })

            }
            else if (!regexpassword.test(gdata.password)) {
                setError({ ...error, passwordError: "*should contain atleast 1 number and 1 special character" })
                setVerify({ ...verify, vpassword: false })
            }
        }
    }

    const validateNumber = () => {
        if (!gdata.contactNumber) {
            setError({ ...error, numberError: "*Required" })
            setVerify({ ...verify, vnumber: false })
        }
        else{
            setError({ ...error, numberError: "" })
            setVerify({ ...verify, vnumber: true })
        }
    }



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={handleData}
                                    onBlur={validateFirstName}
                                />
                                <p className="text-danger">{error.fnameError}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onBlur={validateLastName}
                                    onChange={handleData}
                                />
                                <p className="text-danger">{error.lnameError}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onBlur={validateEmail}
                                    onChange={handleData}
                                />
                                <p className="text-danger">{error.emailError}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="contactNumber"
                                    label="Contact Number"
                                    name="contactNumber"
                                    autoComplete="number"
                                    onBlur={validateNumber}
                                    onChange={handleData}
                                />
                                <p className="text-danger">{error.numberError}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onBlur={validatePassword}
                                    onChange={handleData}
                                />
                                <p className="text-danger">{error.passwordError}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="confirm Password"
                                    type="password"
                                    id="cpassword"
                                    autoComplete="new-password"
                                    onChange={handleData}
                                />
                                <p className="text-danger">{error.cpasswordError}</p>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}