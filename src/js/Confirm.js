export default class Confirm {
  constructor() {
    this.element = document.querySelector(".confirm");
    this.btnCancelEl = this.element.querySelector(".confirm-btn-cancel");
    this.btnOkEl = this.element.querySelector(".confirm-btn-ok");
    this.onClickBtnCancel = this.onClickBtnCancel.bind(this);
    this.onClickBtnOk = this.onClickBtnOk.bind(this);
    this.btnCancelEl.addEventListener("click", this.onClickBtnCancel);
    this.btnOkEl.addEventListener("click", this.onClickBtnOk);
  }

  show(callback) {
    this.callback = callback;
    this.element.classList.remove("hidden");
  }

  hide() {
    this.element.classList.add("hidden");
  }

  onClickBtnCancel() {
    this.hide();
  }

  onClickBtnOk() {
    this.hide();
    this.callback();
  }
}
