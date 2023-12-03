import React from 'react';

const Slider = () => {
  return (
    <div className="slider-wrapper">
      <div className="slider">
        <img id="dslide-1" src="dance1.png" alt="Slide 1" />
        <img id="dslide-2" src="dance2.png" alt="Slide 2" />
        <img id="dslide-3" src="dance3.png" alt="Slide 3" />
        <img id="dslide-4" src="dance4.png" alt="Slide 4" />
        <img id="dslide-5" src="dance5.png" alt="Slide 5" />
      </div>
      <div className="slider-nav">
        <a href="#dslide-1"></a>
        <a href="#dslide-2"></a>
        <a href="#dslide-3"></a>
        <a href="#dslide-4"></a>
        <a href="#dslide-5"></a>
      </div>
    </div>
  );
};

export default Slider;
