import TicketService from "./TicketService";

export default class TicketList {
  constructor(listEl, popup, confirm) {
    this.listEl = listEl;
    this.popup = popup;
    this.confirm = confirm;
    this.removeTicket = this.removeTicket.bind(this);
    this.containerEl = this.listEl.querySelector(".list-items");
    this.btnAddEl = this.listEl.querySelector(".list-btn-add");
    this.onClickAdd = this.onClickAdd.bind(this);
    this.btnAddEl.addEventListener("click", this.onClickAdd);
    this.updateTicket = this.updateTicket.bind(this);
    this.popup.onSubmitHandler = this.updateTicket;
    this.editTicket = this.editTicket.bind(this);
  }

  onClickAdd(e) {
    e.preventDefault();
    this.popup.show();
  }

  init() {
    TicketService.getAllTickets((tickets) => {
      this.tickets = tickets;
      this.tickets.forEach((ticket) => this.initTicket(ticket));
      this.renderTickets();
    });
  }

  initTicket(ticket) {
    ticket.removeHandler = this.removeTicket;
    ticket.editHandler = this.editTicket;
    ticket.changeStatusHandler = this.updateTicket;
  }

  renderTicket(ticket) {
    this.containerEl.appendChild(ticket.element);
  }

  renderTickets() {
    this.clear();
    this.tickets.forEach((ticket) => {
      this.renderTicket(ticket);
    });
  }

  clear() {
    [...this.containerEl.children].forEach((el) => el.remove());
  }

  removeTicket(ticket) {
    this.confirm.show(() => {
      TicketService.removeTicket(ticket.id, (res) => {
        if (res) {
          this.init();
        }
      });
    });
  }

  editTicket(ticket) {
    this.popup.show(ticket);
  }

  updateTicket(ticket) {
    if (ticket.id) {
      TicketService.updateTicket(ticket, (tickets) => {
        this.tickets = tickets;
        this.tickets.forEach((ticket) => this.initTicket(ticket));
        this.renderTickets();
      });
    } else {
      TicketService.createTicket(ticket, (newTicket) => {
        if (newTicket) {
          this.init();
        }
      });
    }
  }
}
