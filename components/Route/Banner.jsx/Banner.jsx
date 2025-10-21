import React from "react";
import Slider from "react-slick";

// Example partner logos - replace with actual partner logo URLs
const partners = [
  "https://t4.ftcdn.net/jpg/02/80/29/41/240_F_280294175_3ZDKmagiDMsKPp2qqKxG3Y9c2DyODna7.jpg",
  "https://t3.ftcdn.net/jpg/03/82/20/02/240_F_382200288_IoJpNuvMAj9pcp52XkUnIyqv7SM2Ib7Q.jpg",
  "https://t4.ftcdn.net/jpg/12/22/30/69/240_F_1222306923_lh7YawAtZuqRHHZCDRvtmy4r6kGSfjcR.jpg",
  "https://t4.ftcdn.net/jpg/03/77/71/85/240_F_377718554_J5cEBUNVXMmr42qEAcebcuLkcXpt5BXF.jpg",
  "https://t4.ftcdn.net/jpg/03/22/24/81/240_F_322248124_MotgJGRwML534zEtZU03jbkDVIxpX6ij.jpg",
  "https://t4.ftcdn.net/jpg/01/99/17/59/240_F_199175991_OdxR4CCwGChafAOfMvMN7pNE1DFIMd5b.jpg",
];

const PartnersCarousel = () => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Our Trusted Partners</h2>
      <Slider {...settings}>
        {partners.map((logo, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={logo}
              alt={`Partner ${index + 1}`}
              className="h-20 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PartnersCarousel;
