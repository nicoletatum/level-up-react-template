import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        name: "",
        maker: "",
        gameTypeId: 0
    })
    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    const handleInput = (event) => {

        const newGameState = { ...currentGame }
        let selectedValue = event.target.value
        newGameState[event.target.id] = selectedValue

        setCurrentGame(newGameState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={handleInput}
                    />
                </div>
            </fieldset>
            <fieldset>   
                <div>    
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleInput}
                    />
                </div>  
            </fieldset>
            <fieldset> 
                <div>
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" min="1" max="15" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleInput}
                    />
                </div>
            </fieldset>
            <fieldset>      
                <div>   
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" min="1" max="5" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={handleInput}
                    />
                </div>
            </fieldset>
            <fieldset>     
                <div>
                    <label htmlFor="gameTypeId">Type: </label>
                    <select name="gameTypeId" required className="form-control" value={currentGame.gameTypeId} onChange={handleInput}>
                        {
                            gameTypes.map(type => {
                                return <option key={type.id} value={type.id}>{type.type}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        name: currentGame.name,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}