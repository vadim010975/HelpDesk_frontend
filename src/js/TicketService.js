import Ticket from './Ticket';

export default class TicketService {

  static getAllTickets(callback) {
    const xhr = new XMLHttpRequest;
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          const arrayTickets = TicketService.createArrayTickets(data);
          callback(arrayTickets);
        } catch (e) {
          console.error(e);
        }
      }
    });

    xhr.open('GET', 'http://localhost:3000/?method=allTickets');

    xhr.send();
  }

  static getDescription(id, callback) {
    const xhr = new XMLHttpRequest;
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(data.description);
        } catch (e) {
          console.error(e);
        }
      }
    });

    xhr.open('GET', `http://localhost:3000/?method=ticketById&id=${id}`);

    xhr.send();
  }

  static updateTicket(ticket, form, callback) {
    console.log('ticket ', ticket, form);
    const xhr = new XMLHttpRequest;
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          const arrayTickets = TicketService.createArrayTickets(data);
          callback(arrayTickets);
        } catch (e) {
          console.error(e);
        }
      }
    });
    const body = new FormData(form);
    // Object.keys(ticket).forEach(key => {
    //   body.set(key, ticket[key]);
    // });

    xhr.open('POST', `http://localhost:3000/?method=updateById&id=${ticket.id}`);

    xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    xhr.send(body);
  }

  static createArrayTickets(data) {
    return data.map(el => {
      return new Ticket(el);
    });
  }
}