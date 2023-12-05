import DragShuffleHero from "./DragShuffleHero"; // Import the DragShuffleHero component
import CardCarousel from "./CardCarousel";
import ScrollingTestimonials from "./ScrollingTestimonials";
import { useUserContext } from "../../../hooks/useUserContext";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const Homepage = () => {

  const { data:reviews } = useFetch("/api/posts/get_posts");

  const { data:storeData } = useFetch("/api/stores");

  useEffect(() => {
    
      console.log(reviews);
  }, [reviews]);

  const { user } = useUserContext();

  const {
      loading: storeLoading,
      error: storeError,
      data: reviewData,
  } = useFetch("/api/posts/get_modified_posts");

  useEffect(() => {
    console.log('HOMEPAGE REVIEW DATA: ',reviewData);
  }, [reviewData]);

  useEffect(() => {
    console.log('HOMEPAGE STORE DATA: ', storeData);
  }, [storeData]);

  console.log('STORE ID: ', storeData?._id)

  useEffect(() => {
    console.log('Number of fetched stores: ', storeData?.length || 0);
  }, [storeData]);

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
        <CardCarousel stores={storeData} length={storeData?.length || 0}/>
      </div>

      {/* Latest Reviews */}
      <div>
        <ScrollingTestimonials reviews={reviewData} />
      </div>
    </>
  );
};

export default Homepage;
