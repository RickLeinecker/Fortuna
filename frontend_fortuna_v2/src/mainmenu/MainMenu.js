//@flow strict

import './MainMenu.css';
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../globalComponents/MainNavbar.js';
import { verifyLink } from '../globalComponents/verifyLink.js';
import { verifyLogin } from '../globalComponents/apiCalls/verifyLogin.js';
import { Transition } from 'react-transition-group'
import { TweenMax, TweenLite, Power3 } from 'gsap'

// MAY NEED TO CHAGNE THIS TO A FUNCTIONAL COMPONENT
// THIS HAS NO STATE

function MainMenu() {

  let mp = useRef(null);
  let ba = useRef(null);
  let ta = useRef(null);
  let arm = useRef(null);


  useEffect(() => {
    TweenMax.to(
      mp,
      0.8,
      {
        opacity: 1,
        y: -70,
        ease: Power3.easeOut
      }
    )

    TweenMax.to(
      ba,
      0.8,
      {
        opacity: 1,
        y: -70,
        ease: Power3.easeOut
      }
    )

    TweenMax.to(
      arm,
      0.8,
      {
        opacity: 1,
        y: -70,
        ease: Power3.easeOut
      }
    )
    
  }, [])

  return (
    <div id="Parent">
      <MainNavbar 
        linkName="/Login" 
        returnName="Logout" 
        pageName="Main Menu" 
      />
      <h1 className="menuheader">Where to Commander?</h1>
      <div ref={mpref => {mp = mpref}} className="column menuleft">
        <Link to={verifyLink("/Marketplace")}>
          <button className="mainMenuBtn">Marketplace</button>
        </Link>
      </div>
      <div ref={baref => {ba = baref}} className="column menumiddle">
        <Link to={verifyLink("/BattleArena")}>
          <button className="mainMenuBtn">Battle Arena</button>
        </Link>
        <br/><br/><br/>
        <Link to={verifyLink("/TrainingArena")}>
          <button className="mainMenuBtn">Training Arena</button>
        </Link>
      </div>
      <div ref={armref => {arm = armref}} className="column menuright">
        <Link to={verifyLink("/Armory")}>
          <button className="mainMenuBtn">Armory</button>
        </Link>
      </div>
    </div>
  )
}

export default MainMenu
