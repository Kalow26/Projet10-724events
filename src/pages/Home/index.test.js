import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import EventList from "../../containers/Events";
import EventCard from "../../components/EventCard";
import { api, DataProvider } from "../../contexts/DataContext";
import { events } from "../../../public/events.json";
import { getMonth } from "../../helpers/Date";
import Page from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<EventList />);
    const events = screen.getByTestId("events");
    expect(events).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleCard = screen.queryAllByTestId("card-image-testid");
    expect(peopleCard.length).toBeGreaterThan(0);
  });

  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    expect(footer).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    const lastEvent = events
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 1)[0];
    const lastEventDate = new Date(lastEvent.date);
    const mockData = {
      imageSrc: lastEvent.cover,
      title: lastEvent.title,
      date: lastEventDate,
      footerEvent: true,
      label: "boom",
    };
    render(<EventCard {...mockData} />);
    const footerEventCard = screen.getByTestId("footer-event");
    expect(footerEventCard).toBeInTheDocument();
    // console.log(footerEventCard);
    // const dateElement = screen
    //   .getByTestId("footer-testid")
    //   .querySelector(".EventCard__month");
    // expect(dateElement).toHaveTextContent("août");
  });
});
