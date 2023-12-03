import "./profile-card.css"
import EditProfile from "../modal/editprofile-modal";
import { useUserContext } from "../../../hooks/useUserContext";
import { useEffect } from "react";


const ProfileCard = ({name, isOwner, image, userID, setRefetch, description}) => {
  const { user } = useUserContext();





  return (
    <div className="frame">
      {/* <button className="btn btn-primary edit-profile-button" style={{ background: '#885133' }}>EDIT PROFILE</button> */}
      {
        user?.id === userID && (
          <EditProfile imageSrc={image} userId={userID} setRefetch={setRefetch} descriptionDefault={description}/>
        )
      }
      <img className="profile-icon" alt="Profile icon" src={image} style={{ borderRadius: '50%', borderColor: '#9c1a1d', borderWidth: '5px' }} />
      <div className="overlap-group">
        <div className="review-body">{name}</div>
        <div className="text-wrapper">{isOwner}</div>
        <div className="desc">
          {description}
        </div>
      </div>
      
    </div>
  );
}

export default ProfileCard;
