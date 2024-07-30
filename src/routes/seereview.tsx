import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Actorcircle from '../components/actorcircle';
import MusicalTicket from '../components/musicalticket';
import SeeReview from '../components/seereview';

// 스타일 컴포넌트
const AppContainer = styled.div`
  background-image: url('/reviewpage.png');
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

const MainTitle = styled.h1`
  font-size: 75px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59;
  background: linear-gradient(to right, #E8E1B1, #BB9D59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 6px 0;
  display: flex;
  align-items: center;
  margin-left: 100px;
  font-weight: 300;
`;

const Title = styled.h2`
  font-size: 52px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59;
  background: linear-gradient(to right, #E8E1B1, #BB9D59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 6px 0;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const VerticalSpacing = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const LeftAlignedActorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: 180px;
  gap: 32px;
`;

// 타입 정의
interface Actor {
  actor_id: string;
  profile_image: string;
  actor_name: string;
}

interface Musical {
  musical_id: string;
  musical_name: string;
  theater_name: string;
  watch_at: string;
  poster_image: string;
}

interface ReviewData {
  review_id: string;
  musical: Musical;
  actors: Actor[];
  reviewer_profile_image: string | null;
  reviewer_nickname: string;
  reviewer_email: string;
  like_num: number;
  is_like: boolean;
  violence: number;
  fear: number;
  sensitivity: number;
  content: string;
  create_at: string;
}

const SeeReviewPage: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await fetch(`/review/${reviewId}`);
        const result = await response.json();
        if (result.success) {
          setReviewData(result.data);
        } else {
          console.error('리뷰 데이터 조회 실패:', result.message);
        }
      } catch (error) {
        console.error('리뷰 데이터 조회 중 오류 발생:', error);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  if (!reviewData) return <div>Loading...</div>;

  const { musical, actors, reviewer_profile_image, reviewer_nickname, reviewer_email, like_num, is_like, violence, fear, sensitivity, content } = reviewData;

  return (
    <AppContainer>
      <LeftAlignedContainer>
        <MainTitle>{musical.musical_name}</MainTitle>
      </LeftAlignedContainer>
      <MusicalTicket
        tickets={[{
          musical_id: musical.musical_id,
          musical_name: musical.musical_name,
          theater_name: musical.theater_name,
          watch_at: musical.watch_at,
          poster_image: musical.poster_image // 실제 데이터로 대체
        }]}
      />
      <LeftAlignedContainer>
        <Title>ACTOR</Title>
      </LeftAlignedContainer>
      <LeftAlignedActorContainer>
        {actors.map(actor => (
          <Actorcircle
            key={actor.actor_id}
            profile_image={actor.profile_image}
            actor_name={actor.actor_name}
          />
        ))}
      </LeftAlignedActorContainer>
      <LeftAlignedContainer>
        <Title>REVIEW</Title>
      </LeftAlignedContainer>
      <VerticalSpacing>
        <SeeReview
          reviewerProfileImage={reviewer_profile_image}
          reviewerNickname={reviewer_nickname}
          reviewerEmail={reviewer_email}
          likeNum={like_num}
          isLike={is_like}
          violence={violence}
          fear={fear}
          sensitivity={sensitivity}
          content={content}
        />
      </VerticalSpacing>
    </AppContainer>
  );
};

export default SeeReviewPage;