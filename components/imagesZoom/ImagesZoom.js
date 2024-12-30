import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Slick from "react-slick";
import {
  CloseBtn,
  Global,
  Header,
  ImageWrapper,
  Indicator,
  Overlay,
  SlickWrapper,
} from "./style";
const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {Array.isArray(images) &&
              images.map((v) => (
                <ImageWrapper key={v.src}>
                  <img src={v.src} alt={v.src}></img>
                </ImageWrapper>
              ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ImagesZoom;
