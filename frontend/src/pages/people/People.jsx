import "./people.css"
import ProfileCard from "../../components/profile-cards/profile-card"
import peopleData from "../../../data/people-data.js"



const People = () => {
    const numCards = 25; // Change this to the number of ProfileCard components you want to display
    const cardsPerRow = 5; // Maximum number of cards per row

    // Generate an array of ProfileCard components
    const cardComponents = peopleData.map((peopleData, index) => (
        <ProfileCard key={0}
                    name={peopleData.name} 
                    helpfulVotes={peopleData.helpfulVotes} 
                    notHelpfulVotes={peopleData.notHelpfulVotes}
                    isOwner={peopleData.isOwner} 
                    userID={peopleData.userID} 
                    />
    ));

    return (
        <div className="w-full h-full" >
            <div className="profile-container flex flex-wrap justify-center items-center" >
                {cardComponents}
            </div>
            
        </div>
    );
};

export default People;
