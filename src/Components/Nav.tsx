import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavConatiner = styled.div`
  height: 60px;
  margin: 0 auto;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.accentColor};
`;

const HomeBtn = styled(Link)`
  text-transform: uppercase;
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  font-weight: 600;
`;

const DarkModeBtn = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  font-weight: 600;
  &:focus,
  &:active {
    box-shadow: none;
  }
`;

function Nav() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <NavConatiner>
      <HomeBtn to={"/"}>Home</HomeBtn>
      <DarkModeBtn onClick={toggleDarkAtom}>Toggle Dark Mode</DarkModeBtn>
    </NavConatiner>
  );
}

export default Nav;
