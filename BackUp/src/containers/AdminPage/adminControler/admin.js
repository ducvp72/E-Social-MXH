import React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
// import "./index.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  ReadOutlined,
  WechatOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const showTabPanel = (routes) => {
  console.log(routes);
  if (routes && routes.lenght > 0) {
    return routes.map((item, index) => {
      return (
        <Route
          key={index}
          exact={item.exact}
          path={item.path}
          component={item.component}
        />
      );
    });
  }
};

const Admin = () => {
  const history = useHistory();
  const handleClick = (_path) => {
    console.log("path:" + _path);
    console.log("history" + history);
    history.push(_path);
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const [tab, setTab] = useState("");
  const selectedTab = (event) => {
    setTab(Number.parseInt(event.key));
  };
  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <div className="">
      <Helmet>
        <title>Admin Vn-Social</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div
        className="w-full border-2 p-4 h-full overflow-x-auto overflow-y-hidden shadow-2xl rounded-lg bg-white relative "
        style={{ top: "4.5rem" }}
      >
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
              onSelect={(e) => selectedTab(e)}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["0"]}
            >
              <Menu.Item
                onClick={() => handleClick("/home")}
                key="0"
                icon={<HomeOutlined />}
              >
                Home
              </Menu.Item>

              <Menu.Item
                onClick={() => handleClick("/admin/user")}
                key="1"
                icon={<UserOutlined />}
              >
                Người dùng
              </Menu.Item>
              <Menu.Item
                onClick={() => handleClick("/admin/post")}
                key="2"
                icon={<ReadOutlined />}
              >
                Bài viết
              </Menu.Item>
              <Menu.Item
                onClick={() => handleClick("/admin/groupchat")}
                key="3"
                icon={<WechatOutlined />}
              >
                Group chat
              </Menu.Item>
              <Menu.Item
                onClick={() => handleClick("/admin/change-password")}
                key="4"
                icon={<LockOutlined />}
              >
                Đổi mật khẩu Admin
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              {/* <Switch>
                {routeManage.map((item, index) => {
                  return (
                    <Route
                      key={index}
                      exact={item.exact}
                      path={item.path}
                      component={item.component}
                    />
                  );
                })}
              </Switch> */}
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default Admin;
