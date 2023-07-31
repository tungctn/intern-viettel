import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Home from "./views/Home";
import PostContextProvider from "./contexts/PostContext";
import Profile from "./components/auth/Profile";
import Chat from "./views/Chat";
import { ChatContextProvider } from "./contexts/ChatContext";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <ChatContextProvider>
            <Router>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route
                  exact
                  path="/login"
                  render={(props) => <Auth {...props} authRoute="login" />}
                />
                <Route
                  exact
                  path="/register"
                  render={(props) => <Auth {...props} authRoute="register" />}
                />
                <Route
                  exact
                  path="/confirm"
                  render={(props) => <Auth {...props} authRoute="confirm" />}
                />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/home" component={Home} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/chat" component={Chat} />
              </Switch>
            </Router>
          </ChatContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
