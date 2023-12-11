import TicketService from "./TicketService"

export default class TicketList {
  constructor(listEl, popup, confirm) {
    this.listEl = listEl;
    this.popup = popup;
    this.confirm = confirm;
    this.removeTicket = this.removeTicket.bind(this);
    this.containerEl = this.listEl.querySelector('.list-items');
    this.btnAddEl = this.listEl.querySelector('.list-btn-add');
    this.onClickAdd = this.onClickAdd.bind(this);
    this.btnAddEl.addEventListener('click', this.onClickAdd);
    this.addTicket = this.addTicket.bind(this);
    this.popup.onSubmitHandler = this.addTicket;
    this.editTicket = this.editTicket.bind(this);
  }

  onClickAdd(e) {
    e.preventDefault();
    this.popup.show();
  }

  init() {
    TicketService.getAllTickets((tickets => {
      this.tickets = tickets;
      this.tickets.forEach((ticket) => this.initTicket(ticket));
      this.renderTickets();
    }));
  }

  initTicket(ticket) {
    ticket.removeHandler = this.removeTicket;
    ticket.editHandler = this.editTicket;
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
      this.tickets = this.tickets.filter((element) => element !== ticket);
      this.renderTickets();
    });
    
  }

  editTicket(ticket) {
    this.popup.show(ticket);
  }

  addTicket(ticket, form) {
    // if (ticket.id) {
      TicketService.updateTicket(ticket, form, (tickets) => {
        this.tickets = tickets;
        this.tickets.forEach((ticket) => this.initTicket(ticket));
        this.renderTickets();
      });
    // } else {
    //   TicketService.createTicket(ticket, () => {});
    // }
    // this.initTicket(ticket);
    // this.tickets.push(ticket);
    // this.renderTickets();
  }
}
