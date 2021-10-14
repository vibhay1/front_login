
function Auth() {
  if(sessionStorage.getItem('user_key')==='YES'){
    return true;
  }else{
    return false;
  }
}

export default Auth;