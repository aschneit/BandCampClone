import React from 'react';
import { withRouter } from 'react-router-dom';
import SessionNav from './session_nav.jsx';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      band_name: '',
      password: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(Object.assign({}, this.state)).then(() => this.props.history.push('/'));
    this.setState({
      band_name: '',
      password: '',
      email: ''
    });

  }

  renderErrors() {

    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const emailField  = () => {
      if (this.props.formType === 'Sign Up') {
        return (
          <input type="text"
            value={this.state.email}
            onChange={this.update('email')}
            className="login-input email"
          />
      );
    }
    };
    const emailLabel  = () => {
      if (this.props.formType === 'Sign Up') {
        return (
          <label className="email-label">Email</label>
        );

      }
    };

    return (
      <div>
        <SessionNav />
        <div className="login-form-container">
          <div className = 'login-form-title'>{this.props.formType}</div>
          <div className="login-divider"></div>
          <form onSubmit={this.handleSubmit} className="login-form-box">
            {this.renderErrors()}
            <div className="login-form">
                <div className="label-container">
                  <label>Band name</label>
                  {emailLabel()}
                  <label>Password</label>
                </div>
                <div className="input-container">
                  <input type="text"
                    value={this.state.band_name}
                    onChange={this.update('band_name')}
                    className="login-input"
                  />
                {emailField()}
                  <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    className="login-input"
                  />
                </div>
            </div>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </form>
          {this.props.formType === 'Sign Up' &&
            <div className="other-page">
              Already have an account? <Link to={'/login'}>Log in.</Link>
            </div>
          }
          {this.props.formType === 'Log In' &&
            <div className="other-page">
              Don’t have an account? <Link to={'/signup'}>Sign Up.</Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
