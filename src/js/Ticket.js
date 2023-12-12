import TicketService from "./TicketService";

export default class Ticket {
  constructor(obj) {
    this.id = obj.id;
    this._name = obj.name;
    this.status = obj.status;
    this._description = obj.description;
    this._created = obj.created;
    this.element = document.createElement("div");
    this.element.classList.add("list-item");
    this.element.innerHTML = `
    <div class="status-container">
      <label class="list-item-status-label">
        <input type="checkbox" class="list-item-status">
      </label>
    </div>
    <div class="list-item-name-wrapper">
      <div class="list-item-name"></div>
    </div>
    <div class="list-item-created"></div>
    <button type="button" class="list-item-btn list-item-btn-edit"></button>
    <button type="button" class="list-item-btn list-item-btn-remove"></button>`;
    this.statusEl = this.element.querySelector(".list-item-status");
    this.statusEl.checked = this.status;
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.statusEl.addEventListener("change", this.onChangeStatus);

    // this.labelStatusEl = this.element.querySelector('.list-item-status-label');
    this.nameWrapperEl = this.element.querySelector(".list-item-name-wrapper");
    this.nameEl = this.element.querySelector(".list-item-name");
    this.nameEl.textContent = this.name;
    this.onClickName = this.onClickName.bind(this);
    this.nameWrapperEl.addEventListener("click", this.onClickName);

    this.createdEl = this.element.querySelector(".list-item-created");
    this.createdEl.textContent = new Date(this.created)
      .toLocaleString()
      .slice(0, -3);
    this.btnEditEl = this.element.querySelector(".list-item-btn-edit");
    this.btnRemoveEl = this.element.querySelector(".list-item-btn-remove");

    this.onClickButtonEdit = this.onClickButtonEdit.bind(this);
    this.btnEditEl.addEventListener("click", this.onClickButtonEdit);

    this.onClickButtonRemove = this.onClickButtonRemove.bind(this);
    this.btnRemoveEl.addEventListener("click", this.onClickButtonRemove);
    this.descriptionDisplayed = false;
  }

  onClickButtonEdit(e) {
    e.preventDefault();
    this.editHandler(this);
  }

  onClickButtonRemove(e) {
    e.preventDefault();
    this.removeHandler(this);
  }

  onChangeStatus(e) {
    e.preventDefault();
    if (this.status) {
      this.status = false;
      this.statusEl.checked = false;
    } else {
      this.status = true;
      this.statusEl.checked = true;
    }
    this.changeStatusHandler({
      id: this.id,
      name: this.name,
      status: this.status,
      description: this.description,
      created: this.created,
    });
  }

  onClickName() {
    if (!this.id) {
      return;
    }
    if (!this.descriptionDisplayed) {
      TicketService.getDescription(this.id, (fullDescription) => {
        this.fullDescription = fullDescription.trim();
        this.renderDescription();
        this.descriptionDisplayed = true;
      });
    } else {
      this.hideDescription();
      this.descriptionDisplayed = false;
    }
  }

  renderDescription() {
    if (!this.fullDescription) {
      return;
    }
    const descriptionEl = document.createElement("div");
    descriptionEl.classList.add("list-item-description");
    descriptionEl.textContent = this.fullDescription;
    this.nameWrapperEl.appendChild(descriptionEl);
  }

  hideDescription() {
    const descriptionEl = this.nameWrapperEl.querySelector(
      ".list-item-description"
    );
    if (descriptionEl) descriptionEl.remove();
  }

  set name(value) {
    this._name = value;
    this.nameEl.textContent = value;
  }

  get name() {
    return this._name;
  }

  set description(value) {
    this._description = value;
  }

  get description() {
    return this._description;
  }

  set created(value) {
    this._created = value;
    this.createdEl.textContent = value;
  }

  get created() {
    return this._created;
  }
}
