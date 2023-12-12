export default class Popup {
  constructor() {
    this.formEl = document.forms.dataEntry;
    this.inputNameEl = this.formEl.elements.name;
    this.inputDescriptionEl = this.formEl.elements.description;
    this.btnCancelEl = this.formEl.querySelector(".data-entry-btn-cancel");
    this.onClickCancel = this.onClickCancel.bind(this);
    this.btnCancelEl.addEventListener("click", this.onClickCancel);
    this.onSubmit = this.onSubmit.bind(this);
    this.formEl.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.ticket) {
      this.ticket = {};
      this.ticket.id = null;
      this.ticket.status = false;
    }
    this.ticket.name = this.inputNameEl.value;
    this.ticket.description = this.inputDescriptionEl.value;
    this.ticket.created = Date.now();
    this.onSubmitHandler(this.ticket);
    this.hide();
  }

  onClickCancel(e) {
    e.preventDefault();
    this.hide();
  }

  show(ticket = null) {
    this.ticket = {};
    if (ticket) {
      this.ticket.id = ticket.id;
      this.ticket.name = ticket.name;
      this.ticket.status = ticket.status;
      this.ticket.description = ticket.description;
      this.ticket.created = ticket.created;
      document.querySelector(".data-entry-title").textContent =
        "Изменить тикет";
    } else {
      this.ticket = ticket;
      document.querySelector(".data-entry-title").textContent =
        "Добавить тикет";
    }
    this.inputNameEl.value = ticket ? ticket.name : "";
    this.inputDescriptionEl.value = ticket ? ticket.description : "";
    this.formEl.classList.remove("hidden");
  }

  hide() {
    this.ticket = null;
    this.inputNameEl.value = "";
    this.inputDescriptionEl.value = "";
    this.formEl.classList.add("hidden");
  }
}
