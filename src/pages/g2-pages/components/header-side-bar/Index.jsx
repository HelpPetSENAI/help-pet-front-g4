import HamburguerIcon from "../../assets/icons/HamburguerIcon.jsx";
import styled from "styled-components";
import HomeIcon from "../../assets/icons/HomeIcon.jsx";
import {Link} from "react-router-dom";
import MessageIcon from "../../../../assets/icons/MessageIcon.jsx";
import ConfigIcon from "../../assets/icons/ConfigIcon.jsx";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";

function SideBar() {



    return (
        <>
            {/*<HamburguerIcon/>*/}
            <SideBarContainer>
                <SideBarTitleWrapper>
                    <HomeWrapper>
                        <HomeIcon/>
                        <SideBarLink to="/">Home</SideBarLink>
                    </HomeWrapper>
                    <MessagesWrapper>
                        <MessageIcon/>
                        <SideBarLink to="/messages">Mensagens</SideBarLink>
                    </MessagesWrapper>
                    <MessagesWrapper>
                        <ConfigIcon/>
                        <SideBarLink to="/config">Configurações</SideBarLink>
                    </MessagesWrapper>
                    <MessagesWrapper>
                        <SearchIcon/>
                        <SideBarLink to="/search">Pesquisar</SideBarLink>
                    </MessagesWrapper>
                </SideBarTitleWrapper>
            </SideBarContainer>
        </>
    )
}

export default SideBar;

export const SideBarContainer = styled.div`
    display: flex;
    width: 229px;
    height: 832px;
    padding: 45px 30px;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    flex-shrink: 0;
    position: absolute;
    right: 0;
    top: 0;
    
    border-radius: 40px 0 0 40px;
    border: 2px solid var(--crl-green-1000, #061407);
    background: var(--crl-green-500, #39C442);
    box-shadow: -13px 13px 0 0 var(--crl-green-1000, #061407);
`;

export const SideBarTitleWrapper = styled.div`
    
`;

export const HomeWrapper = styled.div``;

export const MessagesWrapper = styled.div``;

export const ConfigWrapper = styled.div``;

export const SearchWrapper = styled.div``;

export const SideBarLink = styled(Link)`
    
`;