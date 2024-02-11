import { Link } from "react-router-dom";
import { UserAccount } from "../../features/profile/services/profileService";

type props = {
  user: UserAccount;
};

const UserCard = ({ user }: props) => {
  const {
    personal_info: { fullName, userName, profile_img },
  } = user;
  return (
    <Link to={`/user/${userName}`} className="flex gap-5 items-center mb-5">
      <img src={profile_img} alt="" className="w-14 h-14 rounded-full" />
      <div>
        <h1 className="font-medium text-xl line-clamp-2">{fullName}</h1>
        <p className="text-dark-grey">@{userName}</p>
      </div>
    </Link>
  );
};

export default UserCard;
