import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"

export const EventForm = () => {
    const history = useHistory()
    const { createEvent, getEvents, events } = useContext(EventContext)

    const [currentEvent, setEvent] = useState({
        name:"",
        date: "",
        time: "",
        game: 0
    })

    useEffect(() => {
        getEvents()
    }, [])

    const changeEventState = (domEvent) => {
        const newEvent = { ...currentEvent}
        newEvent[domEvent.target.name] = domEvent.target.value
        setEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventId"> Event: </label>
                    <input type="text" name="name" className="form-control" required autoFocus className="form-control"
                        value={currentEvent.name} onChange={changeEventState}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game"> Game: </label>
                    <input type="text" name="name" className="form-control" required autoFocus className="form-control"
                        value={currentEvent.name} onChange={changeEventState}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"> Date: </label>
                    <input type="text" name="name" className="form-control" required autoFocus className="form-control"
                        value={currentEvent.name} onChange={changeEventState}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time"> Time: </label>
                    <input type="text" name="name" className="form-control" required autoFocus className="form-control"
                        value={currentEvent.name} onChange={changeEventState}
                        />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event


                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}