import React, { useState, useEffect, useRef } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "ke" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

function handleSecondScriptLoad(updateQuery, secondCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    secondCompleteRef.current,
    { componentRestrictions: { country: "ke" } }
  );
  secondCompleteRef.setFields(["address_components", "formatted_address"]);
  secondCompleteRef.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const [secondQuery, setSecondQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const secondCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBATTdbhGfDzBK1YVOFNXS0Wxhashe4STc&libraries=places`,
      () => {
        handleScriptLoad(setQuery, autoCompleteRef);
        handleSecondScriptLoad(setQuery, secondCompleteRef)
      }
    );
  }, []);

  const handleInput = () => {
    setQuery(autoCompleteRef.current.value)
    setSecondQuery(secondCompleteRef.current.value)
  }

  const secondInput = () => {
    setSecondQuery(secondCompleteRef.current.value)
  }
  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={() => handleInput()}
        placeholder="Enter a City"
        value={query}
        className="me-4"
      />

      <input
        ref={secondCompleteRef}
        onKeyUp={() => secondInput()}
        onChange={(e) => setSecondQuery(e.target.value)}
        placeholder="Enter a second City"
        value={secondQuery}
      />


      <h2>You are traveling from: {query}</h2>
      <h2>You are traveling to: {secondQuery}</h2>
    </div>
  );
}

export default SearchLocationInput;