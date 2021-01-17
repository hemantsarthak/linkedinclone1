import { useSelector, useDispatch } from "react-redux";
import { ChangeTheme } from "../../store/actions/util";
import Logo from "../../assets/images/logo.png";
import { Paper, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import WorkIcon from "@material-ui/icons/Work";
import TelegramIcon from "@material-ui/icons/Telegram";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import AppsIcon from "@material-ui/icons/Apps";
import MenuItem from "./menuItem/MenuItem";
import Style from "./Style";
import { auth } from "../../firebase";

const Header = () => {
  const classes = Style();

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.util);

  const { photoURL } = useSelector((state) => state.user);

  const Brightness = () => {
    return mode ? <Brightness4Icon /> : <BrightnessHighIcon />;
  };

  const items = [
    { Icon: <HomeIcon />, title: "Home", arrow: false },
    { Icon: <GroupIcon />, title: "My Network", arrow: false },
    { Icon: <WorkIcon />, title: "Jobs", arrow: false },
    { Icon: <TelegramIcon />, title: "Messaging", arrow: false },
    { Icon: <NotificationsIcon />, title: "Notifications", arrow: false },
    { Icon: <Avatar src={photoURL} onClick={() => auth.signOut()} />, title: "me", arrow: true },
    { Icon: <AppsIcon />, title: "Apps", arrow: true },
  ];

  return (
    <Paper elevation={0} className={classes.header}>
      <div className={classes.header__logo}>
        <img src={Logo} alt="logo" />
        <div className={classes.search}>
          <SearchIcon />
          <input placeholder="Search" />
        </div>
      </div>
      <div className={classes.header__nav}>
        {items.map(({ Icon, title, arrow }, i) => (
          <MenuItem key={i} Icon={Icon} title={title} arrow={arrow} />
        ))}
        <MenuItem
          key={"mode"}
          Icon={mode ? <Brightness4Icon /> : <BrightnessHighIcon />}
          title={mode ? "Dark" : "Light"}
          onClick={() => dispatch(ChangeTheme())}
        />
      </div>
    </Paper>
  );
};

export default Header;