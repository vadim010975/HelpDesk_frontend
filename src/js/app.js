import TicketList from "./TicketList";
import Popup from "./Popup";
import Confirm from "./Confirm";

const container = document.querySelector(".list");

const popup = new Popup();

const confirm = new Confirm();

const ticketList = new TicketList(container, popup, confirm);

ticketList.init();


