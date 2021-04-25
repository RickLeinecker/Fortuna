//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import getErrorFromObject from '../globalComponents/getErrorFromObject';
import { ToastContainer, toast } from 'react-toastify';

type Props = {
    match: {
        params: {
            token: string,
            email: string
        }
    }
}

type State = {|
    newPassword: string,
    confirmPassword: string,
    showNewPasswordPopup: boolean,
    passwordResetSuccess: boolean
|};

class ResetPassword extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = {
            newPassword: '',
            confirmPassword: '',
            showNewPasswordPopup: true,
            passwordResetSuccess: false
        }
    }

    handleResetPassword(): void {
        if (this.state.newPassword !== this.state.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const responsePromise: Promise<Response> = fetch('/api/user/resetPassword', {
            method: 'PATCH',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({ 
                email: this.props.match.params.email, 
                token: this.props.match.params.token, 
                newPassword: this.state.newPassword })            
        });

        responsePromise.then(
            response => response.json().then(data => {
                if (response.status !== 200) {
                    console.log(response.status);
                    console.log(data);
                    toast.error(getErrorFromObject(data));
                }
                else {
                    toast.success("Your password has been reset! Click the link to login!");
                    this.setState({ passwordResetSuccess: true });
                }
            })
        ).catch(
            (error) => {
                toast.error("Couldn't connect to server!");
                console.log(error);
            }
        );
    }

    render(): React.Node {
        const passwordResetDone = this.state.passwordResetSuccess;
        let button;
        const resetPasswordButton = (
            <button className="popupbtn" onClick={() => this.handleResetPassword()}>
                Reset Password
            </button>
        );
        const goToLoginButton = (
            <Link to="/Login">
                <button className="clearbtn">
                    Click Here To Go To Login
                </button>
            </Link>
        );
        if (passwordResetDone) {
            button = goToLoginButton;
        }
        else {
            button = resetPasswordButton;
        }

        return (
			<div className="vcenter" title="resetPw">
				<h3 className="row col-md-12 d-flex justify-content-center">Password Reset</h3>
				<div className="row col-md-12 d-flex justify-content-center">
					<label>Enter Your New Password</label>
					<div className="input-group  justify-content-center">
						<input
							type="password"
							className="inputText col-md-6"
							onChange={e => this.setState({ newPassword: e.target.value })}
						/>
					</div>
				</div>
				<div className="row col-md-12 d-flex justify-content-center">
					<label>Confirm Password</label>
					<div className="input-group  justify-content-center">
						<input
							type="password"
							className="inputText col-md-6"
							onChange={e => this.setState({ confirmPassword: e.target.value })}
						/>
					</div>
				</div>
				<div className="row col-md-12 d-flex justify-content-center">
					{button}
				</div>
				<ToastContainer />
			</div>
        );
    }
}

export default ResetPassword;
