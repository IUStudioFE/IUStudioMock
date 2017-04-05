/**
 * @module 
 * @description 登陆页面
 * @author wing
 */
import React, { PropTypes } from 'react';
import { Row, Col, Form, Icon, Input, Button, Card } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as actions from './actions';
// import { Link } from 'react-router-dom';

// import login from './api';

import "./login.scss";

const FormItem = Form.Item;

class Login extends React.Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

   constructor(props) {
    super(props);
    this.state = {
      _username: '',
      _password: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentWillMount() {
    const privateToken = localStorage.getItem('iustudio_token');

    if(privateToken) {
      
    }
  }

  onUsernameChange(event) {
    this.setState({
      _username: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      _password: event.target.value,
    })
  }

  onSubmit() {
    this.props.login({
      username: this.state._username,
      password: this.state._password
    })
  }

  render() {
    const { success, loading} = this.props;
    return (
      <div>
        {
          success ? 
          'hello' :
          (<Row id="login">
            <Col
              lg={{ span: 6, offset: 9}}
              md={{ span: 8, offest: 8}}
              sm={{ span: 12, offest: 6}}
              xs={{ span: 20, offest: 2}}
            >
              <Card
                title="IUStudio Mock"
                style={{
                  marginTop: 80
                }}
              >
                <Form layout="horizontal">
                  <FormItem
                  >
                    <Input
                      placeholder="用户名"
                      value={this.state._username}
                      onChange={this.onUsernameChange}
                      disabled={loading}
                    />
                  </FormItem>
                  <FormItem
                  >
                    <Input
                      type="password"
                      placeholder="密码"
                      value={this.state._password}
                      onChange={this.onPasswordChange}
                      disabled={loading}
                    />
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="button"
                      size="dafault"
                      loading={this.state.loading}
                      style={{width: '100%', height: 32}}
                      onClick={this.onSubmit}
                    >登录</Button>
                  </FormItem>
                  <Link to="/resetPassword">忘记密码?</Link>
                  <Link to="/resetPassword" style={{float: "right"}}>注册</Link>
                </Form>
              </Card>
            </Col>
          </Row>)
        }
      </div>
    ) 
  }
}

function mapStateToProps(state) {
  return state.toObject();
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
