
import React, { useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
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
import { useHistory } from 'react-router-dom';

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

export default function Edit({ isLogged, id }) {
  const classes = useStyles();
  const history= useHistory();
  const [auth, setAuth] = useState(isLogged ? 'YES' : 'NO');
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
  const [formData, setFormData] = useState({});
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get('/user/details?id=' + id + '&auth=' + auth);
        setFormData({id:data['data'].id,userName:data['data'].userName,gender:data['data'].gender,interest:data['data'].interest,description:data['data'].description,profileImage:data['data'].profileImage});
        setPreviewImage(axios.defaults.baseURL+'/images/'+data['data'].profileImage);
      } catch (err) {
        if (err.response) {
          setToastMsg(err.response.data);
          setToast(true);
        }
      }
      setLoading(false);
    })();
  }, []);


  useEffect(async () => {
    if (submit) {
      if (Object.keys(formError).length === 0) {
        (async function () {
          try {
            const { data } = await axios.put('user?auth=' + auth, formData);
            setToastMsg(data)
            setToast(true);
            history.push('/');

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
      setFormError({ ...validate({ profileImage: imageUrl }) })
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
      setFormError({ ...validate({ profileImage: null }) })
      setPreviewImage(null);
    } catch (error) {
      if (error.response) {
        setToastMsg(error.response.data);
        setToast(true);
      }
    }
    setLoading(false);
  }

  if (Object.keys(formData).length === 0) return <div>
    {toast ? <Toaster data={toastMsg} /> : ""}
    Loading..
  </div>;

  return (
    <Container component="main" maxWidth="xs">
      {toast ? <Toaster data={toastMsg} /> : ""}
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update
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
            value={formData.userName}
          />
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
          </label>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
      <Box mt={8}>

      </Box>
    </Container>
  );
}
