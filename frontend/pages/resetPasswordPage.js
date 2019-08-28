import ResetPassword from "../components/Authentication/ResetPassword";

const ResetPasswordPage = props => <ResetPassword resetToken={props.query.resetToken} />;

export default ResetPasswordPage;
