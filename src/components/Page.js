/* eslint react/prop-types: 0 */
import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Signin, Signup } from './auth'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import SideBar from './layouts/SideBar'
import Home from './Home'
import Dashboard from './dashboard/Dashboard'
import Resume from './resumes/Resume'

const { Content } = Layout

const Page = props => {
  const firebase = props.firebase
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Layout>
          <SideBar />
          <Content className="site-layout-content" style={{ marginLeft: 200 }}>
            <Switch>
              <Route exact component={Home} path="/" />
              <Route exact component={Dashboard} path="/dashboard" />
              <Route
                exact
                component={() => <Resume firebase={firebase} />}
                path="/resume"
              />
              <Route exact component={Signin} path="/signin" />
              <Route exact component={Signup} path="/signup" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default Page
