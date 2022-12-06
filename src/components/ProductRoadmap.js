import React, { useState } from "react"
import createPersistedState from "use-persisted-state"
import { List, arrayMove } from 'react-movable'
import Header from "./Header"
import Item from "./Item"

import { exampleItems } from "../items"
import { IN_PROGRESS_TAG, UP_NEXT_TAG } from "../tags"

const usePersistedState = createPersistedState("items")

const ProductRoadmap = () => {
    const [items, setItems] = usePersistedState(exampleItems)
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckAll = (e) => {
        if(e.target.checked) {
            const selectAllItems = items.map(i => i.id)
            setSelectedItems(selectAllItems)
        } else setSelectedItems([]);
    }

    const handleOnSelect = (e, id) => {
        if(e.target.checked) {
            setSelectedItems(prev => [...prev, id])
        } else {
            setSelectedItems(prev => [...prev].filter(i => i !== id))
        }
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        setItems(prev => prev.filter(i => !selectedItems.includes(i.id)));
        setSelectedItems([])
    }

    const handleInProgressTagging = (e) => {
        e.stopPropagation();
        setItems(prev => prev.map(item => ({
            ...item,
            tag: selectedItems.includes(item.id) ? IN_PROGRESS_TAG : item.tag
        })));
        setSelectedItems([]);
    }

    const handleUpNextTagging = (e) => {
        e.stopPropagation();
        setItems(prev => prev.map(item => ({
            ...item,
            tag: selectedItems.includes(item.id) ? UP_NEXT_TAG : item.tag
        })));
        setSelectedItems([]);
    }

    const handleClearTag = (e) => {
        e.stopPropagation();
        setItems(prev => prev.map(item => ({
            ...item,
            tag: selectedItems.includes(item.id) ? undefined : item.tag
        })));
        setSelectedItems([]);
    }

    return (
        <>
            <Header/>

            <div className="actions">
                <input 
                    type="checkbox" 
                    checked={selectedItems.length === items.length} 
                    onChange={handleCheckAll}/>
                <button disabled={selectedItems.length === 0} onClick={handleDelete}>Delete</button>
                <button disabled={selectedItems.length === 0} onClick={handleInProgressTagging}>In Progress</button>
                <button disabled={selectedItems.length === 0} onClick={handleUpNextTagging}>Up Next</button>
                <button disabled={selectedItems.length === 0} onClick={handleClearTag}>Clear Tags</button>
            </div>

            <List 
                values={items}
                onChange={({oldIndex, newIndex}) => {
                    setItems(arrayMove(items, oldIndex, newIndex))
                }}
                renderList={({children, props}) => <div {...props}>{children}</div>}
                renderItem={({value, props}) => <Item {...props}
                    key={value.id} 
                    {...value} 
                    isSelected={selectedItems.includes(value.id)}
                    select={(e) => handleOnSelect(e, value.id)}
                />}
            />

            {/* {items.map((item) => (
                
            ))} */}
        </>
    )
}

export { ProductRoadmap as default }
