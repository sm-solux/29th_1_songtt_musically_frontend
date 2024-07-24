import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileCard from "./profileCard";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 531px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    //background-color: aliceblue;
    background: #212121;
    z-index: 1000;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 세로 스크롤 활성화 */
    //max-height: calc(100% - 60px); /* Divider와 Header를 고려한 최대 높이 */
    width: 100%; 

    /* 스크롤바 스타일 */
    &::-webkit-scrollbar {
        width: 8px; /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888; /* 스크롤바의 색상 */
        border-radius: 10px; /* 스크롤바의 모서리 둥글기 */
    }

    /* 스크롤바가 보이지 않도록 설정 */
    &::-webkit-scrollbar-track {
        background: transparent; /* 스크롤바 트랙 배경 */
    }

    /* 스크롤할 때만 스크롤바를 보이도록 설정 */
    &:hover {
        &::-webkit-scrollbar {
            width: 8px; /* 스크롤바가 나타날 때 너비 */
        }
    }

    /* 스크롤하지 않을 때 스크롤바 숨기기 */
    &:not(:hover) {
        &::-webkit-scrollbar {
            width: 0; /* 스크롤바가 숨겨질 때 너비 */
        }
    }
`;


const Header = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div`
    //color: black;
    color: #F0F0F0;
    font-size: 24.44px;
    font-weight: 600;
    text-align: center;
    margin: 15px 0;
    padding-left: 200px;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding-left: 164px;
    img {
        width: 100%;
        height: 100%;
    }
`

const Divider = styled.div`
    width: 100%;
    height: 1.5px;
    background-color: #707070;
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
`

interface FollowerModalProps {
    onClose: () => void;
    reviewId: string;
}

export default function ModalTest({ reviewId, onClose }: FollowerModalProps) {
    const [followers, setFollowers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API 호출 (여기서는 더미 데이터를 사용)
        const fetchFollowers = async () => {
            // 더미 데이터
            const dummyFollowers = [
                {
                    user_id: "6680d62ecedc61af5a5d92d1",
                    nickname: "yeawon",
                    email: "yeawon@musically.com",
                    is_following: true,
                },
                {
                    user_id: "abc",
                    nickname: "sunhwa",
                    email: "sunhwa@musically.com",
                    is_following: false,
                },
            ];

            setTimeout(() => {
                setFollowers(dummyFollowers);
                setLoading(false);
            }, 1000);
        };

        fetchFollowers();

        // 배경 스크롤 금지
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <Overlay onClick={onClose}>
            <Modal>
                <Header>
                    <Title>팔로워</Title>
                    <CloseButton onClick={onClose}>
                        <img src="/x_icon.svg" alt="Close" />
                    </CloseButton>
                </Header>
                <Divider />
                <ModalContent>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        followers.map((follower) => (
                            <ProfileCard 
                                key={follower.user_id}
                                // profileImage={follower.profile_image} // 필요시 프로필 이미지 추가
                                nickname={follower.nickname}
                                email={follower.email}
                                is_following={follower.is_following}
                            />
                        ))
                    )}
                </ModalContent>
            </Modal>
        </Overlay>
    );
}