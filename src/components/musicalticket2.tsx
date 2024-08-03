import React from 'react';
import styled from 'styled-components';

// 인터페이스 정의
interface MusicalData {
  musical_id: string;
  musical_name: string;
  theater_name: string;
  watch_at: string;
  poster_image?: string;
}

interface TicketProps {
  tickets: MusicalData[];
  buyerName: string;
  showTime: string;
}

// 기본값 설정
const defaultPoster = '/default-poster.png';
const defaultMusicalName = 'MUSICALLY';
const defaultPlace = '장소: -';
const defaultDate = '일시: -';
const defaultName = '예매자명: -';

// 스타일 컴포넌트 정의
const Ticket = styled.div`
  display: flex;
  width: 1082px;
  height: 400px;
  background-color: black;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 55px 0;
`;

const Poster = styled.img`
  width: 282px;
  height: 400px;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  width: 800px;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

const Details = styled.div`
  width: 120%;
  height: 120%;
  background-image: url('/musicalposter-1.jpeg');
  background-size: cover;
  background-position: center;
  filter: blur(4px);
  position: absolute;
  top: -10%;
  left: -10%;
  z-index: 1;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 3;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
  color: white;
  z-index: 4;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
  width: calc(100% - 40px);
`;

const Title = styled.h1`
  font-size: 47px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #F2F2F2;
  margin: 0;
`;

const Info = styled.p`
  font-size: 24px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #F1F1F1;
  margin: 20px 0;
`;

const BuyerInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  color: #888888;
  font-size: 16px;
  font-weight: 600;
  z-index: 4;
`;

const BuyerName = styled.p`
  margin: 0;
`;

const Time = styled.p`
  margin: 0;
`;

// MusicalTicket 컴포넌트 정의
const MusicalTicket: React.FC<TicketProps> = ({ tickets, buyerName, showTime }) => {
  return (
    <>
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <Ticket key={ticket.musical_id}>
            <Poster src={ticket.poster_image || defaultPoster} alt="Poster" />
            <DetailsContainer>
              <Details />
              <DarkOverlay />
              <GradientOverlay />
              <TextOverlay>
                <Title>{ticket.musical_name || defaultMusicalName}</Title>
                <Info>장 소 : {ticket.theater_name || defaultPlace}</Info>
                <Info>일 시 : {ticket.watch_at ? new Date(ticket.watch_at).toLocaleDateString() : defaultDate}</Info>
              </TextOverlay>
              <BuyerInfo>
                <BuyerName>예매자명 : {buyerName || defaultName}</BuyerName>
                <Time>{showTime || new Date().toLocaleString()}</Time>
              </BuyerInfo>
            </DetailsContainer>
          </Ticket>
        ))
      ) : (
        <Ticket>
          <Poster src={defaultPoster} alt="Default Poster" />
          <DetailsContainer>
            <Details />
            <DarkOverlay />
            <GradientOverlay />
            <TextOverlay>
              <Title>{defaultMusicalName}</Title>
              <Info>{defaultPlace}</Info>
              <Info>{defaultDate}</Info>
            </TextOverlay>
            <BuyerInfo>
              <BuyerName>{defaultName}</BuyerName>
              <Time>{new Date().toLocaleString()}</Time>
            </BuyerInfo>
          </DetailsContainer>
        </Ticket>
      )}
    </>
  );
};

export default MusicalTicket;