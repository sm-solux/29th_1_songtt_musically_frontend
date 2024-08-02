// src/components/App.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BasicReview from "../components/basicreview";
import BestReview from "../components/bestreview";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// Review 타입 정의
interface Review {
  review_id: string;
  reviewer_profile_image: string | null;
  reviewer_nickname: string;
  reviewer_email: string;
  create_at: string;
  like_num: number;
  is_like: boolean;
  fear: number;
  sensitivity: number;
  violence: number;
  content: string;
}

// 스타일 정의
const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 162px 74px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const BestReviewTitle = styled.h2`
  font-size: 75px;
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const BasicReviewTitle = styled.h2`
  font-size: 75px;
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const WriteIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-left: auto;
  cursor: pointer;
`;

const VerticalSpacing = styled.div`
  margin-top: 45px;
  margin-bottom: 55px;
`;

const HorizontalLine = styled.hr`
  width: 1131px;
  border-top: 1px solid #d1d1d1;
  margin: 75px 0;
`;

// 캐로셀 버튼 스타일
const Button = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-170%);
  z-index: 1;
`;

const LeftButton = styled(Button)`
  left: 2px; /* 왼쪽 위치 조정 */
`;

const RightButton = styled(Button)`
  right: 2px; /* 오른쪽 위치 조정 */
`;

// 캐로셀 컨테이너 스타일
const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  max-width: 1200px; /* 최대 너비 설정 */
  height: 400px; /* 캐로셀 높이 설정 */
`;

// 캐로셀 내용 스타일
const CarouselContent = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  width: 100%;
  height: 100%;
`;

// 캐로셀 아이템 스타일
const CarouselItem = styled.div`
  flex: 0 0 100%; /* 한 아이템이 전체 너비를 차지하도록 설정 */
  max-width: 100%; /* 아이템의 최대 너비를 100%로 설정 */
  height: 100%; /* 아이템의 높이를 100%로 설정 */
  box-sizing: border-box;
`;

const App: React.FC = () => {
  const [bestReviews, setBestReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 쿠키에서 토큰 가져오기
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
          },
        });

        console.log(response.data); // 응답 데이터 확인

        const { best_review, all_review } = response.data.data;

        // 데이터 검증
        if (Array.isArray(best_review) && Array.isArray(all_review)) {
          setBestReviews(best_review);
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bestReviews.length - 1 : prevIndex - 1
    );
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % bestReviews.length
    );
  };

  return (
    <AppContainer>
      <LeftAlignedContainer>
        <BestReviewTitle>Best Review</BestReviewTitle>
      </LeftAlignedContainer>
      <CarouselContainer>
        <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
        <CarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {bestReviews.map((review) => (
            <CarouselItem key={review.review_id}>
              <BestReview review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
      </CarouselContainer>
      <HorizontalLine />
      <LeftAlignedContainer>
        <BasicReviewTitle>ALL Review</BasicReviewTitle>
        <WriteIcon
          src="/write.png"
          alt="Write Icon"
          onClick={() => navigate("/write-review")}
        />
      </LeftAlignedContainer>
      {bestReviews.map((review) => (
        <VerticalSpacing key={review.review_id}>
          <BasicReview review={review} />
        </VerticalSpacing>
      ))}
    </AppContainer>
  );
};

export default App;
