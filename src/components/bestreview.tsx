import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 스타일 정의
const Container = styled.div`
  border-radius: 15.6px;
  background: url('/bestreview.png');
  display: flex;
  flex-direction: row;
  padding: 16px 20px 15px 20px;
  width: 1131px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div<{ translate: number; width: number }>`
  display: flex;
  flex-direction: row;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${props => props.translate}px);
  width: ${props => props.width}px;
`;

const Slide = styled.div<{ minWidth: number }>`
  min-width: ${props => props.minWidth}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

const ImageWrapper = styled.div`
  border-radius: 4.4px;
  background: url('/musicalposter-1.jpeg') 50% 50% / 172.5px 244px no-repeat;
  margin-right: 18.5px;
  width: 172.5px;
  height: 244px;
`;

const Content = styled.div`
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const DateText = styled.div`
  margin: 0 4px 2px 4px;
  align-self: flex-end;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: #6e6e6e;
`;

const Header = styled.div`
  margin: 0 4.1px 16px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 891.9px;
  box-sizing: border-box;
`;

const UserInfo = styled.div`
  margin-bottom: 3.4px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

interface AvatarProps {
  image?: string;
}

const Avatar = styled.div<AvatarProps>`
  box-shadow: 0px 2px 4.1px rgba(0, 0, 0, 0.25);
  border-radius: 27.3px;
  background: ${props => (props.image ? `url(${props.image})` : 'url(/profileimg.png)')} 50% 50% / cover no-repeat;
  margin-right: 8.7px;
  width: 54.6px;
  height: 54.6px;
`;

const UserNameHandleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 9.8px 12.1px 10.8px 0;
  word-break: break-word;
`;

const UserNameText = styled.div`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 25.2px;
  letter-spacing: 0.8px;
  line-height: 1.347;
  color: #d5d3c1;
  margin-right: 8px;
`;

const UserHandle = styled.div`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 15.3px;
  letter-spacing: 0.5px;
  line-height: 1.347;
  color: #c0c0c0;
`;

const LikeInfo = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const LikeIcon = styled.img<{ liked: boolean }>`
  width: 27.9px;
  height: 24.3px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  ${props =>
    props.liked &&
    `
    transform: scale(1.1);
  `}
`;

const LikeCount = styled.span`
  margin: 0 3px;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 1.347;
  color: #fffce5;
`;

const TagsWrapper = styled.div`
  margin: 0 4px 21px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 649.6px;
  box-sizing: border-box;
`;

const TagGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const TagLabel = styled.span`
  margin-right: 11.4px;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: medium;
  font-size: 18.8px;
  letter-spacing: 0.6px;
  line-height: 1.347;
  color: #e5ddab;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  gap: 10px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CommentSection = styled.div`
  border-radius: 5px;
  background-color: #e8e5d2;
  display: flex;
  padding: 13.5px 21.6px 15.5px 17px;
  width: 900px;
  height: 105px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const CommentText = styled.span<{ isExpanded: boolean }>`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: #444444;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => (props.isExpanded ? 'unset' : '4')};
  -webkit-box-orient: vertical;
`;

const CarouselButton = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1;
`;

const LeftButton = styled(CarouselButton)`
  left: 0px;
`;

const RightButton = styled(CarouselButton)`
  right: 0px;
`;

// Review 타입 정의
interface Review {
  review_id: string;
  reviewer_profile_image?: string;
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

interface ReviewState {
  liked: boolean;
  likeCount: number;
  isExpanded: boolean;
}

interface BestReviewProps {
  reviews: Review[];
}

const BestReview: React.FC<BestReviewProps> = ({ reviews }) => {
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const [likeStates, setLikeStates] = React.useState<ReviewState[]>(
    reviews.map(review => ({
      liked: review.is_like,
      likeCount: review.like_num,
      isExpanded: false,
    }))
  );

  const addLike = async (reviewId: string, index: number) => {
    try {
      const response = await axios.post(`/api/review/${reviewId}/like`);
      if (response.status !== 200) {
        throw new Error('Failed to add like');
      }
      setLikeStates(prevState => {
        const newState = [...prevState];
        newState[index] = { ...newState[index], liked: true, likeCount: newState[index].likeCount + 1 };
        return newState;
      });
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const removeLike = async (reviewId: string, index: number) => {
    try {
      const response = await axios.delete(`/api/review/${reviewId}/like`);
      if (response.status !== 200) {
        throw new Error('Failed to remove like');
      }
      setLikeStates(prevState => {
        const newState = [...prevState];
        newState[index] = { ...newState[index], liked: false, likeCount: newState[index].likeCount - 1 };
        return newState;
      });
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };

  const handleLikeClick = (reviewId: string, index: number) => {
    if (likeStates[index].liked) {
      removeLike(reviewId, index);
    } else {
      addLike(reviewId, index);
    }
  };

  const toggleExpandText = (index: number) => {
    setLikeStates(prevState => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], isExpanded: !newState[index].isExpanded };
      return newState;
    });
  };

  const handleLeftButtonClick = () => {
    setCarouselIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : reviews.length - 1));
  };

  const handleRightButtonClick = () => {
    setCarouselIndex(prevIndex => (prevIndex < reviews.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Container>
      <LeftButton src="/carouselbutton-left.png" alt="왼쪽 버튼" onClick={handleLeftButtonClick} />
      <ContentWrapper translate={-carouselIndex * 1131} width={1131 * reviews.length}>
        {reviews.map((review, index) => (
          <Slide key={review.review_id} minWidth={1131}>
            <ImageWrapper />
            <Content>
              <DateText>{new Date(review.create_at).toLocaleDateString()} {new Date(review.create_at).toLocaleTimeString()}</DateText>
              <Header>
                <UserInfo>
                  <Avatar image={review.reviewer_profile_image} />
                  <UserNameHandleWrapper>
                    <UserNameText>{review.reviewer_nickname}</UserNameText>
                    <UserHandle>{review.reviewer_email}</UserHandle>
                  </UserNameHandleWrapper>
                </UserInfo>
                <LikeInfo>
                  <LikeIcon
                    src={likeStates[index].liked ? '/heart1.png' : '/heart.png'}
                    liked={likeStates[index].liked}
                    onClick={() => handleLikeClick(review.review_id, index)}
                  />
                  <LikeCount>{likeStates[index].likeCount}</LikeCount>
                </LikeInfo>
              </Header>
              <TagsWrapper>
                <TagGroup>
                  <TagLabel>공포</TagLabel>
                  <IconWrapper>
                    {Array.from({ length: 5 }, (_, iconIndex) => (
                      <Icon
                        key={iconIndex}
                        src={iconIndex < review.fear ? '/fear1.png' : '/fear2.png'}
                        onClick={() => {}}
                        onDoubleClick={() => {}}
                      />
                    ))}
                  </IconWrapper>
                </TagGroup>
                <TagGroup>
                  <TagLabel>선정성</TagLabel>
                  <IconWrapper>
                    {Array.from({ length: 5 }, (_, iconIndex) => (
                      <Icon
                        key={iconIndex}
                        src={iconIndex < review.sensitivity ? '/sensationalism1.png' : '/sensationalism2.png'}
                        onClick={() => {}}
                        onDoubleClick={() => {}}
                      />
                    ))}
                  </IconWrapper>
                </TagGroup>
                <TagGroup>
                  <TagLabel>폭력성</TagLabel>
                  <IconWrapper>
                    {Array.from({ length: 5 }, (_, iconIndex) => (
                      <Icon
                        key={iconIndex}
                        src={iconIndex < review.violence ? '/violence1.png' : '/violence2.png'}
                        onClick={() => {}}
                        onDoubleClick={() => {}}
                      />
                    ))}
                  </IconWrapper>
                </TagGroup>
              </TagsWrapper>
              <CommentSection>
                <CommentText
                  isExpanded={likeStates[index].isExpanded}
                  onClick={() => toggleExpandText(index)}
                >
                  {review.content}
                </CommentText>
              </CommentSection>
            </Content>
          </Slide>
        ))}
      </ContentWrapper>
      <RightButton src="/carouselbutton-right.png" alt="오른쪽 버튼" onClick={handleRightButtonClick} />
    </Container>
  );
};

export default BestReview;
