import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider.js"

export const EventForm = () => {
    const history = useHistory()
    const { getGames, games } = useContext(GameContext)
    const { createEvent, getEvents, events } = useContext(EventContext)

    const [currentEvent, setEvent] = useState({
        name: "",
        date: "",
        time: "",
        description:"",
        game_id: 0
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEvent = { ...currentEvent }
        newEvent[domEvent.target.name] = domEvent.target.value
        setEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventId"> Event Name: </label>
                    <input type="text" name="name" className="form-control" required autoFocus className="form-control"
                        value={currentEvent.name} onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game"> Game: </label>
                    <select name="game_id" className="form-control"
                        value={currentEvent.game} onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"> Description: </label>
                    <input type="text" name="description" className="form-control" required autoFocus className="form-control"
                        value={currentEvent.description} onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="date"> Date: </label>
                        <input type="date" name="date" className="form-control" required autoFocus className="form-control"
                            value={currentEvent.date} onChange={changeEventState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="time"> Time: </label>
                        <input type="time" name="time" className="form-control" required autoFocus className="form-control"
                            value={currentEvent.time} onChange={changeEventState}
                        />
                    </div>
                </fieldset>

                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()

                        const event = {
                            name: currentEvent.name,
                            date: currentEvent.date,
                            time: currentEvent.time,
                            game_id: currentEvent.game_id,
                            description: currentEvent.description
                        }

                        createEvent(event)
                            .then(()=> history.push('/events'))
                    }}
                    className="btn btn-primary">Create Event</button>
        </form>
    )
}