import React from "react"
import createPersistedState from "use-persisted-state"
import Header from "./Header"
import Item from "./Item"
import { exampleItems } from "../items"

const usePersistedState = createPersistedState("items")

const ProductRoadmap = () => {
    const [items, setItems] = usePersistedState(exampleItems)

    return (
        <>
            <Header/>

            <div className="actions">
                <input type="checkbox"/>
                <button disabled={true}>Delete</button>
            </div>

            {items.map((item) => (
                <Item key={item.id} {...item}/>
            ))}
        </>
    )
}

export { ProductRoadmap as default }
