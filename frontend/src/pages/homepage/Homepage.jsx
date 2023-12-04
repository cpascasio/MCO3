import DragShuffleHero from "./DragShuffleHero"; // Import the DragShuffleHero component
import CardCarousel from "./CardCarousel";
import ScrollingTestimonials from "./ScrollingTestimonials";
import { useUserContext } from "../../../hooks/useUserContext";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const Homepage = () => {

  const { data:reviews } = useFetch("/api/posts/get_posts");

  const { data:stores } = useFetch("/api/stores/get_stores");

  useEffect(() => {
    
      console.log(reviews);
      console.log(stores);
  }, [reviews]);

  const { user } = useUserContext();

  const {
      loading: storeLoading,
      error: storeError,
      data: reviewData,
  } = useFetch("/api/posts/get_modified_posts");

  useEffect(() => {
    console.log(reviewData);
  }, [reviewData]);

  useEffect(() => {
    console.log(user?.id);
  }, [user]);
  return (
    <>
      {/* Hero Section */}
      <div>
        <DragShuffleHero reviews={reviewData}/>
      </div>

      {/* Trending Restaurants */}
      <div>
        <CardCarousel />
      </div>

      {/* Latest Reviews */}
      <div>
        <ScrollingTestimonials reviews={reviewData} />
      </div>
    </>
  );
};

export default Homepage;
