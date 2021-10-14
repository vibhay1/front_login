
import React, { useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  CircularProgress,
  Input,
  Select,
  MenuItem,
  InputLabel,
  Badge,
  Tooltip,
  FormHelperText,
  InputAdornment,
  IconButton,
  OutlinedInput
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormValidate } from '../component/Validate';
import { Toaster } from '../component/Toaster';
import CloseIcon from '@material-ui/icons/Close';

import axios from '../api/myServer';
import validate from '../validate';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register({ handleDashboard, isLogged }) {
  const classes = useStyles();
  const [authText, setAuthText] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [toastMsg, setToastMsg] = useState({});
  const [toast, setToast] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [values, setValues] = useState({
    showPassword: false,
    confirmPasswordShow: false
  });
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    description: "",
    interest: "",
    profileImage: null
  });
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.clear();
      setToast(false);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };//This return function call first in useEffect hooks

  }, [toastMsg]);

  useEffect(async () => {
    if(submit){
    if (Object.keys(formError).length === 0) {
      (async function () {
        try {
          const { data } = await axios.post('register', formData);
          setToastMsg(data)
          setToast(true);
          setFormData({
            userName: "",
            email: "",
            gender: "",
            password: "",
            confirmPassword: "",
            description: "",
            interest: "",
            profileImage: null
          });
          setPreviewImage(null);

        } catch (err) {
          if (err.response) {
            setToastMsg(err.response.data);
            setToast(true);
          }
        }
        setLoading(false);
      })();
    } else {
      setToastMsg({
        ...toastMsg, success: false, error: { message: "Form Error" }
      });
      setToast(true);
    }
  }
  }, [submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError({ ...setFormError, ...validate(formData) });
    setSubmit({ ...true });
    // console.log(formError);
    // const invalidFields = Object.entries(formData).filter((field) =>{
    //   console.log(document.querySelector(`[name=${field[0]}]`).getAttribute('optional'));
    // });
    // if (invalidFields.length > 0) {
    //   const fieldsError = {};
    //   invalidFields.forEach(item=>{
    //     fieldsError[item[0]]={...item,error:true}
    //   })
    //   setFieldError({ ...fieldError, ...fieldsError });
    //   console.log(fieldsError);
    // }

    // for (const fieldErr of Object.entries(fieldError)) {
    //   if(fieldErr[1].require && fieldErr[1].error!==null)
    //   errorField={...errorField,[fieldErr[0]]:{...[fieldErr[1]],error:true}}
    // }
    // setFieldError({...fieldError,errorField})
    //  console.log(fieldError);
    // (async function () {
    //   try {
    //     const { data } = await axios.post('register', formData);
    //     setToastMsg(data)
    //     setToast(true);
    //   } catch (err) {
    //     setToastMsg(err.response.data)
    //     setToast(true);
    //     // if(err.response.status)
    //     // console.clear()
    //   }
    // })();


    // const isValidData = Object.entries(fieldError).filter((field, i) => field[1] !== null);

  };


  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormError({ ...validate({ ...formData, [name]: value }) });
    setFormData({ ...formData, [name]: value });

  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const uploadFile = async (e) => {
    const file = e.target.files[0]
    // Create an object of formData
    const imageData = new FormData();

    // Update the formData object
    imageData.append(
      "data",
      file,
      file.name
    );

    try {
      setLoading(true);
      const { data } = await axios.post('/image', imageData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      setToastMsg(data);
      setToast(true);
      let imageUrl = String(data['data'].imagePath[0].imageUrl);
      setFormData({ ...formData, profileImage: imageUrl.split('/').pop() });
      setFormError({...validate({ profileImage: imageUrl }) })
      setPreviewImage(imageUrl);
    } catch (error) {
      if (error.response) {
        setToastMsg(error.response.data);
        setToast(true);
      }
    }
    setLoading(false);
  }
  const removeImage = async (img) => {
    try {
      setLoading(true);
      const { data } = await axios.delete('/image?name=' + img);
      setToastMsg(data);
      setToast(true);
      setFormData({ ...formData, profileImage: null });
      setFormError({...validate({ profileImage: null }) })
      setPreviewImage(null);
    } catch (error) {
      if (error.response) {
        setToastMsg(error.response.data);
        setToast(true);
      }
    }
    setLoading(false);
  }
  //To authorization
  const handleIsAuthorize = (e) => {
    setAuthText(e.target.value);
  }
  const handleLogin = () => {
    handleDashboard(authText);
  }

  return (
    <Container component="main" maxWidth="xs">
      {toast ? <Toaster data={toastMsg} /> : ""}
      <CssBaseline />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="authorize"
        label="YES for authorize"
        type="text"
        id="authorize"
        required
        onChange={handleIsAuthorize}
        value={authText}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        className={classes.submit}
      >Go to dashboard</Button>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="userName"
            type="userName"
            label="User name"
            name="userName"
            error={formError.userName ? true : false}
            helperText={formError.userName && formError.userName}
            onChange={handleInput}
            autoFocus
            value={formData.userName.toLowerCase()}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            inputProps={{ 'optional': false }}
            autoComplete="email"
            error={formError.email ? true : false}
            helperText={formError.email ? formError.email : ""}
            onChange={handleInput}
            value={formData.email.toLowerCase()}
          />
          <FormControl fullWidth variant="outlined" margin="normal" error={formError.password ? true : false}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={values.showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setValues({ ...values, showPassword: !values.showPassword })}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formError.password && <FormHelperText>{formError.password}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal" error={formError.confirmPassword ? true : false}>
            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              type={values.confirmPasswordShow ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setValues({ ...values, confirmPasswordShow: !values.confirmPasswordShow })}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.confirmPasswordShow ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm password"
            />
            {formError.confirmPassword && <FormHelperText>{formError.confirmPassword}</FormHelperText>}
          </FormControl>
          <FormControl component="fieldset" >
            <FormLabel component="legend" >Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender" value={formData.gender}
              onChange={handleInput}
            >
              <FormControlLabel value="Female" control={<Radio color="primary" required={true} />} label="Female" />
              <FormControlLabel value="Male" control={<Radio color="primary" required={true} />} label="Male" />
            </RadioGroup>
            {formError.gender && <FormHelperText error>{formError.gender}</FormHelperText>}

          </FormControl>
          <FormControl fullWidth error={formError.interest ? true : false}>
            <InputLabel id="interest">Select Interest</InputLabel>
            <Select
              labelId="interest"
              id="interest"
              value={formData.interest}
              label="Interest"
              name="interest"
              onChange={handleInput}
              helperText="Please select your currency"
            >
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="News">News</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Movies">Movies</MenuItem>
            </Select>

            {formError.interest && <FormHelperText>{formError.interest}</FormHelperText>}
          </FormControl>
          <TextField
            id="outlined-multiline-static"
            label="description"
            margin="normal"
            fullWidth
            multiline
            name="description"
            error={formError.description ? true : false}
            helperText={formError.description ? formError.description : ""}
            rows={4}
            variant="outlined"
            onChange={handleInput}
            value={formData.description}
          />

          {previewImage !== null ? (
            <Box sx={{ width: '50%' }}>
              <Badge badgeContent={
                <Tooltip title="Remove image">
                  <CloseIcon color="secondary"
                    onClick={() => removeImage(formData.profileImage)}
                    cursor="pointer"
                  />
                </Tooltip>
              }>
                <img src={previewImage} alt={"image"} width="80" />
              </Badge>

            </Box>
          ) : ""}
          {loading ? <Box sx={{ width: '50%' }}>
            <CircularProgress color="primary" />
          </Box> : ""}
          <label htmlFor="image" >
            <Input accept="image/*" id="image" type="file" name="data" onChange={uploadFile} disabled={formData.profileImage !== null || loading ? true : false}
              className={classes.input}
            />
            <Button variant="contained" component="span" color="primary">
              Upload Image
            </Button>

            {formError.profileImage && <FormHelperText error>{formError.profileImage}</FormHelperText>}
            {/* error={formError.profileImage ? true : false}
               helperText={formError.profileImage ? formError.profileImage : ""}
            {formData.image!==null?"  File uploaded!":""}  */}
          </label>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </div>
      <Box mt={8}>

      </Box>
    </Container>
  );
}
