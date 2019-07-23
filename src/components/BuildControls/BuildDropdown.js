import React, { useEffect } from "react";
import "styles/mdn-dropdown.css";

export const BuildDropdown = props => {
  useEffect(() => {
    console.log("loaded");
    var data = [0, 1, 2, 3];
    var liCL = [
      "MuiButtonBase-root",
      "MuiListItem-root",
      "MuiMenuItem-root",
      "MuiMenuItem-gutters",
      "MuiListItem-gutters",
      "MuiListItem-button"
    ];

    var li_disp = document.querySelector(".listCont");

    window.addEventListener("DOMContentLoaded", () => {
      var li_cont = document.querySelector(".MuiPaper-root");
      var li_roo = document.querySelector(".MuiList-root");

      var dd = document.querySelector(".MuiFormControl-root");
      var inpt_val = dd.querySelector(".MuiSelect-root");

      var li_rect = dd.getBoundingClientRect();

      var prevStyle =
        "opacity: 1; transform: none; " +
        "transition: opacity 284ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,  " +
        "transform 189ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;" +
        " transform-origin: 0px 80px;";
      var li_sty =
        prevStyle +
        " " +
        "top: " +
        li_rect.y +
        "px; " +
        "left: " +
        li_rect.x +
        "px; " +
        //             + "height: " + li_rect.height + "px; "
        "min-width: " +
        li_rect.width * 2 +
        "px; ";

      for (var dat in data) {
        var li = document.createElement("li");
        li.innerText = dat;
        for (var cl in liCL) li.classList.add(liCL[cl]);
        li.setAttribute("data-ripple", "ripple");
        li.addEventListener("click", setDD);
        li_roo.appendChild(li);
      }

      rippelarize();

      dd.addEventListener("click", function() {
        li_disp.style.display = "";
        li_cont.setAttribute("style", li_sty);
        li_roo.focus();
      });

      li_roo.addEventListener(
        "blur",
        function() {
          li_cont.style.opacity = 0;
          setTimeout(() => (li_disp.style.display = "none"), 150);
        },
        true
      );

      function setDD(e) {
        var li_nodes = li_roo.children,
          i;
        for (i = 0; i < li_nodes.length; i++)
          li_nodes[i].classList.remove("Mui-selected");
        this.classList.add("Mui-selected");
        inpt_val.innerText = this.innerText;
        li_cont.style.opacity = 0;
        setTimeout(() => (li_disp.style.display = "none"), 150);
      }
    });

    var rippelarize = function() {
      var cleanUp,
        debounce,
        i,
        len,
        ripple,
        rippleContainer,
        ripples,
        showRipple;

      debounce = function(func, delay) {
        var inDebounce = undefined;
        return function() {
          var args, context;
          context = this;
          args = arguments;
          clearTimeout(inDebounce);
          return (inDebounce = setTimeout(function() {
            return func.apply(context, args);
          }, delay));
        };
      };

      showRipple = function(e) {
        var pos, ripple, rippler, size, style, x, y;
        ripple = this;
        rippler = document.createElement("span");
        size = ripple.offsetWidth;
        pos = ripple.getBoundingClientRect();
        x = e.pageX - pos.left - size / 2;
        y = e.pageY - pos.top - size / 2;
        style = `top: ${y}px;
             left: ${x}px;
             height: ${size}px;
             width: ${size}px;`;
        ripple.rippleContainer.appendChild(rippler);
        return rippler.setAttribute("style", style);
      };

      cleanUp = function() {
        while (this.rippleContainer.firstChild) {
          this.rippleContainer.removeChild(this.rippleContainer.firstChild);
        }
      };

      ripples = document.querySelectorAll("[data-ripple]");
      for (i = 0, len = ripples.length; i < len; i++) {
        ripple = ripples[i];
        rippleContainer = document.createElement("div");
        rippleContainer.className = "ripple--container";
        ripple.addEventListener("mousedown", showRipple);
        ripple.addEventListener("mouseup", debounce(cleanUp, 500));
        ripple.rippleContainer = rippleContainer;
        ripple.appendChild(rippleContainer);
      }
    };
  }, []);
  return (
    <>
      <div className="surroundingDiv">
        <div
          className="MuiFormControl-root 
                            MuiTextField-root 
                            jss319 
                            MuiFormControl-marginNormal"
        >
          <label
            className="MuiFormLabel-root 
                                    MuiInputLabel-root 
                                    MuiInputLabel-formControl 
                                    MuiInputLabel-animated 
                                    MuiInputLabel-shrink 
                                    MuiInputLabel-outlined 
                                    MuiFormLabel-filled"
            data-shrink="true"
            htmlFor="outlined-select-currency"
          >
            Select
          </label>
          <div
            className="MuiInputBase-root 
                                MuiOutlinedInput-root 
                                MuiInputBase-formControl"
          >
            <fieldset
              aria-hidden="true"
              style={{ paddingLeft: "8px" }}
              className="jss337 MuiOutlinedInput-notchedOutline"
            >
              <legend className="jss338" style={{ width: "41.75px" }}>
                <span />
              </legend>
            </fieldset>
            <div
              className="MuiSelect-root 
                                    MuiSelect-select 
                                    MuiSelect-selectMenu 
                                    MuiInputBase-input 
                                    MuiOutlinedInput-input 
                                    MuiInputBase-inputSelect 
                                    MuiOutlinedInput-inputSelect 
                                    MuiSelect-outlined"
              aria-pressed="false"
              tabIndex="0"
              role="button"
              aria-haspopup="true"
            >
              1
            </div>
            <input
              type="hidden"
              aria-describedby="outlined-select-currency-helper-text"
              id="outlined-select-currency"
            />
            <svg
              className="MuiSvgIcon-root 
                                    MuiSelect-icon"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="listCont" style={{ display: "none" }}>
        <div
          className="MuiPaper-root 
                            MuiMenu-paper 
                            MuiPaper-elevation8 
                            MuiPopover-paper 
                            MuiPaper-rounded"
          role="document"
          tabIndex="-1"
        >
          <ul
            className="MuiList-root 
                                MuiMenu-list 
                                MuiList-padding"
            role="listbox"
            tabIndex="-1"
          >
            {/* <li className="MuiButtonBase-root 
                                    MuiListItem-root 
                                    MuiMenuItem-root 
                                    MuiMenuItem-gutters 
                                    MuiListItem-gutters 
                                    MuiListItem-button" 
                            tabIndex="1" 
                            role="option" 
                            aria-disabled="false" 
                            data-value="USD"
                            data-ripple="ripple">3
                        </li>  */}
          </ul>
        </div>
      </div>
    </>
  );
};
