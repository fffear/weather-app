import Events from "../EventPubSub/EventPubSub";

const background = (() => {
  const setStyleOnElement = (element, styles) => {
    Object.assign(element.style, styles);
  };

  const find = async description => {
    if (description !== null) {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/translate?api_key=Y8jzBLVWCMyeUpi3KIJ0Zu0jAax8a23N&s=" +
          description.condition,
        { mode: "cors" }
      );
      const weatherData = await response.json();

      setStyleOnElement(document.body, {
        backgroundImage: `url('${weatherData.data.images.original.url}')`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%"
      });
    } else {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/translate?api_key=Y8jzBLVWCMyeUpi3KIJ0Zu0jAax8a23N&s=null",
        { mode: "cors" }
      );
      const weatherData = await response.json();

      setStyleOnElement(document.body, {
        backgroundImage: `url('${weatherData.data.images.original.url}')`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%"
      });
    }
  };

  Events.on("displayWeather", find);

  return { find };
})();

export default background;
