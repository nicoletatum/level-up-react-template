import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <header className="games__header">
                <h1>Level Up Games</h1>
            </header>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__edit">
                            <button className="btn btn-3 btn-sep icon-create"
                                onClick={e => history.push(`/games/${game.id}/edit`)}
                            >Edit</button>
                        </div>
                        <div className="game__title">{game.name} by: {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is: {game.skill_level}</div>
                        <br />
                    </section>
                })
            }
        </article>
    )
}