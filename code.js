let data = [
    "א",
    "ק",
    "ר",
    "א",
    "י",
    "ו",
    "ת",
    // "",
    // "",
    // "",
    // "",
  ];

  
  /* loading function
    --------------------------------------------------------------
    Description: */
  window.addEventListener("load", () => {
    startPage();
    // document.querySelector(".randomEpisodeButton").addEventListener("click", generateRandomEpisode);
  });

  const startPage = () => {
    for (let index = 0; index < data.length; index++) {
        let titleLetter = El("div", {attributes: {id: `letter${index}`, class: "letters"}}, data[index]);
        document.querySelector("#start_page").append(titleLetter);
    }
    document.querySelector("#start_page").addEventListener("click", startAnimation)
  }

  const startAnimation = () => {
      for (let index = 0; index < data.length; index++) {
        const crazy = [
            { transform: "rotateZ(0) translate3D(0, 0, 0)", fontSize: "10vh", top: "0", left: "0"},
            { transform: 
            `rotateZ(${randomNum(-180, 180)}deg)
            `,fontSize: `${randomNum(5,27)}vh`,
            top: `${randomNum(-45,45)}vh`,
            left: `${randomNum(-5,5)}vh`,
        },
        // translate3D(${randomNum(-10,10)}vw, ${randomNum(-40,40)}vh, 0)
        ];
        const timing = {
            duration: 4000,
            fill: "forwards",
        };
        document.querySelector(`#letter${index}`).animate(crazy, timing);
    }
  }

  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function shuffle(arr) {
    let tmp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
      let index = Math.floor(Math.random() * tmp.length);
      arr[i] = tmp[index];
      tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
  }
  
  /* El
    --------------------------------------------------------------
    Description: create html elements */
  function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length)
      el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter((el) => el));
    for (let listenerName of Object.keys(options.listeners || {}))
      if (options.listeners[listenerName])
        el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
      if (options.attributes[attributeName] !== undefined)
        el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
  }
  