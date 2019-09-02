import React from "react";
import FacebookLogin from "react-facebook-login";

class GoogleLoginButton extends React.Component {
  render() {
    const responseGoogle = test => {
      console.log(test);
    };
    const responseGoogle = test => {
      console.log(test);
    };
    return (
      <div>
        <GoogleLogin
          clientId="1027038815922-b0pga4mcgrnqre0s83k6m0irj7rh38e9.apps.googleusercontent.com"
          buttonText="Se connecter avec Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default GoogleLoginButton;
