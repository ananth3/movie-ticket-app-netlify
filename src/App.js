import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import TicketDetails from "./pages/TicketDetails";
import ChangeMovie from "./pages/ChangeMovie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "./config";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      await axiosInstance.get("/auth/user/auth-check");
      setAuth(authCheck.data);
    };
    authCheck();
  }, []);
  console.log(auth);

  const [user, setUser] = useState({});

  useEffect(() => {
    const authUser = async () => {
      const res = await axiosInstance.get("/auth/users");
      setUser(res.data);
    };
    authUser();
  }, []);
  console.log(user);

  const [movie, setMovie] = useState({});
  useEffect(() => {
    axiosInstance
      .get("/movie/61bc271716ee437d4fbac0b3")
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log("Error in movie data");
      });
  }, []);
  console.log(movie);
  const movieName = movie.data?.name.toLowerCase();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {auth ? <Home user={user} movie={movie} /> : <Register />}
        </Route>
        <Route path="/login"> {auth ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {" "}
          {auth ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path={`/${movieName}`}>
          <MovieDetails user={user} movie={movie} />
        </Route>
        <Route path={`/buy-ticket/${movieName}`}>
          <Booking user={user} movie={movie} />
        </Route>
        <Route path={`/confirm-ticket/${movieName}`}>
          <TicketDetails user={user} movie={movie} />
        </Route>
        <Route path="/change-movie">
          <ChangeMovie />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
