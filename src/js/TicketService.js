import createRequest from "./createRequest";
const HOST = "http://localhost:3000/";

export default class TicketService {
  static getAllTickets(callback) {
    createRequest({
      requestMethod: "GET",
      urlMethod: "allTickets",
      host: HOST,
      callback,
    });
  }

  static getDescription(id, callback) {
    createRequest({
      requestMethod: "GET",
      urlMethod: "ticketById",
      host: HOST,
      callback,
      id,
    });
  }

  static updateTicket(ticket, callback) {
    createRequest({
      requestMethod: "POST",
      urlMethod: "updateById",
      host: HOST,
      callback: callback,
      id: ticket.id,
      body: ticket,
    });
  }

  static createTicket(ticket, callback) {
    createRequest({
      requestMethod: "POST",
      urlMethod: "createTicket",
      host: HOST,
      callback,
      body: ticket,
    });
  }

  static removeTicket(ticketId, callback) {
    createRequest({
      requestMethod: "GET",
      urlMethod: "deleteById",
      host: HOST,
      callback,
      id: ticketId,
    });
  }
}
