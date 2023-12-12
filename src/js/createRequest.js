import Ticket from "./Ticket";

const createRequest = (options = {}) => {
  if (
    !options.requestMethod ||
    !options.urlMethod ||
    !options.host ||
    !options.callback
  ) {
    return;
  }
  const url = `${options.host}?method=${options.urlMethod}${
    options.id ? "&id=" + options.id : ""
  }`;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = xhr.response ? JSON.parse(xhr.response) : "";
        switch (options.urlMethod) {
          case "allTickets":
          case "updateById":
            options.callback(createArrayTickets(data));
            break;
          case "ticketById":
            options.callback(data.description);
            break;
          case "createTicket":
            options.callback(data);
            break;
          case "deleteById":
            if (xhr.status === 204) {
              options.callback(true);
            } else {
              options.callback(false);
            }
        }
      } catch (e) {
        console.error(e);
      }
    }
  });

  xhr.open(options.requestMethod, url);

  xhr.send(options.body ? JSON.stringify(options.body) : "");
};

const createArrayTickets = (data) => {
  return data.map((el) => {
    return new Ticket(el);
  });
};

export default createRequest;
