/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBarClass } from "../Redux/ShowData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/ContextApi/Auth";
export default function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth=useAuth();

  useEffect(() => {
    dispatch(setBarClass({ bar1: "bar", bar2: "bar", bar3: "bar" }));
  }, []);
  return (
    <div className="Success-page">
      <div className="sucess-conatiner">
        <h3>Awesome!</h3>
        <p>
          Your booking has been confirmed <br />
          check your email for details <br /> <br />
          <button
            className="btn"
            onClick={() => {
              auth.navigateStatusFalse();
              navigate("/");
            }}
          >
            click
          </button>
        </p>
        <div class="letter-image">
          <div className="animated-mail">
            <div className="back-fold"></div>
            <div className="letter">
              <div className="letter-border"></div>
              <div className="letter-title"></div>
              <div className="letter-context">Tickets confirmed</div>
              <div className="letter-stamp">
                <div className="letter-stamp-inner"></div>
              </div>
            </div>
            <div className="top-fold"></div>
            <div className="body"></div>
            <div className="left-fold"></div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    </div>
  );
}
