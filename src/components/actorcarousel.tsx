// src/components/Component.tsx

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter-SemiBold';
    src: url('/Inter-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 17px; /* 이미지 간격 조절 */
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20.5px;
  overflow: hidden;
  width: 275.2px;
  height: 389.3px;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  z-index: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageText = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 18pt;
  color: #FAFAFA;
  z-index: 2;
`;

const Button = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
`;

const LeftButton = styled(Button)`
  left: -25px;
`;

const RightButton = styled(Button)`
  right: -25px;
`;

const Component: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: "/musicalposter-1.jpeg", name: "이름 1" },
    { src: "/musicalposter-2.jpeg", name: "이름 2" },
    { src: "/musicalposter-3.jpeg", name: "이름 3" },
    { src: "/musicalposter-4.jpeg", name: "이름 4" },
    { src: "/musicalposter-5.jpeg", name: "이름 5" },
    { src: "/musicalposter-6.jpeg", name: "이름 6" }
  ];

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Container>
        <ContentWrapper>
          <Row>
            <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            <ImageRow>
              {images.map((image, index) => {
                const displayIndex = (index + currentIndex) % images.length;
                return (
                  <ImageContainer key={index} style={{ display: index < 4 ? 'block' : 'none' }}>
                    <Image src={images[displayIndex].src} alt={`Poster ${index}`} />
                    <GradientOverlay />
                    <ImageText>{images[displayIndex].name}</ImageText>
                  </ImageContainer>
                );
              })}
            </ImageRow>
            <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
          </Row>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Component;